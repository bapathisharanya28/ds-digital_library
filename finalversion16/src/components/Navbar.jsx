import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Home, Wrench, FolderKanban } from 'lucide-react';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onNavigate, 
  currentView,
  backendHealth,
  onToolsClick,
  onProjectsClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home', hash: '#hero', icon: Home },
    { label: 'Modules', view: 'home', hash: '#modules' },
    { label: 'Experiments', view: 'home', hash: '#experiments' },
    { label: 'About', view: 'home', hash: '#about' },
  ];

  const handleLinkClick = (link) => {
    onNavigate(link.view, null);
    setMobileMenuOpen(false);
    if (link.hash) {
      setTimeout(() => {
        const el = document.querySelector(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(12, 8, 23, 0.88)' : 'rgba(250, 247, 242, 0.88)',
        borderColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LEFT: [ DS ] DS LAB / Data Science Laboratory */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-md shadow-violet-600/20 group-hover:scale-105 transition-transform duration-200 border border-violet-400/30">
            <span className="font-serif font-black text-amber-50 text-base tracking-wider">    </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 hidden sm:inline-block">
                Academic 2026
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-sans tracking-wide">
              Data Science Laboratory
            </p>
          </div>
        </button>

        {/* RIGHT (Desktop) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-7">
          <nav className="flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${
                  currentView === link.view
                    ? 'text-stone-900 dark:text-stone-100'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label !== 'Home' && link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToolsClick}
              title="Data Science Tools"
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                currentView === 'tools'
                  ? 'text-violet-600 dark:text-violet-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-violet-600 dark:hover:text-violet-400'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Tools</span>
            </button>

            <button
              onClick={onProjectsClick}
              title="Featured Engineering Projects"
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors px-2.5 py-1 rounded-lg ${
                currentView === 'projects'
                  ? 'text-violet-600 dark:text-violet-300 font-semibold bg-violet-500/15 border border-violet-500/30'
                  : 'text-stone-600 dark:text-stone-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects</span>
            </button>
          </div>

          <div className="h-5 w-px bg-stone-300 dark:bg-stone-800" />

          {/* Backend Status Pill */}
          <div 
            title={backendHealth?.online ? `Python ${backendHealth.pythonVersion} Backend Active` : "In-Browser Pyodide Active"}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border transition-colors bg-stone-100 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800"
          >
            <span className={`w-2 h-2 rounded-full ${backendHealth?.online ? 'bg-emerald-500' : 'bg-violet-400'}`} />
          
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2.5 rounded-xl border border-stone-200 dark:border-violet-900/50 hover:bg-stone-100 dark:hover:bg-violet-950/40 text-stone-700 dark:text-stone-200 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-300 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-violet-700 transition-transform hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-violet-700" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-stone-50/95 dark:bg-[#130d24]/95 backdrop-blur-lg px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link)}
              className="block w-full text-left py-2 text-base font-medium text-stone-800 dark:text-stone-200 hover:text-violet-600"
            >
              {link.label === 'Home' ? <Home className="w-5 h-5" /> : link.label}
            </button>
          ))}
          <button
            onClick={() => { onToolsClick(); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full text-left py-2 text-base font-medium ${
              currentView === 'tools' ? 'text-violet-600 dark:text-violet-400 font-semibold' : 'text-stone-800 dark:text-stone-200 hover:text-violet-600'
            }`}
          >
            <Wrench className="w-5 h-5" /> Tools
          </button>
          <button
            onClick={() => { onProjectsClick(); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full text-left py-2 text-base font-medium ${
              currentView === 'projects' ? 'text-violet-600 dark:text-violet-400 font-semibold' : 'text-stone-800 dark:text-stone-200 hover:text-violet-600'
            }`}
          >
            <FolderKanban className="w-5 h-5" /> Projects
          </button>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-stone-500">
            <span>Execution Runtime:</span>
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              {backendHealth?.online ? 'Python 3.11 Native' : 'Pyodide WASM'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
