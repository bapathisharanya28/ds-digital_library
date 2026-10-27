/**
 * Python Execution Service
 * Handles communication with the Python Execution Backend (Native Python 3.11)
 * with a fallback to in-browser Pyodide runtime if the backend is offline.
 */

let pyodideInstance = null;
let pyodideLoadingPromise = null;
const EXECUTION_TIMEOUT_MS = 25000;

function createTimeoutSignal(timeoutMs) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    clear: () => window.clearTimeout(timeoutId),
  };
}

function getBrowserUnsupportedModules(code) {
  const unsupported = [];
  const modulePatterns = [
    ['sqlite3', /^\s*(?:import\s+sqlite3\b|from\s+sqlite3\b)/m],
    ['requests', /^\s*(?:import\s+requests\b|from\s+requests\b)/m],
    ['openpyxl', /^\s*(?:import\s+openpyxl\b|from\s+openpyxl\b)/m],
  ];

  for (const [moduleName, pattern] of modulePatterns) {
    if (pattern.test(code)) unsupported.push(moduleName);
  }

  return unsupported;
}

async function preparePyodideCode(pyodide, code, onStatusUpdate) {
  const urls = [...new Set(code.match(/https?:\/\/[^\s"'`)]+/g) || [])];
  let preparedCode = code;

  for (const [index, url] of urls.entries()) {
    onStatusUpdate(`Downloading dataset ${index + 1} of ${urls.length}...`);
    const timeout = createTimeoutSignal(EXECUTION_TIMEOUT_MS);
    try {
      const response = await fetch(url, { signal: timeout.signal });
      if (!response.ok) {
        throw new Error(`Dataset request returned HTTP ${response.status}.`);
      }
      pyodide.FS.writeFile(`remote_dataset_${index + 1}.csv`, await response.text());
      preparedCode = preparedCode.split(url).join(`remote_dataset_${index + 1}.csv`);
    } catch (error) {
      const reason = error.name === 'AbortError' ? 'request timed out' : error.message;
      throw new Error(`Unable to download ${url}: ${reason}`);
    } finally {
      timeout.clear();
    }
  }

  return preparedCode;
}

async function requestState(path, options = {}) {
  const urls = [path, `http://localhost:5050${path}`];
  let lastError;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      });
      if (!response.ok) {
        throw new Error(`State request failed with HTTP ${response.status}.`);
      }
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('State server is unavailable.');
}

export async function loadRemoteState() {
  return requestState('/api/state');
}

export async function saveRemoteState(state) {
  return requestState('/api/state', {
    method: 'POST',
    body: JSON.stringify(state),
  });
}

export async function checkBackendHealth() {
  try {
    const res = await fetch('/api/health', { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      return { online: true, ...data };
    }
  } catch (err) {
    // If relative fetch fails, try direct localhost:5050
    try {
      const directRes = await fetch('http://localhost:5050/api/health', { method: 'GET' });
      if (directRes.ok) {
        const data = await directRes.json();
        return { online: true, ...data };
      }
    } catch (e) {
      // Backend not running
    }
  }
  return { online: false, engine: 'Pyodide WebAssembly' };
}

/**
 * Execute Python code via Backend API or Pyodide fallback
 * @param {string} code - Python code to execute
 * @param {Function} onStatusUpdate - Callback for progress messages
 * @returns {Promise<{success: boolean, stdout: string, stderr: string, error: string, images: string[], executionTime: number, engine: string}>}
 */
export async function executePythonCode(code, onStatusUpdate = () => {}) {
  const startTime = performance.now();

  // 1. Try Native Python Backend first
  try {
    onStatusUpdate('Connecting to Python 3.11 Execution Server...');
    const requestBody = JSON.stringify({ code });
    const apiUrls = ['/api/execute', 'http://localhost:5050/api/execute'];
    let response = null;
    let lastBackendError = null;

    for (const apiUrl of apiUrls) {
      const timeout = createTimeoutSignal(EXECUTION_TIMEOUT_MS);
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
          signal: timeout.signal,
        });
        if (response.ok) break;
        lastBackendError = new Error(`Execution server returned HTTP ${response.status}.`);
      } catch (error) {
        lastBackendError = error;
      } finally {
        timeout.clear();
      }
    }

    if (response && response.ok) {
      onStatusUpdate('Processing outputs & generated figures...');
      const data = await response.json();
      return {
        success: data.success ?? true,
        stdout: data.stdout || '',
        stderr: data.stderr || '',
        error: data.error || null,
        images: data.images || [],
        executionTime: data.executionTime || ((performance.now() - startTime) / 1000).toFixed(3),
        engine: data.engine || 'Python 3.11 Native Server'
      };
    }

    if (lastBackendError?.name === 'AbortError') {
      onStatusUpdate('Python server timed out; switching to browser runtime...');
    } else {
      onStatusUpdate('Python server unavailable; switching to browser runtime...');
    }
  } catch (backendError) {
    console.warn('Native backend unavailable, switching to in-browser Pyodide:', backendError);
  }

  const unsupportedModules = getBrowserUnsupportedModules(code);
  if (unsupportedModules.length) {
    return {
      success: false,
      stdout: '',
      stderr: '',
      error: `This code imports ${unsupportedModules.join(', ')}. Those modules are not available in the browser runtime. Start the local Python server with "py server\\server.py" (or "npm.cmd run dev:full") and run the code again.`,
      images: [],
      executionTime: ((performance.now() - startTime) / 1000).toFixed(3),
      engine: 'Native Python Runtime required'
    };
  }

  // 2. Pyodide In-Browser Execution Fallback
  try {
    onStatusUpdate('Initializing in-browser Pyodide Python runtime...');
    const pyodide = await getPyodide(onStatusUpdate);
    
    onStatusUpdate('Executing Python code in Pyodide sandbox...');
    const preparedCode = await preparePyodideCode(pyodide, code, onStatusUpdate);

    // Preamble to capture stdout, stderr and matplotlib plots in Pyodide
    const pyodideRunnerCode = `
import sys
import io
import json
import base64
import traceback

captured_images = []

try:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    def _custom_show(*args, **kwargs):
        for num in plt.get_fignums():
            fig = plt.figure(num)
            buf = io.BytesIO()
            fig.savefig(buf, format='png', bbox_inches='tight', dpi=130)
            buf.seek(0)
            captured_images.append("data:image/png;base64," + base64.b64encode(buf.read()).decode('utf-8'))
            buf.close()
        plt.close('all')

    plt.show = _custom_show
    HAS_MPL = True
except Exception:
    HAS_MPL = False

_out_buf = io.StringIO()
_err_buf = io.StringIO()
_old_out = sys.stdout
_old_err = sys.stderr
sys.stdout = _out_buf
sys.stderr = _err_buf

_error_msg = None
_success = True

_user_code = ${JSON.stringify(preparedCode)}

try:
    exec(compile(_user_code, '<experiment>', 'exec'))
    if HAS_MPL:
        _custom_show()
except Exception:
    _success = False
    _error_msg = traceback.format_exc()
finally:
    sys.stdout = _old_out
    sys.stderr = _old_err

json.dumps({
    "success": _success,
    "stdout": _out_buf.getvalue(),
    "stderr": _err_buf.getvalue(),
    "error": _error_msg,
    "images": captured_images,
    "engine": "Pyodide WebAssembly (In-Browser)"
})
`;

    const resultJsonStr = await pyodide.runPythonAsync(pyodideRunnerCode);
    const result = JSON.parse(resultJsonStr);
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);

    return {
      ...result,
      executionTime: parseFloat(elapsed),
    };
  } catch (pyodideErr) {
    const message = pyodideErr.message || String(pyodideErr);
    return {
      success: false,
      stdout: '',
      stderr: '',
      error: `Execution runtime error: ${message} Start the local Python server with "py server\\server.py" or run "npm.cmd run dev:full", then try again.`,
      images: [],
      executionTime: ((performance.now() - startTime) / 1000).toFixed(3),
      engine: 'Pyodide WebAssembly'
    };
  }
}

