
import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  FileText,
} from 'lucide-react';
import PdfViewer from './PdfViewer';

export default function ModuleOverview({
  module,
  allModules = [],
  onBackToModules,
  onNavigateModule,
}) {
  const [pdfViewer, setPdfViewer] = useState(null);

  if (!module) return null;

  const modules = allModules || [];
  const index = modules.findIndex((m) => m.id === module.id);

  const prev = index > 0 ? modules[index - 1] : null;
  const next =
    index >= 0 && index < modules.length - 1
      ? modules[index + 1]
      : null;

  const number = String(module.number || module.id || 1).padStart(2, '0');
  const topics = module.topics || [];
  const objectives = module.objectives || [];
  const pdfs = module.pdfs || [];

  return (
    <div className="py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Navigation Header */}
        <div className="pb-6 border-b border-stone-200 dark:border-white/10">
          <button
            type="button"
            onClick={onBackToModules}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Modules
          </button>
        </div>

        {/* Module Header */}
        <header className="space-y-4">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-violet-500/10 text-violet-800 dark:text-violet-200 border border-violet-500/20">
            MODULE {number}
          </span>

          <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-stone-950 dark:text-white tracking-tight leading-tight">
            {module.title || 'Untitled Module'}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-3xl leading-relaxed">
            {module.description || 'No description available.'}
          </p>
        </header>

        {/* Overview */}
        <section className="p-8 rounded-2xl card-academic glow-violet-subtle space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            OVERVIEW
          </h2>

          <p className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {module.overview || module.description || 'No overview available.'}
          </p>
        </section>

        {/* Topics and Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Topics */}
          <section className="p-7 rounded-2xl card-academic space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              WHAT YOU WILL LEARN
            </h2>

            {topics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No topics available.
              </p>
            )}
          </section>

          {/* Objectives */}
          <section className="p-7 rounded-2xl card-academic space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              MODULE OBJECTIVES
            </h2>

            {objectives.length > 0 ? (
              <ol className="space-y-3">
                {objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-stone-800 dark:text-stone-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 font-mono text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-stone-500">
                No learning objectives available.
              </p>
            )}
          </section>
        </div>

        {/* PDF Materials and Flipbook */}
        <section className="p-7 rounded-2xl card-academic space-y-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              MODULE PDF MATERIAL & FLIPBOOK
            </h2>

            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Read your module materials using the interactive flipbook or
              open the original PDF in a new tab.
            </p>
          </div>

          {pdfs.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {pdfs.map((pdf, i) => (
                <div
                  key={pdf.id || i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-white/[0.03] hover:border-violet-400/70 transition-all shadow-sm"
                >
                  {/* PDF Information */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-violet-600 dark:text-violet-300" />
                    </div>

                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-stone-900 dark:text-stone-100 break-words">
                        {pdf.name || `Module Resource ${i + 1}`}
                      </span>

                      <span className="block text-[11px] font-mono text-stone-500 dark:text-stone-400">
                        Module {number} Material
                      </span>
                    </div>
                  </div>

                  {/* PDF Actions: View only */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setPdfViewer(i)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm transition-all"
                      title="Open interactive flipbook"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Flip Book</span>
                    </button>

                    {pdf.dataUrl && (
                      <a
                        href={pdf.dataUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-white/5 text-stone-800 dark:text-stone-200 text-xs font-medium transition-all"
                        title="View original PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-stone-500" />
                        <span>View PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500">
              No PDF resources available for this module.
            </p>
          )}
        </section>

        {/* Module Information */}
        <section className="p-7 rounded-2xl card-academic">
          <h2 className="text-xs font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-6 font-bold">
            MODULE INFORMATION
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-serif font-black text-3xl text-stone-950 dark:text-white">
                {module.periods ?? '—'}
              </div>
              <div className="text-xs font-mono text-stone-500 uppercase mt-1">
                Periods
              </div>
            </div>

            <div>
              <div className="font-serif font-black text-3xl text-stone-950 dark:text-white">
                {topics.length}
              </div>
              <div className="text-xs font-mono text-stone-500 uppercase mt-1">
                Topics
              </div>
            </div>

            <div>
              <div className="font-serif font-black text-3xl text-violet-700 dark:text-violet-300">
                {pdfs.length}
              </div>
              <div className="text-xs font-mono text-stone-500 uppercase mt-1">
                PDFs
              </div>
            </div>
          </div>
        </section>

        {/* Previous / Next Module Navigation */}
        <div className="pt-8 border-t border-stone-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prev && onNavigateModule ? (
            <button
              type="button"
              onClick={() => onNavigateModule(prev)}
              className="inline-flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 hover:text-violet-700 dark:hover:text-violet-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Module
            </button>
          ) : (
            <span />
          )}

          {next && onNavigateModule ? (
            <button
              type="button"
              onClick={() => onNavigateModule(next)}
              className="inline-flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 hover:text-violet-700 dark:hover:text-violet-300"
            >
              Next Module
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBackToModules}
              className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
            >
              Back to Modules
            </button>
          )}
        </div>
      </div>

      {/* PDF Flipbook Viewer */}
      {pdfViewer !== null && (
        <PdfViewer
          pdfs={pdfs}
          initialIndex={pdfViewer}
          onClose={() => setPdfViewer(null)}
        />
      )}
    </div>
  );
}
