import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputViewer from './OutputViewer';
import { executePythonCode } from '../services/pythonExecutionService';
import {
  ArrowLeft,
  Save,
  Calendar,
  Terminal,
  Check,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export default function ExperimentDetails({
  experiment,
  initialSubExperimentId = null,
  onBack,
  onSaveExperiment,
}) {
  const [selectedSubId, setSelectedSubId] = useState(
    initialSubExperimentId
  );

  const [tryCodes, setTryCodes] = useState({});
  const [originalResults, setOriginalResults] = useState({});
  const [originalRunning, setOriginalRunning] = useState({});
  const [originalStatus, setOriginalStatus] = useState({});
  const [tryResults, setTryResults] = useState({});
  const [subRunning, setSubRunning] = useState({});
  const [subStatus, setSubStatus] = useState({});
  const [hasSavedChanges, setHasSavedChanges] = useState(false);

  useEffect(() => {
    setSelectedSubId(initialSubExperimentId || null);

    const codes = {};

    (experiment?.subExperiments || []).forEach((sub) => {
      codes[sub.id] = '';
    });

    setTryCodes(codes);
    setOriginalResults({});
    setOriginalRunning({});
    setOriginalStatus({});
    setTryResults({});
    setSubRunning({});
    setSubStatus({});
    setHasSavedChanges(false);
  }, [experiment?.id, initialSubExperimentId]);

  if (!experiment) {
    return null;
  }

  const formattedNum = String(
    experiment.number || experiment.id
  ).padStart(2, '0');

  const selectedSub =
    (experiment.subExperiments || []).find(
      (sub) => sub.id === selectedSubId
    ) || null;

  const getStartingCode = (sub) =>
    typeof tryCodes[sub.id] === 'string'
      ? tryCodes[sub.id]
      : '';

  // Run the original experiment code
  const runOriginalExperiment = async (sub) => {
    const code = sub.code || '';

    if (!code.trim()) {
      setOriginalResults((previous) => ({
        ...previous,
        [sub.id]: {
          success: false,
          stdout: '',
          stderr: '',
          error:
            'No original code is available for this sub-experiment.',
          images: [],
        },
      }));

      return;
    }

    setOriginalRunning((previous) => ({
      ...previous,
      [sub.id]: true,
    }));

    setOriginalStatus((previous) => ({
      ...previous,
      [sub.id]: 'Running original experiment...',
    }));

    try {
      const result = await executePythonCode(code, (message) => {
        setOriginalStatus((previous) => ({
          ...previous,
          [sub.id]: message,
        }));
      });

      setOriginalResults((previous) => ({
        ...previous,
        [sub.id]: result,
      }));
    } catch (err) {
      setOriginalResults((previous) => ({
        ...previous,
        [sub.id]: {
          success: false,
          stdout: '',
          stderr: '',
          error: `Execution error: ${
            err.message || String(err)
          }`,
          images: [],
        },
      }));
    } finally {
      setOriginalRunning((previous) => ({
        ...previous,
        [sub.id]: false,
      }));

      setOriginalStatus((previous) => ({
        ...previous,
        [sub.id]: '',
      }));
    }
  };

  // Run the user's practice code
  const runSubExperiment = async (sub) => {
    const code = getStartingCode(sub);

    if (!code.trim()) {
      setTryResults((previous) => ({
        ...previous,
        [sub.id]: {
          success: false,
          stdout: '',
          stderr: '',
          error:
            'Please enter some Python code in Try Yourself before running.',
          images: [],
        },
      }));

      return;
    }

    setSubRunning((previous) => ({
      ...previous,
      [sub.id]: true,
    }));

    setSubStatus((previous) => ({
      ...previous,
      [sub.id]: 'Executing Python code...',
    }));

    try {
      const result = await executePythonCode(code, (message) => {
        setSubStatus((previous) => ({
          ...previous,
          [sub.id]: message,
        }));
      });

      setTryResults((previous) => ({
        ...previous,
        [sub.id]: result,
      }));
    } catch (err) {
      setTryResults((previous) => ({
        ...previous,
        [sub.id]: {
          success: false,
          stdout: '',
          stderr: '',
          error: `Execution error: ${
            err.message || String(err)
          }`,
          images: [],
        },
      }));
    } finally {
      setSubRunning((previous) => ({
        ...previous,
        [sub.id]: false,
      }));

      setSubStatus((previous) => ({
        ...previous,
        [sub.id]: '',
      }));
    }
  };

  // Save the practice code
  const saveTryCode = () => {
    if (!selectedSub) {
      return;
    }

    const updatedSubs = (
      experiment.subExperiments || []
    ).map((item) =>
      item.id === selectedSub.id
        ? {
            ...item,
            tryCode:
              tryCodes[selectedSub.id] ??
              item.tryCode ??
              item.code ??
              '',
          }
        : item
    );

    onSaveExperiment?.({
      ...experiment,
      subExperiments: updatedSubs,
    });

    setHasSavedChanges(true);

    setTimeout(() => {
      setHasSavedChanges(false);
    }, 1800);
  };

  // Load the saved original output when available
  const storedOriginalResult = selectedSub
    ? (
        selectedSub.output ||
        selectedSub.outputImages?.length
      )
      ? {
          success: true,
          stdout: selectedSub.output || '',
          stderr: '',
          error: null,
          images: selectedSub.outputImages || [],
          executionTime: selectedSub.executionTime || 0,
        }
      : null
    : null;

  const originalResult = selectedSub
    ? originalResults[selectedSub.id] ||
      storedOriginalResult
    : null;

  const tryResult = selectedSub
    ? tryResults[selectedSub.id] || null
    : null;

  return (
    <div className="py-10 sm:py-16 animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-white/10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-violet-700 dark:hover:text-violet-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Experiments
          </button>

          {/* Only the Save Try Code button remains */}
          <button
            onClick={saveTryCode}
            disabled={!selectedSub}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white"
          >
            {hasSavedChanges ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}

            <span>
              {hasSavedChanges ? 'Saved!' : 'Save Try Code'}
            </span>
          </button>
        </div>

        {/* Experiment information */}
        <header className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8 items-stretch">
          <div className="space-y-4">
            <span className="inline-flex font-mono text-xs uppercase font-bold text-violet-800 dark:text-violet-200 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
              EXPERIMENT {formattedNum}
            </span>

            <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-stone-950 dark:text-white tracking-tight leading-tight">
              {experiment.name}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-3xl leading-relaxed">
              {experiment.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {(experiment.technologies || []).map(
                (tech, index) => (
                  <span
                    key={index}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                  >
                    {tech}
                  </span>
                )
              )}

              {experiment.date && (
                <span className="text-xs font-mono text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {experiment.date}
                </span>
              )}
            </div>
          </div>

          {experiment.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 min-h-[210px]">
              <img
                src={experiment.coverImage}
                alt={`${experiment.name} cover`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Sub-experiments list */}
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                SUB-EXPERIMENTS
              </h2>

              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Select a part to open its description, code, and output.
              </p>
            </div>

            <span className="text-xs font-mono text-stone-500">
              {experiment.subExperiments?.length || 0} parts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(experiment.subExperiments || []).map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubId(sub.id)}
                className={`text-left p-5 rounded-2xl border transition-all ${
                  selectedSubId === sub.id
                    ? 'border-violet-500 bg-violet-500/10 shadow-md'
                    : 'border-stone-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-violet-400/60'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-violet-800 dark:text-violet-200 bg-violet-500/10 px-2.5 py-1 rounded-lg">
                    {sub.id}
                  </span>

                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>

                <h3 className="font-serif font-bold text-xl text-stone-950 dark:text-white mt-3">
                  {sub.name}
                </h3>

                <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 line-clamp-2">
                  {sub.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Experiment overview */}
        {!selectedSub && (
          <section className="p-6 sm:p-8 rounded-2xl card-academic space-y-6">
            <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
              <BookOpen className="w-5 h-5" />

              <span className="text-xs font-mono uppercase tracking-widest font-bold">
                EXPERIMENT OVERVIEW
              </span>
            </div>

            <div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-950 dark:text-white">
                What this experiment covers
              </h2>

              <p className="mt-2 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {experiment.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400 font-bold">
                SUB-EXPERIMENTS
              </h3>

              <div className="space-y-2">
                {(experiment.subExperiments || []).map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubId(sub.id)}
                    className="w-full text-left p-4 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-violet-400/70 hover:bg-violet-500/5 transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-violet-800 dark:text-violet-200 bg-violet-500/10 px-2 py-1 rounded">
                          {sub.id}
                        </span>

                        <span className="font-semibold text-stone-900 dark:text-white">
                          {sub.name}
                        </span>
                      </div>

                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        {sub.description}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-stone-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Selected sub-experiment */}
        {selectedSub && (
          <section className="space-y-5 pt-2">
            <button
              onClick={() => setSelectedSubId(null)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-violet-700 dark:hover:text-violet-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Experiment Overview
            </button>

            <div className="p-6 sm:p-8 rounded-2xl card-academic space-y-5">
              {/* Sub-experiment details */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-violet-800 dark:text-violet-200 bg-violet-500/10 px-3 py-1 rounded-full">
                    {selectedSub.id}
                  </span>

                  <span className="text-xs font-mono text-stone-500 uppercase">
                    SUB-EXPERIMENT
                  </span>
                </div>

                <h2 className="font-serif font-black text-3xl text-stone-950 dark:text-white mt-3">
                  {selectedSub.name}
                </h2>

                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  {selectedSub.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {(selectedSub.technologies || []).map(
                  (tech, index) => (
                    <span
                      key={index}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              {/* Original code */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-stone-700 dark:text-stone-300 font-bold">
                    ORIGINAL CODE
                  </h3>

                  <span className="text-[11px] font-mono text-stone-500">
                    Read only
                  </span>
                </div>

                <CodeEditor
                  code={selectedSub.code || ''}
                  readOnly
                  onRun={() => runOriginalExperiment(selectedSub)}
                  isRunning={Boolean(
                    originalRunning[selectedSub.id]
                  )}
                  language="Original Python Code"
                />

                {/* Original output */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-stone-700 dark:text-stone-300 font-bold">
                      ORIGINAL OUTPUT
                    </h3>

                    <span className="text-[11px] font-mono text-stone-500">
                      {originalStatus[selectedSub.id] ||
                        (originalResult
                          ? 'Saved/last result'
                          : 'Run the original code above')}
                    </span>
                  </div>

                  <OutputViewer
                    outputResult={originalResult}
                    isRunning={Boolean(
                      originalRunning[selectedSub.id]
                    )}
                    statusMessage={
                      originalStatus[selectedSub.id] || ''
                    }
                  />
                </div>
              </div>

              {/* Try Yourself information */}
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15">
                <p className="text-xs font-mono text-violet-700 dark:text-violet-300 font-bold">
                  TRY YOURSELF
                </p>

                <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                  This is a separate practice editor. Your changes
                  and output will not replace the original experiment
                  code or output.
                </p>
              </div>

              {/* Practice compiler */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold">
                    TRY YOURSELF — PYTHON COMPILER
                  </h3>

                  <span className="text-[11px] font-mono text-stone-500">
                    Python 3.11
                  </span>
                </div>

                <CodeEditor
                  code={getStartingCode(selectedSub)}
                  onChange={(value) =>
                    setTryCodes((previous) => ({
                      ...previous,
                      [selectedSub.id]: value,
                    }))
                  }
                  onRun={() => runSubExperiment(selectedSub)}
                  isRunning={Boolean(
                    subRunning[selectedSub.id]
                  )}
                  onReset={() =>
                    setTryCodes((previous) => ({
                      ...previous,
                      [selectedSub.id]: '',
                    }))
                  }
                />
              </div>

              {/* Practice output */}
              {tryResult && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300 font-bold">
                      YOUR OUTPUT
                    </h3>

                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-300">
                      Generated from Try Yourself
                    </span>
                  </div>

                  <OutputViewer
                    outputResult={tryResult}
                    isRunning={Boolean(
                      subRunning[selectedSub.id]
                    )}
                    statusMessage={
                      subStatus[selectedSub.id] || ''
                    }
                  />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}