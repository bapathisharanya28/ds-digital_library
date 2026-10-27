import React from 'react';
import StudentProfile from './StudentProfile';
import { FlaskConical, Layers, Sparkles, BookOpen } from 'lucide-react';

export default function Hero({ 
  student, 
  onEditProfile,
  onViewPortfolio,
  totalExperiments, 
  totalModules,
  totalProjects = 2,
  onNavigateToExperiments,
  onNavigateToProjects
}) {
  return (
    <section id="hero" className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-stone-200/60 dark:border-violet-950/40">
      
      {/* Editorial subtle background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-500/5 dark:bg-violet-900/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Editorial Heading & Context */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small text / Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
              <span>ACADEMIC LAB • 2026</span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-stone-900 dark:text-stone-50 leading-[0.95]">
              Data Science
              Digital Library
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans max-w-xl leading-relaxed">
              &ldquo;A curated record of implementations, outputs and laboratory work.&rdquo;
            </p>

            {/* Metric Pills & Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div 
                onClick={onNavigateToExperiments}
                className="cursor-pointer group flex items-center gap-3 px-5 py-3 rounded-2xl card-academic glow-violet-subtle hover:border-violet-500/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-serif font-bold text-lg group-hover:scale-110 transition-transform">
                  {totalExperiments}
                </div>
                <div>
                  <span className="block font-serif font-bold text-lg text-stone-900 dark:text-stone-100 leading-none">
                    {totalExperiments} Experiments
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                    Published & Runnable
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl card-academic">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-serif font-bold text-lg">
                  {totalModules}
                </div>
                <div>
                  <span className="block font-serif font-bold text-lg text-stone-900 dark:text-stone-100 leading-none">
                    {totalModules} Modules
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                    Core Curriculum
                  </span>
                </div>
              </div>

              {onNavigateToProjects && (
                <div 
                  onClick={onNavigateToProjects}
                  className="cursor-pointer group flex items-center gap-3 px-5 py-3 rounded-2xl card-academic glow-violet-subtle hover:border-violet-500/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-serif font-bold text-lg group-hover:scale-110 transition-transform">
                    {totalProjects}
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-lg text-stone-900 dark:text-stone-100 leading-none">
                      {totalProjects} Projects
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                      Featured & Editable
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Highlights row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-stone-500 dark:text-stone-400 pt-2">
              <span className="flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-violet-500" />
                Real Python Execution
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-500" />
                Native Matplotlib Rendering
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                Editorial Grade Notebook
              </span>
            </div>

          </div>

          {/* RIGHT: Student Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <StudentProfile student={student} onEditProfile={onEditProfile} onViewPortfolio={onViewPortfolio} />
          </div>

        </div>
      </div>
    </section>
  );
}
