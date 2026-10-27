import React from 'react';
import ExperimentCard from './ExperimentCard';
import SearchBar from './SearchBar';
import { Plus, Terminal, FlaskConical } from 'lucide-react';

export default function ExperimentSection({
  experiments,
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  onSelectExperiment,
  onSelectSubExperiment,
  onQuickRun,
  onAddExperiment,
  onEditExperiment,
  onDeleteExperiment
}) {
  const filteredExperiments = experiments.filter((exp) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      exp.name.toLowerCase().includes(q) ||
      exp.description.toLowerCase().includes(q) ||
      (exp.technologies || []).some((t) => t.toLowerCase().includes(q)) ||
      (exp.subExperiments || []).some((sub) =>
        sub.name.toLowerCase().includes(q) || sub.description.toLowerCase().includes(q)
      );
    const matchesTag = !selectedTag || (exp.technologies || []).some((t) => t.toLowerCase() === selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  return (
    <section id="experiments" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 mb-2 font-semibold">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>LAB WORK</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-stone-950 dark:text-white tracking-tight">
              Published Experiments
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-1 max-w-xl">
              Laboratory implementations, sub-experiments, source code, and generated outputs.
            </p>
          </div>
          
        </div>

        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} totalResults={filteredExperiments.length} selectedTag={selectedTag} onSelectTag={onSelectTag} />

        <div className="space-y-5 pt-2">
          {filteredExperiments.length === 0 ? (
            <div className="p-12 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
              <Terminal className="w-10 h-10 text-stone-500 mx-auto" />
              <p className="font-serif font-bold text-xl text-stone-900 dark:text-white">No matching experiments found</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">Try another search term or clear the tag filter.</p>
            </div>
          ) : filteredExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} onSelect={() => onSelectExperiment(experiment)} onSelectSub={(sub) => onSelectSubExperiment(experiment, sub.id)} onQuickRun={() => onQuickRun(experiment)} onEdit={() => onEditExperiment(experiment)} onDelete={() => onDeleteExperiment(experiment)} />
          ))}
        </div>
      </div>
    </section>
  );
}
