import React from 'react';
import { Terminal, Shield, Award, BookOpen, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ student }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="border-t border-stone-200/80 dark:border-violet-950/60 bg-stone-100/60 dark:bg-[#0a0614] py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Col 1: Brand & Academic Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-serif font-black text-sm shadow-md shadow-violet-600/30">
                DS
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 block">
                  DS LAB • Laboratory Portal
                </span>
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                  Academic Record • 2026
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              An editorial laboratory environment documenting computational statistics,
              exploratory data analysis, algorithmic models, and quantitative visual outputs.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Certified Python 3.11 Sandboxed Execution</span>
            </div>
          </div>

          {/* Col 2: Academic Info */}
          <div className="md:col-span-4 space-y-2 text-xs sm:text-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold block mb-3">
              Institutional Context
            </span>
            <p className="text-stone-700 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">University:</strong> {student?.university || 'Institute of Technology'}
            </p>
            <p className="text-stone-700 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">Subject:</strong> {student?.subject || 'Data Science Laboratory'}
            </p>
            <p className="text-stone-700 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">Advisor:</strong> {student?.faculty || 'Faculty of AI & ML'}
            </p>
            <p className="text-stone-700 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">Lab Code:</strong> <span className="font-mono">DS-LAB-602</span>
            </p>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono">
            <span className="text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold block mb-3">
              Platform
            </span>
            <ul className="space-y-2 text-stone-600 dark:text-stone-400">
              <li>
                <a href="#hero" className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                  Top of Lab
                </a>
              </li>
              <li>
                <a href="#modules" className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                  Course Modules
                </a>
              </li>
              <li>
                <a href="#experiments" className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                  Published Experiments
                </a>
              </li>
              <li>
                <button 
                  onClick={scrollToTop} 
                  className="flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:underline pt-2"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to top</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200/60 dark:border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div>
            © 2026 DS LAB. Developed for academic laboratory coursework &amp; research.
          </div>

          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Violet &amp; Cream Edition</span>
            <span>•</span>
            <span>React + Vite + Python 3.11</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
