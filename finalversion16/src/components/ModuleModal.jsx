import React from 'react';
import { X, Layers, FileText, BookOpen } from 'lucide-react';

export default function ModuleModal({
  isOpen,
  onClose,
  initialModule = null,
}) {
  if (!isOpen || !initialModule) {
    return null;
  }

  const module = initialModule;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-2xl bg-stone-50 dark:bg-[#120c24] rounded-2xl border border-stone-200 dark:border-violet-900/40 shadow-2xl overflow-hidden my-6">

        {/* Header */}
        <div className="px-6 py-4 bg-white dark:bg-[#160f2c] border-b border-stone-200 dark:border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                Module Details
              </h3>

              <p className="text-xs font-mono text-stone-500">
                Academic Curriculum
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close module details"
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Module Information */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">

          {/* Module Number */}
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-mono font-bold">
              MODULE {String(module.number || 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-950 dark:text-white">
              {module.title || 'Untitled Module'}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {module.description || 'No description available.'}
            </p>
          </div>

          {/* Overview */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Detailed Overview
            </h3>

            <div className="p-4 rounded-xl bg-white dark:bg-[#1a1233] border border-stone-200 dark:border-stone-700">
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                {module.overview ||
                  module.description ||
                  'No overview available.'}
              </p>
            </div>
          </section>

          {/* Topics */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold">
              Topics Covered
            </h3>

            {module.topics?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {module.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-800 dark:text-violet-200 text-xs font-mono"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No topics available.
              </p>
            )}
          </section>

          {/* Learning Objectives */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold">
              Learning Objectives
            </h3>

            {module.objectives?.length > 0 ? (
              <div className="space-y-3">
                {module.objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1a1233] border border-stone-200 dark:border-stone-700"
                  >
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 font-mono text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>

                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed pt-1">
                      {objective}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No learning objectives available.
              </p>
            )}
          </section>

          {/* Module PDFs */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Module Resources
            </h3>

            {module.pdfs?.length > 0 ? (
              <div className="space-y-2">
                {module.pdfs.map((pdf, index) => (
                  <div
                    key={pdf.id || index}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1a1233]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>

                    <span className="text-sm text-stone-800 dark:text-stone-200 break-all">
                      {pdf.name || `Module Resource ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No PDF resources available.
              </p>
            )}
          </section>

          {/* Experiments */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold">
              Experiments
            </h3>

            {module.experiments?.length > 0 ? (
              <div className="space-y-2">
                {module.experiments.map((experiment, index) => (
                  <div
                    key={experiment.id || index}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1a1233]"
                  >
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-white">
                      {experiment.name ||
                        experiment.title ||
                        `Experiment ${index + 1}`}
                    </h4>

                    {experiment.description && (
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        {experiment.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No experiments available.
              </p>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}