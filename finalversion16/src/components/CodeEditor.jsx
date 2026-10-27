import React, { useState, useRef } from 'react';
import { Play, Copy, Check, Trash2, Code2, RotateCcw } from 'lucide-react';

export default function CodeEditor({ 
  code, 
  onChange, 
  onRun, 
  isRunning = false, 
  readOnly = false,
  language = "Python 3.11",
  onReset = null
}) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lines = (code || '').split('\n');
  const lineCount = lines.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleClear = () => {
    if (readOnly) return;
    if (window.confirm('Clear all code in editor?')) {
      onChange('');
    }
  };

  const handleKeyDown = (e) => {
    // Run on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isRunning) {
        onRun();
      }
    }
    // Handle tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // Sync scroll between textarea and line numbers
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Editor Container */}
      <div className="rounded-2xl border border-stone-800 bg-[#0c0817] shadow-xl overflow-hidden font-mono text-sm transition-all focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/20">
        
        {/* Editor Top Bar */}
        <div className="px-5 py-3 bg-[#130d24] border-b border-stone-800/80 flex items-center justify-between select-none">
          
          {/* Left: Window dots & Language badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="h-3 w-px bg-stone-700/60 mx-1" />

            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                {language}
              </span>
            </div>
          </div>

          {/* Right: Actions (Copy, Clear, Reset) */}
          <div className="flex items-center gap-2">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                title="Reset to default code"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {!readOnly && (
              <button
                type="button"
                onClick={handleClear}
                title="Clear code"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              title="Copy code to clipboard"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-violet-950/60 text-violet-300 hover:bg-violet-900/80 border border-violet-800/40 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Canvas (Line numbers + Textarea) */}
        <div className="relative flex min-h-[260px] max-h-[500px] overflow-hidden bg-[#0a0614]">
          
          {/* Line Numbers Gutter */}
          <div
            ref={lineNumbersRef}
            className="w-12 sm:w-14 py-4 pr-3 text-right text-xs font-mono text-stone-600 select-none bg-[#090512] border-r border-stone-800/60 overflow-hidden leading-6 shrink-0"
          >
            {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>

          {/* Code Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange && onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder="# Write Python code here..."
            className="flex-1 w-full p-4 bg-transparent text-violet-100 placeholder-stone-600 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none overflow-auto whitespace-pre"
            style={{
              tabSize: 4,
            }}
          />
        </div>

        {/* Editor Bottom Status Bar */}
        <div className="px-4 py-2 bg-[#090512] border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <div className="flex items-center gap-4">
            <span>{lineCount} lines</span>
            <span>UTF-8</span>
          </div>
          <div className="hidden sm:inline-block">
            Press <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">Enter</kbd> to run
          </div>
        </div>

      </div>

      {/* Prominent RUN CODE button */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="text-xs font-mono text-stone-500 hidden sm:block">
          {isRunning ? (
            <span className="text-violet-400 animate-pulse">
              ⚡ Executing in Python sandbox...
            </span>
          ) : (
            <span>Ready for execution</span>
          )}
        </div>

        <button
          type="button"
          onClick={onRun}
          disabled={isRunning}
          className={`ml-auto inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-mono text-sm uppercase tracking-wider font-bold transition-all shadow-lg cursor-pointer ${
            isRunning
              ? 'bg-violet-900/60 text-violet-300 cursor-not-allowed border border-violet-800'
              : 'bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'RUNNING...' : '▶ RUN CODE'}</span>
        </button>
      </div>

    </div>
  );
}
