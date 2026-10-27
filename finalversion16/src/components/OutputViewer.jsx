import React, { useState } from 'react';
import { 
  Terminal, 
  Clock, 
  AlertTriangle, 
  Download, 
  Maximize2, 
  Copy, 
  Check, 
  Cpu, 
  Image as ImageIcon 
} from 'lucide-react';

export default function OutputViewer({ 
  outputResult, 
  isRunning = false, 
  statusMessage = '' 
}) {
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (isRunning) {
    return (
      <div className="w-full rounded-2xl border border-stone-800 bg-[#0d081b] p-8 shadow-xl">
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 animate-spin">
              <Terminal className="w-6 h-6" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-violet-400 animate-ping" />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-stone-100">
              Running Python Experiment...
            </h4>
            <p className="font-mono text-xs text-violet-300">
              {statusMessage || 'Executing in sandboxed Python runtime and generating visual outputs...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!outputResult) {
    return (
      <div className="w-full rounded-2xl border border-stone-800/60 bg-[#0d081b]/60 p-6 text-center text-stone-500 font-mono text-xs">
        <Terminal className="w-5 h-5 mx-auto mb-2 opacity-50" />
        <span>Click &ldquo;▶ RUN CODE&rdquo; above to execute Python and observe stdout, returns, and generated figures.</span>
      </div>
    );
  }

  const { success, stdout, stderr, error, images = [], executionTime, engine } = outputResult;

  const handleCopyText = async () => {
    try {
      const textToCopy = (stdout || '') + (error ? `\nERROR:\n${error}` : '');
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy output:', err);
    }
  };

  const handleDownloadImage = (imgUrl, index) => {
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `ds_lab_figure_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Main Terminal Window */}
      <div className="rounded-2xl border border-stone-800 bg-[#0c0817] shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
        
        {/* Output Header */}
        <div className="px-5 py-3 bg-[#130d24] border-b border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${success ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="w-3 h-3 rounded-full bg-stone-700" />
              <span className="w-3 h-3 rounded-full bg-stone-700" />
            </div>

            <div className="h-3 w-px bg-stone-700/60 mx-1" />

            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-stone-200">
                OUTPUT
              </span>
            </div>
          </div>

          {/* Right Meta Badges */}
          <div className="flex items-center gap-3 text-xs">
            {executionTime !== undefined && (
              <span className="flex items-center gap-1 text-stone-400 text-[11px]">
                <Clock className="w-3 h-3 text-violet-400" />
                <span>{executionTime}s</span>
              </span>
            )}

            {engine && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-800/50">
                <Cpu className="w-3 h-3" />
                <span>{engine}</span>
              </span>
            )}

            {(stdout || error) && (
              <button
                type="button"
                onClick={handleCopyText}
                className="p-1 rounded text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
                title="Copy terminal output"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Text Output Body */}
        <div className="p-5 overflow-x-auto max-h-[380px] space-y-4">
          
          {/* Stdout stream */}
          {stdout ? (
            <pre className="text-stone-200 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre font-normal">
              {stdout}
            </pre>
          ) : !error && images.length === 0 ? (
            <div className="text-stone-500 italic">
              Execution completed with no standard console output.
            </div>
          ) : null}

          {/* Stderr stream warning */}
          {stderr && !error && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Standard Warning / Stderr:</span>
              </div>
              <pre className="whitespace-pre-wrap">{stderr}</pre>
            </div>
          )}

          {/* Error Panel (Clean terminal error display) */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>ERROR</span>
              </div>
              <pre className="whitespace-pre-wrap overflow-x-auto leading-relaxed text-rose-200">
                {error}
              </pre>
            </div>
          )}

        </div>
      </div>

      {/* GRAPH OUTPUT (Generated Matplotlib / Seaborn figures) */}
      {/* IMPORTANT: If multiple graphs are generated, display them vertically! */}
      {images && images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>GENERATED GRAPH OUTPUT ({images.length} {images.length === 1 ? 'FIGURE' : 'FIGURES'})</span>
            </h4>
            <span className="text-[11px] font-mono text-stone-500">
              Preserved aspect ratio • Matplotlib High-DPI
            </span>
          </div>

          {/* VERTICAL GRAPH STACK */}
          <div className="space-y-6">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-800 bg-[#0f0a1f] p-4 sm:p-6 shadow-xl space-y-3"
              >
                {/* Figure Top Bar */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-violet-300">FIGURE {idx + 1}</span>
                    <span className="text-stone-600">•</span>
                    <span>140 DPI Vector Rasterized</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadImage(imgUrl, idx)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                      title="Download figure image"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={() => setSelectedImage(imgUrl)}
                      className="p-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                      title="View full size"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Actual Generated Image */}
                <div className="flex justify-center items-center py-2 bg-stone-950/40 rounded-xl overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Generated Graph ${idx + 1}`}
                    className="max-w-full h-auto rounded-lg shadow-md transition-transform hover:scale-[1.01]"
                    style={{ maxHeight: '600px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Full Image View */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out animate-fadeIn"
        >
          <div className="max-w-5xl max-h-[90vh] p-2 bg-stone-900 rounded-2xl border border-stone-700 overflow-hidden shadow-2xl">
            <img
              src={selectedImage}
              alt="Enlarged Plot"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

    </div>
  );
}
