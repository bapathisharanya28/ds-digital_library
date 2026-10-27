# DS Lab — Offline-Friendly Version 16

## Quick start (Windows)

1. Extract the entire ZIP to a normal folder, for example `C:\Users\<you>\Downloads\finalversion16`.
2. Install **Node.js 22 LTS** and **Python 3.13 (64-bit)**. Python 3.12 is also supported. Make sure the Python Launcher (`py`) is installed.
3. Open the extracted folder in VS Code.
4. In a PowerShell terminal, run:

   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\start-lab.ps1
   ```

The launcher creates/rebuilds the project-local `.venv` using Python 3.13 (or 3.12), installs all required Python and npm dependencies, starts the Python API in a separate PowerShell window, and starts Vite in the current terminal. The first setup requires internet access to download dependencies; later starts are faster.

Open `http://localhost:5173/`. Keep both terminal windows open while using the site.

## Manual start (optional)

Terminal 1 (project root):

```powershell
npm.cmd install
npm.cmd run dev
```

Terminal 2 (project root):

```powershell
.\.venv\Scripts\python.exe server\server.py
```

If you have not run the launcher yet, run `python -m pip install -r server\requirements.txt` using the selected Python 3.13/3.12 environment first.

## Experiment execution notes

- Experiments 1–10 are included, with sub-experiments for the case studies in Experiments 9 and 10.
- Customer segmentation and text emotion detection use bundled sample data, so they do not need to download datasets during execution.
- The API and Iris examples use offline sample/cached data when the network is unavailable.
- WordCloud uses the included pure-Python fallback to avoid requiring Microsoft C++ Build Tools. If the official `vaderSentiment` package cannot be installed, a small clearly documented offline fallback is bundled for demonstration runs.
- Most sample experiments are designed to finish in about five seconds on a typical laptop, but plotting, first-time library imports, or slow hardware can take longer. The runner retains a safety timeout so valid code is not cut off too aggressively.
- This ZIP includes dependency manifests and setup scripts rather than a copied `.venv`/`node_modules` directory; those environments are machine- and OS-specific and are installed on first run.

## Website data persistence

Editable website data is stored in `server\data\site-state.json`. If no saved state exists, the app uses the built-in initial data. Keep the backend running to save website changes to the project folder.
