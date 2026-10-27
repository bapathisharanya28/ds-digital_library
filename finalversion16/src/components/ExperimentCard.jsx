import React from 'react';
import { Play, ArrowRight, Calendar, CheckCircle2, Edit3, Trash2 } from 'lucide-react';

export default function ExperimentCard({ experiment, onSelect, onSelectSub, onQuickRun, onEdit, onDelete }) {
  const formattedNum = String(experiment.number || experiment.id).padStart(2, '0');
  return (
    <article className="group w-full rounded-2xl card-academic glow-violet-subtle overflow-hidden hover:border-violet-500/50 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <div className="relative min-h-[190px] lg:min-h-full bg-black overflow-hidden">
          {experiment.coverImage && <img src={experiment.coverImage} alt={`${experiment.name} cover`} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="font-mono text-xs font-bold tracking-widest text-violet-200">EXPERIMENT {formattedNum}</span>
            <div className="text-xs text-white/75 mt-1">{experiment.subExperiments?.length || 0} sub-experiments</div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4 cursor-pointer" onClick={onSelect}>
          <div className="flex flex-wrap items-center gap-2">
            {experiment.date && <span className="font-mono text-xs text-stone-600 dark:text-stone-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{experiment.date}</span>}
            {experiment.subExperiments?.length > 0 && <span className="font-mono text-[11px] text-violet-800 dark:text-violet-200 bg-violet-500/10 px-2 py-1 rounded border border-violet-500/20">{experiment.subExperiments.length} parts</span>}
            {(experiment.output || experiment.outputImages?.length > 0) && <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Executed</span>}
          </div>

          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug">{experiment.name}</h3>
          <p className="text-sm text-stone-700 dark:text-stone-300 max-w-4xl leading-relaxed">{experiment.description}</p>

          <div className="flex flex-wrap gap-2">
            {(experiment.technologies || []).map((tech, idx) => <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700">{tech}</span>)}
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">SUB-EXPERIMENTS</p>
            <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
              {(experiment.subExperiments || []).map((sub) => (
                <button key={sub.id} onClick={() => onSelectSub(sub)} className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs font-mono font-bold text-violet-800 dark:text-violet-200 hover:bg-violet-600 hover:text-white transition-colors" title={`Open ${sub.id} — ${sub.name}`}>
                  {sub.id} · {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
            <button onClick={onQuickRun} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-all"><Play className="w-3.5 h-3.5 fill-current" /> RUN CODE</button>
            <button onClick={onSelect} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all">VIEW LAB <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </article>
  );
}