/**
 * Lazy loads Pyodide WebAssembly runtime from CDN
 */
async function getPyodide(onProgress) {
  if (pyodideInstance) return pyodideInstance;

  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    try {
      if (!window.loadPyodide) {
        onProgress('Loading Pyodide WebAssembly engine...');
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          const timeoutId = window.setTimeout(() => {
            script.remove();
            reject(new Error('Pyodide CDN loading timed out. Start the local Python server and try again.'));
          }, EXECUTION_TIMEOUT_MS);
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
          script.onload = () => {
            window.clearTimeout(timeoutId);
            resolve();
          };
          script.onerror = () => {
            window.clearTimeout(timeoutId);
            reject(new Error('Failed to load Pyodide CDN script. Start the local Python server and try again.'));
          };
          document.head.appendChild(script);
        });
      }

      onProgress('Loading Python packages (numpy, pandas, matplotlib)...');
      const pyodide = await window.loadPyodide();
      await pyodide.loadPackage(['numpy', 'pandas', 'matplotlib']);
    
    // Provide sample dataset in virtual filesystem
    pyodide.FS.writeFile('students.csv', `id,name,age,grade,score,attendance
1,Alice,20,A,92.5,96.0
2,Bob,21,B,84.0,88.5
3,Charlie,22,A,95.0,99.0
4,Diana,20,C,72.5,75.0
5,Evan,21,B,88.0,91.0
6,Fiona,20,A,91.0,94.5
7,George,23,B,81.5,82.0
8,Hannah,21,A,96.5,98.0
9,Ian,22,C,74.0,79.5
10,Julia,20,A,94.0,95.0
`);

      pyodideInstance = pyodide;
      return pyodide;
    } catch (error) {
      pyodideLoadingPromise = null;
      throw error;
    }
  })();

  return pyodideLoadingPromise;
}
