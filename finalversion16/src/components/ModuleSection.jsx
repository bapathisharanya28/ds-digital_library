import React from 'react';
import ModuleCard from './ModuleCard';
import { Plus, BookOpen } from 'lucide-react';

export default function ModuleSection({ modules, onSelectModule, onAddModule, onOpenFlipbook }) {
  return (
    <section id="modules" className="py-14 sm:py-20 border-b border-stone-200/70 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 mb-2 font-semibold"><BookOpen className="w-3.5 h-3.5" /> Academic Curriculum</div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-white tracking-tight">Data Science Modules</h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-1 max-w-xl">Theory and learning-overview sections based on the Data Science course syllabus.</p>
          </div>
          <div className="text-xs font-mono text-stone-500 dark:text-stone-400">Total Periods: 45</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={() => onSelectModule(module)}
              onOpenFlipbook={(mod, idx) => onOpenFlipbook && onOpenFlipbook(mod, idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
