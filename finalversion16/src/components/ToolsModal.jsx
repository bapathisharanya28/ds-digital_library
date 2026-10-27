import React, { useEffect, useState } from 'react';
import { Wrench, X, Save } from 'lucide-react';

export default function ToolsModal({ isOpen, onClose, value, onSave }) {
  const [text, setText] = useState(value || '');

  useEffect(() => {
    if (isOpen) {
      setText(value || '');
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, value]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(text.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] bg-[var(--bg-page)] overflow-y-auto">
      <div className="min-h-screen w-full flex flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Wrench className="w-6 h-6 text-violet-600 dark:text-violet-300" />
            <div>
              <h2 className="font-serif font-bold text-xl text-[var(--text-primary)]">Data Science Tools</h2>
              <p className="text-xs text-[var(--text-primary)] opacity-70">Tools and technologies used in the Data Science laboratory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Close Data Science Tools"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 w-full px-6 md:px-12 lg:px-20 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <p className="text-sm leading-6 text-[var(--text-primary)] opacity-80">
                Edit the description below. The full-page editor is designed for longer 3–4 page descriptions.
              </p>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[70vh] md:min-h-[76vh] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-6 md:px-8 md:py-8 text-base md:text-lg leading-8 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y shadow-sm"
              placeholder="Enter the 3–4 page description of Data Science tools..."
              autoFocus
            />
          </div>
        </main>

        <footer className="sticky bottom-0 z-10 flex flex-wrap justify-end gap-3 px-6 md:px-10 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-page)]/95 backdrop-blur-md">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </footer>
      </div>
    </div>
  );
}
