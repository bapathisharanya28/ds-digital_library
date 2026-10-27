import React from 'react';
import { ArrowLeft, ExternalLink, Code2, Database, BarChart3, BrainCircuit, BookOpen, GitBranch, ChartNoAxesCombined, Terminal } from 'lucide-react';

const tools = [
  { name: 'Google Colab', category: 'Cloud notebooks', description: 'Write and run Python notebooks in your browser, analyze datasets, and experiment with machine learning.', url: 'https://colab.research.google.com/', icon: Code2, tone: 'from-orange-500/20 to-yellow-500/5', mark: 'Co' },
  { name: 'Kaggle', category: 'Datasets & competitions', description: 'Explore public datasets, build notebooks, practice machine learning, and join data science competitions.', url: 'https://www.kaggle.com/', icon: Database, tone: 'from-sky-500/20 to-cyan-500/5', mark: 'K' },
  { name: 'Jupyter Notebook', category: 'Interactive coding', description: 'Combine executable code, visualizations, equations, and notes in interactive notebooks.', url: 'https://jupyter.org/try', icon: BookOpen, tone: 'from-orange-500/20 to-red-500/5', mark: 'J' },
  { name: 'VS Code', category: 'Code editor', description: 'Build Python projects, manage environments, debug programs, and work with Git and extensions.', url: 'https://vscode.dev/', icon: Terminal, tone: 'from-blue-500/20 to-indigo-500/5', mark: 'VS' },
  { name: 'Tableau Public', category: 'Data visualization', description: 'Create and share interactive charts, dashboards, and visual data stories.', url: 'https://public.tableau.com/', icon: BarChart3, tone: 'from-blue-500/20 to-cyan-500/5', mark: 'T' },
  { name: 'Microsoft Power BI', category: 'Business intelligence', description: 'Connect data sources and build interactive reports and business dashboards.', url: 'https://app.powerbi.com/', icon: ChartNoAxesCombined, tone: 'from-yellow-500/20 to-amber-500/5', mark: 'BI' },
  { name: 'GitHub', category: 'Version control', description: 'Host code, track changes, collaborate with others, and showcase your data science projects.', url: 'https://github.com/', icon: GitBranch, tone: 'from-slate-500/20 to-zinc-500/5', mark: 'GH' },
  { name: 'Google AI Studio', category: 'Generative AI', description: 'Prototype AI applications, test Gemini models, and experiment with prompts and structured outputs.', url: 'https://aistudio.google.com/', icon: BrainCircuit, tone: 'from-violet-500/20 to-fuchsia-500/5', mark: 'AI' },
];

export default function ToolsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/95">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-violet-600 transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-9 sm:py-12">
        <div className="max-w-3xl mb-9 sm:mb-11">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-mono uppercase tracking-wider"><BrainCircuit className="w-4 h-4" /> Data Science Toolkit</div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black font-serif">Tools for your next idea.</h1>
          <p className="mt-4 text-base sm:text-lg leading-7 text-[var(--text-muted)]">Choose a platform to open its live website. These tools support coding, datasets, visualization, machine learning, and collaboration.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="group min-h-[220px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500" aria-label={`Open ${tool.name} in a new tab`}>
              <div className={`w-full h-20 rounded-xl bg-gradient-to-br ${tool.tone} border border-[var(--border-subtle)] flex items-center justify-between px-4`}>
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center"><Icon className="w-6 h-6 text-violet-600 dark:text-violet-300" /></div>
                <span className="text-2xl font-black font-serif tracking-tight text-[var(--text-primary)] opacity-80">{tool.mark}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3"><div><p className="text-[10px] uppercase tracking-widest font-mono text-violet-700 dark:text-violet-300">{tool.category}</p><h2 className="mt-1 text-xl font-bold font-serif">{tool.name}</h2></div><ExternalLink className="w-4 h-4 mt-1 shrink-0 text-[var(--text-muted)] group-hover:text-violet-600 transition-colors" /></div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{tool.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 dark:text-violet-300">Open tool <ExternalLink className="w-3.5 h-3.5" /></span>
            </a>;
          })}
        </div>
        <p className="mt-6 text-xs text-[var(--text-muted)]">External websites open in a new tab. Some platforms may require signing in.</p>
      </main>
    </div>
  );
}
