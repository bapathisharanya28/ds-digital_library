import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, FolderKanban, Sparkles } from 'lucide-react';

const SUGGESTED_IMAGES = [
  {
    name: 'Stock & Financial Dashboard',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Market Analytics & Heatmap',
    url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Smart City & Civic Platform',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Modern Web Application',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'
  }
];

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  initialProject = null,
  nextProjectNumber = 3
}) {
  const isEditing = Boolean(initialProject?.id);

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Completed');
  const [technologiesStr, setTechnologiesStr] = useState('');
  const [description, setDescription] = useState('');
  const [keyFeatures, setKeyFeatures] = useState(['']);
  const [architecture, setArchitecture] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    if (initialProject) {
      setTitle(initialProject.title || '');
      setTagline(initialProject.tagline || '');
      setCategory(initialProject.category || 'Full-Stack Development');
      setStatus(initialProject.status || 'Completed');
      setTechnologiesStr((initialProject.technologies || []).join(', '));
      setDescription(initialProject.description || '');
      setKeyFeatures(
        initialProject.keyFeatures && initialProject.keyFeatures.length > 0
          ? initialProject.keyFeatures
          : ['']
      );
      setArchitecture(initialProject.architecture || '');
      setCoverImage(initialProject.coverImage || '');
      setGithubUrl(initialProject.githubUrl || '');
      setLiveDemoUrl(initialProject.liveDemoUrl || '');
    } else {
      setTitle('');
      setTagline('');
      setCategory('Full-Stack Web Application');
      setStatus('Completed');
      setTechnologiesStr('React.js, Node.js, Express.js, JavaScript');
      setDescription('');
      setKeyFeatures(['']);
      setArchitecture('');
      setCoverImage(SUGGESTED_IMAGES[0].url);
      setGithubUrl('https://github.com/bapathisharanya28');
      setLiveDemoUrl('https://github.com/bapathisharanya28');
    }
    setErrorMsg('');
  }, [initialProject, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    setKeyFeatures((prev) => [...prev, '']);
  };

  const handleFeatureChange = (index, val) => {
    setKeyFeatures((prev) => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const handleRemoveFeature = (index) => {
    if (keyFeatures.length <= 1) {
      setKeyFeatures(['']);
      return;
    }
    setKeyFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Project title is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Project description is required.');
      return;
    }

    const techArray = technologiesStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const filteredFeatures = keyFeatures.map((f) => f.trim()).filter(Boolean);

    const projectData = {
      id: initialProject?.id || `project-${Date.now()}`,
      number: initialProject?.number || nextProjectNumber,
      title: title.trim(),
      tagline: tagline.trim() || 'Software Engineering Project',
      category: category.trim() || 'Full-Stack',
      status: status.trim() || 'Completed',
      date: initialProject?.date || '2026',
      coverImage: coverImage.trim() || SUGGESTED_IMAGES[0].url,
      technologies: techArray.length ? techArray : ['JavaScript', 'Web Development'],
      description: description.trim(),
      keyFeatures: filteredFeatures.length ? filteredFeatures : [description.trim()],
      architecture: architecture.trim(),
      githubUrl: githubUrl.trim(),
      liveDemoUrl: liveDemoUrl.trim(),
      highlights: initialProject?.highlights || [
        { label: 'Status', value: status },
        { label: 'Category', value: category || 'Web Engineering' },
        { label: 'Year', value: '2026' },
        { label: 'Architecture', value: 'Modular Full-Stack' }
      ]
    };

    onSave(projectData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl my-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-violet-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[var(--text-primary)]">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                {isEditing ? `Modifying: ${initialProject?.title}` : 'Showcase your engineering implementation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-stone-500/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Project Title */}
          <div>
            <label className="field-label">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Stock Day Tracker"
              className="lab-input font-medium"
              required
            />
          </div>

          {/* Tagline / Subtitle & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Subtitle / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. NSE/BSE Market Intelligence & Analytics"
                className="lab-input"
              />
            </div>
            <div>
              <label className="field-label">Category / Domain</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. FinTech & Analytics, GovTech"
                className="lab-input"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="field-label">Technologies (comma-separated) *</label>
            <input
              type="text"
              value={technologiesStr}
              onChange={(e) => setTechnologiesStr(e.target.value)}
              placeholder="e.g. React.js, JavaScript, Node.js, Express.js, Vite, Market Data APIs"
              className="lab-input"
              required
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {technologiesStr.split(',').filter((t) => t.trim()).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="field-label">Detailed Project Description *</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write the full description of what the project does, key architectures, and mechanisms implemented..."
              className="lab-input leading-relaxed"
              required
            />
          </div>

          {/* Key Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="field-label mb-0">Key Features & Highlights</label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature Bullet
              </button>
            </div>
            <div className="space-y-2.5">
              {keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-violet-500 font-bold w-5">{idx + 1}.</span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Feature #${idx + 1}`}
                    className="lab-input flex-1 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                    title="Remove bullet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture */}
          <div>
            <label className="field-label">System Architecture & Technical Notes</label>
            <textarea
              rows={3}
              value={architecture}
              onChange={(e) => setArchitecture(e.target.value)}
              placeholder="Describe backend architecture, database schemas, caching, authentication flows, etc."
              className="lab-input leading-relaxed"
            />
          </div>

          {/* Cover Image & Presets */}
          <div>
            <label className="field-label">Cover Image URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="lab-input flex-1"
              />
            </div>
            
            <div className="mt-2.5">
              <span className="text-[11px] text-[var(--text-muted)] font-mono block mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Or pick a recommended aesthetic image:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SUGGESTED_IMAGES.map((img, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCoverImage(img.url)}
                    className={`relative rounded-xl overflow-hidden border text-left p-1 group transition-all ${
                      coverImage === img.url
                        ? 'border-violet-500 ring-2 ring-violet-500/30'
                        : 'border-[var(--border-subtle)] hover:border-violet-500/40'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-14 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <span className="block text-[10px] font-sans truncate mt-1 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                      {img.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* URLs & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="field-label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="lab-input"
              >
                <option value="Completed">Completed</option>
                <option value="In Production">In Production</option>
                <option value="Active Deployment">Active Deployment</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div>
              <label className="field-label">GitHub Repository URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="lab-input"
              />
            </div>
            <div>
              <label className="field-label">Live Demo / Preview URL</label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://..."
                className="lab-input"
              />
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-3 bg-violet-500/5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-sm font-semibold text-[var(--text-primary)] hover:bg-stone-500/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-md shadow-violet-600/20 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>Save Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}
