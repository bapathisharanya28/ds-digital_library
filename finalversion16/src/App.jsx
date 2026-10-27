import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModuleSection from './components/ModuleSection';
import ModuleOverview from './components/ModuleOverview';
import ExperimentSection from './components/ExperimentSection';
import ExperimentDetails from './components/ExperimentDetails';
import StudentProfileModal from './components/StudentProfileModal';
import ExperimentModal from './components/ExperimentModal';
import ModuleModal from './components/ModuleModal';
import ConfirmationModal from './components/ConfirmationModal';
import ToolsPage from './components/ToolsPage';
import ProjectsPage from './components/ProjectsPage';
import PortfolioPage from './components/PortfolioPage';
import Footer from './components/Footer';

import { loadStoredData, saveStoredData, INITIAL_PROJECTS } from './data/initialData';
import { checkBackendHealth, loadRemoteState, saveRemoteState } from './services/pythonExecutionService';

export default function App() {
  // Load persistent state from localStorage
  const initial = loadStoredData();

  const [theme, setTheme] = useState(initial.theme || 'dark');
  const [student, setStudent] = useState(initial.profile);
  const [modules, setModules] = useState(initial.modules);
  const [experiments, setExperiments] = useState(initial.experiments);
  const [projects, setProjects] = useState(initial.projects || INITIAL_PROJECTS);
  const [toolsDescription, setToolsDescription] = useState(() => localStorage.getItem('ds_lab_tools_description') || '');
  const [remoteStateReady, setRemoteStateReady] = useState(false);

  // Navigation State: 'home' | 'module-overview' | 'experiment-details' | 'tools' | 'projects'
  const [currentView, setCurrentView] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedSubExperimentId, setSelectedSubExperimentId] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Backend Health State
  const [backendHealth, setBackendHealth] = useState(null);

  // Modals State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);
  const [experimentModalTarget, setExperimentModalTarget] = useState(null); // null = new, object = edit

  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [moduleModalTarget, setModuleModalTarget] = useState(null); // null = new, object = edit

  const [deleteConfirmState, setDeleteConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    warning: null,
    onConfirm: () => {},
  });

  // Apply Theme to DOM root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveStoredData({ theme });
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ds_lab_tools_description', toolsDescription);
  }, [toolsDescription]);

  // Use the local server as the source of truth when it is available. localStorage
  // remains the offline fallback so the app is still usable without the server.
  useEffect(() => {
    let cancelled = false;

    loadRemoteState()
      .then((savedState) => {
        if (cancelled || !savedState) return;
        if (savedState.profile) setStudent(savedState.profile);
        if (savedState.modules) setModules(savedState.modules);
        if (savedState.experiments) setExperiments(savedState.experiments);
        if (savedState.projects) setProjects(savedState.projects);
        if (savedState.theme) setTheme(savedState.theme);
        if (typeof savedState.toolsDescription === 'string') {
          setToolsDescription(savedState.toolsDescription);
        }
      })
      .catch(() => {
        // The app intentionally continues with localStorage when the optional
        // persistence server is not running.
      })
      .finally(() => {
        if (!cancelled) setRemoteStateReady(true);
      });

    return () => { cancelled = true; };
  }, []);

  // Persist Data Changes
  useEffect(() => {
    saveStoredData({ student, modules, experiments, projects });
    if (!remoteStateReady) return;

    saveRemoteState({
      profile: student,
      modules,
      experiments,
      projects,
      theme,
      toolsDescription,
    }).catch((error) => {
      console.warn('Website changes could not be written to the project state file:', error);
    });
  }, [student, modules, experiments, projects, theme, toolsDescription, remoteStateReady]);

  // Verify Backend Health on Mount
  useEffect(() => {
    const checkServer = async () => {
      const health = await checkBackendHealth();
      setBackendHealth((previous) => {
        if (
          previous?.online === health.online &&
          previous?.pythonVersion === health.pythonVersion &&
          previous?.engine === health.engine
        ) {
          return previous;
        }
        return health;
      });
    };
    checkServer();
    const interval = setInterval(checkServer, 10000);
    return () => clearInterval(interval);
  }, []);

  // Theme Toggle
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Navigation Handlers
  const handleNavigate = (view, target = null, subId = null) => {
    setCurrentView(view);
    if (view === 'module-overview' && target) {
      setSelectedModule(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'experiment-details' && target) {
      setSelectedExperiment(target);
      setSelectedSubExperimentId(subId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'home') {
      setSelectedSubExperimentId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'projects') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Project Handlers
  const handleSaveProject = (projData) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === projData.id);
      return exists
        ? prev.map((p) => (p.id === projData.id ? { ...p, ...projData } : p))
        : [...prev, projData];
    });
  };

  const handleDeleteProject = (projToDelete) => {
    setDeleteConfirmState({
      isOpen: true,
      title: `Delete Project?`,
      message: `Are you sure you want to delete "${projToDelete.title}"? This action cannot be undone.`,
      warning: null,
      onConfirm: () => {
        setProjects((prev) => prev.filter((p) => p.id !== projToDelete.id));
      },
    });
  };

  // Module Handlers
  const handleSaveModule = (moduleData) => {
    if (moduleModalTarget) {
      // Edit
      setModules((prev) =>
        prev.map((m) => (m.id === moduleData.id ? { ...m, ...moduleData } : m))
      );
      if (selectedModule?.id === moduleData.id) {
        setSelectedModule({ ...selectedModule, ...moduleData });
      }
    } else {
      // Add
      setModules((prev) => [...prev, moduleData]);
    }
  };

  const handleDeleteModule = (moduleToDelete) => {
    setDeleteConfirmState({
      isOpen: true,
      title: `Delete Module ${moduleToDelete.number || moduleToDelete.id}?`,
      message: `Are you sure you want to delete "${moduleToDelete.title}"? This action cannot be undone.`,
      warning: null,
      onConfirm: () => {
        setModules((prev) => prev.filter((m) => m.id !== moduleToDelete.id));
        if (selectedModule?.id === moduleToDelete.id) handleNavigate('home');
      },
    });
  };

  // Experiment Handlers
  const handleSaveExperiment = (expData) => {
    setExperiments((prev) => {
      const exists = prev.some((e) => e.id === expData.id);
      const assignedNumber = exists
        ? (prev.find((e) => e.id === expData.id)?.number || expData.number)
        : prev.reduce((acc, curr) => Math.max(acc, curr.number || 0), 0) + 1;
      const savedExperiment = {
        ...expData,
        number: assignedNumber,
        subExperiments: (expData.subExperiments || []).map((sub, index) => ({
          ...sub,
          id: `${assignedNumber}${String.fromCharCode(65 + index)}`
        }))
      };
      return exists ? prev.map((e) => (e.id === expData.id ? savedExperiment : e)) : [...prev, savedExperiment];
    });
    setSelectedExperiment((prev) => prev?.id === expData.id ? { ...prev, ...expData } : prev);
  };

  const handleDeleteExperiment = (expToDelete) => {
    setDeleteConfirmState({
      isOpen: true,
      title: `Delete Experiment?`,
      message: `Are you sure you want to delete "${expToDelete.name}"? This action cannot be undone.`,
      warning: null,
      onConfirm: () => {
        setExperiments((prev) => prev.filter((e) => e.id !== expToDelete.id));
        if (selectedExperiment?.id === expToDelete.id) {
          handleNavigate('home');
        }
      },
    });
  };

  const handleQuickRun = (experiment) => {
    setSelectedExperiment(experiment);
    setSelectedSubExperimentId(experiment.subExperiments?.[0]?.id || null);
    setCurrentView('experiment-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      
      {/* Sticky Academic Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onNavigate={handleNavigate}
        currentView={currentView}
        backendHealth={backendHealth}
        onToolsClick={() => { setCurrentView('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onProjectsClick={() => { setCurrentView('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Editorial Hero Section with Experiments count & Student Profile */}
            <Hero
              student={student}
              onViewPortfolio={() => handleNavigate('portfolio')}
              onEditProfile={() => setIsProfileModalOpen(true)}
              totalExperiments={experiments.length}
              totalModules={modules.length}
              totalProjects={projects.length}
              onNavigateToExperiments={() => {
                const el = document.getElementById('experiments');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToProjects={() => handleNavigate('projects')}
            />

            {/* Data Science Modules Curriculum Section */}
            <ModuleSection
              modules={modules}
              onSelectModule={(mod) => handleNavigate('module-overview', mod)}
              onAddModule={() => {
                setModuleModalTarget(null);
                setIsModuleModalOpen(true);
              }}
              onOpenFlipbook={(mod, idx) => {
                setSelectedModule(mod);
                setCurrentView('module-overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Published Experiments Section (Vertically Stacked) */}
            <ExperimentSection
              experiments={experiments}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              onSelectExperiment={(exp) => handleNavigate('experiment-details', exp, null)}
              onSelectSubExperiment={(exp, subId) => handleNavigate('experiment-details', exp, subId)}
              onQuickRun={handleQuickRun}
              onAddExperiment={() => {
                setExperimentModalTarget(null);
                setIsExperimentModalOpen(true);
              }}
              onEditExperiment={(exp) => {
                setExperimentModalTarget(exp);
                setIsExperimentModalOpen(true);
              }}
              onDeleteExperiment={handleDeleteExperiment}
            />
          </>
        )}

        {currentView === 'tools' && (
          <ToolsPage onBack={() => handleNavigate('home')} />
        )}

        {currentView === 'portfolio' && (
          <PortfolioPage student={student} onBack={() => handleNavigate('home')} />
        )}

        {currentView === 'projects' && (
          <ProjectsPage
            projects={projects}
            onBack={() => handleNavigate('home')}
            onSaveProject={handleSaveProject}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {currentView === 'module-overview' && selectedModule && (
          <ModuleOverview
            module={selectedModule}
            allModules={modules}
            onBackToModules={() => handleNavigate('home')}
            onNavigateModule={(mod) => {
              setSelectedModule(mod);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEditModule={(mod) => {
              setModuleModalTarget(mod);
              setIsModuleModalOpen(true);
            }}
            onDeleteModule={handleDeleteModule}
          />
        )}

        {currentView === 'experiment-details' && selectedExperiment && (
          <ExperimentDetails
            experiment={selectedExperiment}
            onBack={() => handleNavigate('home')}
            initialSubExperimentId={selectedSubExperimentId}
            onSaveExperiment={handleSaveExperiment}
            onEditExperiment={(exp) => {
              setExperimentModalTarget(exp);
              setIsExperimentModalOpen(true);
            }}
            onDeleteExperiment={handleDeleteExperiment}
          />
        )}
      </main>

      {/* Academic Footer */}
      <Footer student={student} />

      {/* --- MODALS --- */}
      
      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        student={student}
        onSave={(updatedStudent) => setStudent(updatedStudent)}
      />

      {/* Add / Edit Experiment Modal */}
      <ExperimentModal
        isOpen={isExperimentModalOpen}
        onClose={() => setIsExperimentModalOpen(false)}
        onSave={handleSaveExperiment}
        initialExperiment={experimentModalTarget}
      />

      {/* Add / Edit Module Modal */}
      <ModuleModal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        onSave={handleSaveModule}
        initialModule={moduleModalTarget}
        nextModuleNumber={modules.length + 1}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmState.isOpen}
        onClose={() => setDeleteConfirmState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={deleteConfirmState.onConfirm}
        title={deleteConfirmState.title}
        message={deleteConfirmState.message}
        warning={deleteConfirmState.warning}
      />

    </div>
  );
}
