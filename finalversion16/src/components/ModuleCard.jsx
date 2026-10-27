import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ModuleCard({ module, onClick, onOpenFlipbook }) {
  const formattedNumber = String(module.number || module.id).padStart(2, '0');

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl p-7 card-academic glow-violet-subtle hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top accent glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div>
        {/* Module Number Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-violet-700 dark:text-violet-300 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            MODULE {formattedNumber}
          </span>
          <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800/80 text-stone-400 group-hover:text-violet-600 dark:group-hover:text-violet-300 group-hover:bg-violet-500/10 flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 mb-2.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
          {module.title}
        </h3>

        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-3">
          <span>Data Science Module</span>
          {module.periods ? <span>• {module.periods} Periods</span> : null}
        </div>

        {/* Short description */}
        <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {module.pdfs && module.pdfs.length > 0 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFlipbook ? onOpenFlipbook(module, 0) : onClick();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-violet-500/10 hover:bg-violet-600 hover:text-white text-violet-700 dark:text-violet-300 transition-colors font-medium text-[11px]"
                title="Open interactive 3D flipbook"
              >
                <span>📖 Flip Book</span>
              </button>
              <a
                href={module.pdfs[0].dataUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors text-[11px]"
                title="View original PDF"
              >
                <span>View PDF</span>
              </a>
            </>
          )}
        </div>
        <span className="text-violet-700 dark:text-violet-300 font-sans font-medium flex items-center gap-1 group-hover:underline">
          <span>Overview</span>
          <span>→</span>
        </span>
      </div>
    </div>
  );
}
