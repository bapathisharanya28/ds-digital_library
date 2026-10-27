import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  FolderKanban,
  ExternalLink,
  Pencil,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Layers,
  Database,
  Cpu,
  Eye,
  Activity,
  Save,
  X,
  Sparkles
} from 'lucide-react';
import ProjectModal from './ProjectModal';

function GitHubIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7.688.214.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function ProjectsPage({
  projects,
  onBack,
  onSaveProject,
  onDeleteProject
}) {
  const [selectedId, setSelectedId] = useState(() => projects[0]?.id || 'stock-day-tracker');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState(null); // null = new, project = edit
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [inlineDescription, setInlineDescription] = useState('');
  const [inlineTitle, setInlineTitle] = useState('');

  // Find currently selected project, fallback to first
  const selectedProject = projects.find((p) => p.id === selectedId) || projects[0];

  useEffect(() => {
    if (selectedProject) {
      setInlineDescription(selectedProject.description || '');
      setInlineTitle(selectedProject.title || '');
      setIsInlineEditing(false);
    }
  }, [selectedId, selectedProject]);

  const handleSelectProject = (id) => {
    setSelectedId(id);
    setIsInlineEditing(false);
    // Smooth scroll to the on-page description section
    const el = document.getElementById('project-details-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEditModal = (project) => {
    setModalTarget(project);
    setIsModalOpen(true);
  };

  const handleOpenNewModal = () => {
    setModalTarget(null);
    setIsModalOpen(true);
  };

  const handleSaveInline = () => {
    if (!selectedProject) return;
    const updated = {
      ...selectedProject,
      title: inlineTitle.trim() || selectedProject.title,
      description: inlineDescription.trim() || selectedProject.description
    };
    onSaveProject(updated);
    setIsInlineEditing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] hover:text-violet-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lab
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20">
              {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} Registered
            </span>

            <button
              onClick={handleOpenNewModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Intro Hero banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-mono uppercase tracking-widest">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Featured Software Engineering Projects</span>
          </div>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight">
            Projects Portfolio
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">
            Explore complete full-stack web applications, market analytics systems, and civic platforms.
            Click any project card below to view its complete description, architecture, and live details on this page.
          </p>
        </div>

        {/* SECTION 1: PROJECT CARDS GRID */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>Select a Project Card</span>
              <span className="text-xs font-mono text-[var(--text-muted)] font-normal">
                (Click to display full description below)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((proj, idx) => {
              const isSelected = selectedProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(proj.id)}
                  className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col ${
                    isSelected
                      ? 'border-violet-500 bg-[var(--bg-card)] shadow-xl ring-2 ring-violet-500/40 -translate-y-1'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-violet-500/50 hover:shadow-lg'
                  }`}
                >
                  {/* Card Visual Banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-900">
                    <img
                      src={proj.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80'}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    
                    {/* Top tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider bg-black/60 text-amber-300 backdrop-blur-md border border-white/10">
                        {proj.category || `Project 0${idx + 1}`}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-emerald-500/20 text-emerald-300 backdrop-blur-md border border-emerald-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {proj.status || 'Completed'}
                        </span>
                        
                        {/* Quick Edit button on card */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(proj);
                          }}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-violet-600 text-white backdrop-blur-md transition-colors"
                          title="Edit this project"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-xs font-mono text-violet-300 uppercase tracking-widest">
                        Project #{idx + 1}
                      </span>
                      <h3 className="font-serif font-black text-xl sm:text-2xl text-white leading-tight truncate drop-shadow-sm">
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    {/* Subtitle / Tagline */}
                    {proj.tagline && (
                      <p className="text-xs font-medium text-violet-600 dark:text-violet-400 font-sans line-clamp-1">
                        {proj.tagline}
                      </p>
                    )}

                    {/* Short Description Preview */}
                    <p className="text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(proj.technologies || []).slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-100 dark:bg-stone-800/70 text-[var(--text-primary)] border border-stone-200 dark:border-stone-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {(proj.technologies || []).length > 5 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-bold">
                          +{proj.technologies.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Footer / Selection prompt */}
                    <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                      <span className="font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        {isSelected ? '✓ Currently Selected & Viewing' : 'Click to view full description →'}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {proj.date || '2026'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: SELECTED PROJECT ON-PAGE DESCRIPTION & DETAILS */}
        {selectedProject && (
          <section id="project-details-section" className="pt-6">
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xl overflow-hidden">
              
              {/* Detail Header & Action Toolbar */}
              <div className="relative p-6 sm:p-10 border-b border-[var(--border-subtle)] bg-gradient-to-br from-violet-600/10 via-transparent to-amber-500/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30">
                        {selectedProject.category || 'Featured Application'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {selectedProject.status || 'Completed'}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        Academic / Engineering Year: {selectedProject.date || '2026'}
                      </span>
                    </div>

                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={inlineTitle}
                        onChange={(e) => setInlineTitle(e.target.value)}
                        className="lab-input text-2xl sm:text-3xl font-serif font-black mt-2"
                        placeholder="Project Title"
                      />
                    ) : (
                      <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] leading-tight">
                        {selectedProject.title}
                      </h2>
                    )}

                    {selectedProject.tagline && (
                      <p className="text-sm sm:text-base font-medium text-violet-600 dark:text-violet-400">
                        {selectedProject.tagline}
                      </p>
                    )}
                  </div>

                  {/* Top Action buttons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {isInlineEditing ? (
                      <>
                        <button
                          onClick={handleSaveInline}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-md transition-all"
                        >
                          <Save className="w-4 h-4" /> Save In-Place
                        </button>
                        <button
                          onClick={() => setIsInlineEditing(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-subtle)] text-sm font-semibold text-[var(--text-muted)] hover:bg-stone-500/10"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleOpenEditModal(selectedProject)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm transition-all hover:scale-[1.02]"
                          title="Open full editor modal"
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit Project</span>
                        </button>

                        <button
                          onClick={() => setIsInlineEditing(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--border-subtle)] text-sm font-medium hover:bg-violet-500/10 transition-colors"
                          title="Quick edit description on page"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Quick Text Edit</span>
                        </button>

                        {projects.length > 1 && (
                          <button
                            onClick={() => onDeleteProject(selectedProject)}
                            className="p-2.5 rounded-xl border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Delete this project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Grid: Details, Visuals, and Architecture */}
              <div className="p-6 sm:p-10 space-y-10">

                {/* Visual Banner & Interactive Demo Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Project Image with High-Definition Framing */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-md aspect-video bg-stone-900 group">
                      <img
                        src={selectedProject.coverImage}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-violet-400" />
                          <span className="text-xs font-mono uppercase tracking-wider">
                            Interactive System Architecture
                          </span>
                        </div>
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-mono text-white transition-colors"
                          >
                            <GitHubIcon className="w-3 h-3" /> GitHub
                          </a>
                        )}
                      </div>
                    </div>

                    {/* External links */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-subtle)] text-xs font-mono font-medium hover:bg-violet-500/10 transition-colors"
                        >
                          <GitHubIcon className="w-4 h-4" />
                          <span>Inspect Codebase</span>
                          <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                        </a>
                      )}
                      {selectedProject.liveDemoUrl && (
                        <a
                          href={selectedProject.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-mono font-medium hover:opacity-90 transition-opacity"
                        >
                          <Activity className="w-4 h-4" />
                          <span>Live Service Deployment</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Interactive Feature Highlights / Ticker Simulation */}
                  <div className="lg:col-span-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        {selectedProject.id === 'stock-day-tracker' ? 'Simulated NSE/BSE Feed' : 'Live Platform Status'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {selectedProject.id === 'stock-day-tracker' ? (
                      /* Stock Day Tracker Mini Preview */
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                            <span className="text-[10px] text-[var(--text-muted)] block">NIFTY 50</span>
                            <span className="text-sm font-bold text-emerald-500">22,480.30</span>
                            <span className="text-[10px] text-emerald-400 block">+1.42% (Today)</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                            <span className="text-[10px] text-[var(--text-muted)] block">SENSEX</span>
                            <span className="text-sm font-bold text-emerald-500">74,119.50</span>
                            <span className="text-[10px] text-emerald-400 block">+1.18% (Today)</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-semibold">Heatmap Sectors</span>
                            <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">Bullish</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                            <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">IT +2.8%</div>
                            <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">BANK +1.4%</div>
                            <div className="p-1.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">AUTO -0.6%</div>
                            <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">ENERGY +1.9%</div>
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                          <div className="flex justify-between">
                            <span>Cache TTL:</span>
                            <span className="font-semibold text-violet-500">60s Redis / Memory</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Views Supported:</span>
                            <span className="font-semibold">Weekly, Monthly & Day-by-Day</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* CivicConnect Mini Preview */
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-semibold">Workflow Progression</span>
                            <span className="text-[10px] text-violet-600 dark:text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">SLA Active</span>
                          </div>
                          <div className="space-y-2 text-xs font-mono">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>1. Citizen Geo-tag Report Filed</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>2. Official Dispatched via RBAC</span>
                            </div>
                            <div className="flex items-center gap-2 text-amber-500">
                              <Activity className="w-3.5 h-3.5 animate-spin" />
                              <span>3. In Progress (Resolution Timeline)</span>
                            </div>
                            <div className="flex items-center gap-2 text-[var(--text-muted)]">
                              <span className="w-3.5 h-3.5 rounded-full border border-current inline-block" />
                              <span>4. Citizen Verification & Rating</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                          <div className="flex justify-between">
                            <span>Auth Protocol:</span>
                            <span className="font-semibold text-violet-500">Stateless JWT + Bcrypt</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Database:</span>
                            <span className="font-semibold">SQLite3 Normalized Schema</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* FULL DESCRIPTION SECTION */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                    <h3 className="text-lg font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <FolderKanban className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      <span>Project Description & Implementation Scope</span>
                    </h3>
                    <button
                      onClick={() => setIsInlineEditing((prev) => !prev)}
                      className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3 h-3" />
                      {isInlineEditing ? 'Cancel Edit' : 'Edit Description'}
                    </button>
                  </div>

                  {isInlineEditing ? (
                    <div className="space-y-3">
                      <textarea
                        rows={6}
                        value={inlineDescription}
                        onChange={(e) => setInlineDescription(e.target.value)}
                        className="lab-input font-sans text-base leading-relaxed"
                        placeholder="Project description..."
                      />
                      <button
                        onClick={handleSaveInline}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </button>
                    </div>
                  ) : (
                    <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  )}
                </div>

                {/* TECHNOLOGIES STACK BADGES */}
                <div className="space-y-4">
                  <h3 className="text-base font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <span>Technologies & Frameworks Employed</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {(selectedProject.technologies || []).map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] hover:border-violet-500/50 transition-colors shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-violet-500" />
                        <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KEY HIGHLIGHTS & CAPABILITIES */}
                {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-base font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      <span>Key Features & Engineering Deliverables</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-start gap-3 hover:border-violet-500/40 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-sm text-[var(--text-primary)] leading-relaxed">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SYSTEM ARCHITECTURE & SECURITY */}
                {selectedProject.architecture && (
                  <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-stone-50/50 dark:bg-stone-900/40 space-y-2">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-bold flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span>System Architecture & Data Engineering Pipeline</span>
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {selectedProject.architecture}
                    </p>
                  </div>
                )}

                {/* METRICS & AUDIT HIGHLIGHTS */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {selectedProject.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-1"
                      >
                        <span className="block text-[11px] font-mono uppercase text-[var(--text-muted)]">
                          {h.label}
                        </span>
                        <span className="block text-sm sm:text-base font-bold text-violet-600 dark:text-violet-400 font-sans">
                          {h.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </section>
        )}
      </main>

      {/* Edit / Add Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          onSaveProject(data);
          setSelectedId(data.id);
        }}
        initialProject={modalTarget}
        nextProjectNumber={projects.length + 1}
      />
    </div>
  );
}
