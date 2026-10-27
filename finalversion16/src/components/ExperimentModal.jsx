import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputViewer from './OutputViewer';
import { executePythonCode } from '../services/pythonExecutionService';
import { X, Save, Plus, Terminal, AlertCircle, Trash2 } from 'lucide-react';

export default function ExperimentModal({ isOpen, onClose, onSave, initialExperiment = null }) {
  const isEditing = Boolean(initialExperiment?.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologiesStr, setTechnologiesStr] = useState('Python, Pandas');
  const [code, setCode] = useState('');
  const [outputResult, setOutputResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [subExperiments, setSubExperiments] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    if (initialExperiment) {
      setName(initialExperiment.name || '');
      setDescription(initialExperiment.description || '');
      setTechnologiesStr((initialExperiment.technologies || ['Python', 'Pandas']).join(', '));
      setCode(initialExperiment.code || '');
      setSubExperiments((initialExperiment.subExperiments || []).map((sub) => ({ ...sub, isRunning: false })));
      setOutputResult(initialExperiment.output || initialExperiment.outputImages?.length ? { success: true, stdout: initialExperiment.output || '', stderr: '', error: null, images: initialExperiment.outputImages || [], executionTime: initialExperiment.executionTime || 0 } : null);
    } else {
      setName('');
      setDescription('');
      setTechnologiesStr('Python, Pandas');
      setCode('');
      setOutputResult(null);
      setSubExperiments([]);
    }
    setErrorMsg('');
  }, [initialExperiment, isOpen]);

  if (!isOpen) return null;

  const runMain = async () => {
    if (!code.trim()) return;
    setIsRunning(true); setStatusMessage('Executing Python code...');
    try { setOutputResult(await executePythonCode(code, setStatusMessage)); }
    catch (err) { setOutputResult({ success: false, stdout: '', stderr: '', error: err.message || String(err), images: [] }); }
    finally { setIsRunning(false); setStatusMessage(''); }
  };

  const addSubExperiment = () => setSubExperiments((prev) => [...prev, { id: null, name: '', description: '', code: '', output: '', outputImages: [], technologies: ['Python', 'Pandas'] }]);
  const removeSubExperiment = (index) => setSubExperiments((prev) => prev.filter((_, i) => i !== index));
  const updateSub = (index, patch) => setSubExperiments((prev) => prev.map((s, i) => i === index ? { ...s, ...patch } : s));
  const runSub = async (index) => {
    const sub = subExperiments[index];
    if (!sub.code.trim()) return;
    updateSub(index, { isRunning: true, statusMessage: 'Executing Python code...' });
    try {
      const result = await executePythonCode(sub.code, (msg) => updateSub(index, { statusMessage: msg }));
      updateSub(index, { output: result.stdout || '', outputImages: result.images || [], executionTime: result.executionTime || 0, runResult: result, isRunning: false, statusMessage: '' });
    } catch (err) {
      updateSub(index, { runResult: { success: false, stdout: '', stderr: '', error: err.message || String(err), images: [] }, isRunning: false, statusMessage: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) { setErrorMsg('Please enter the experiment name and description.'); return; }
    const number = initialExperiment?.number;
    const cleanedSubs = subExperiments.map((sub, index) => ({
      ...sub,
      id: `${number || 'NEW'}${String.fromCharCode(65 + index)}`,
      name: sub.name.trim(), description: sub.description.trim(), code: sub.code || '', output: sub.output || '', outputImages: sub.outputImages || [], technologies: sub.technologies || ['Python', 'Pandas']
    }));
    if (cleanedSubs.some((s) => !s.name || !s.description)) { setErrorMsg('Please enter a name and description for every sub-experiment.'); return; }
    onSave({
      id: initialExperiment?.id || Date.now(), number: initialExperiment?.number, name: name.trim(), description: description.trim(), code,
      output: outputResult?.stdout || initialExperiment?.output || '', outputImages: outputResult?.images || initialExperiment?.outputImages || [],
      technologies: technologiesStr.split(',').map((x) => x.trim()).filter(Boolean), date: initialExperiment?.date || '2026', status: 'Published', coverImage: initialExperiment?.coverImage || '', subExperiments: cleanedSubs
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-5xl bg-white dark:bg-[#101014] rounded-2xl border border-stone-200 dark:border-white/10 shadow-2xl overflow-hidden my-6">
        <div className="px-6 py-4 bg-white dark:bg-[#15151b] border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-700 dark:text-violet-300 flex items-center justify-center"><Terminal className="w-5 h-5" /></div><div><h3 className="font-serif font-bold text-xl text-stone-950 dark:text-white">{isEditing ? 'Edit Experiment' : 'Add New Experiment'}</h3><p className="text-xs font-mono text-stone-500">Experiment + sub-experiment editor</p></div></div>
          <button onClick={onClose} className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-white/5"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7 max-h-[82vh] overflow-y-auto">
          {errorMsg && <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-300 text-xs font-mono flex items-center gap-2"><AlertCircle className="w-4 h-4" />{errorMsg}</div>}

          <div><label className="field-label">Experiment Name *</label><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Data Handling using Pandas" className="lab-input" /></div>
          <div><label className="field-label">Experiment Description *</label><textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Explain what this experiment covers." className="lab-input resize-none" /></div>
          <div><label className="field-label">Technologies</label><input value={technologiesStr} onChange={(e) => setTechnologiesStr(e.target.value)} placeholder="Python, Pandas" className="lab-input font-mono" /></div>

          <div className="space-y-3"><div className="flex items-center justify-between"><label className="field-label mb-0">Main Code</label><span className="text-[11px] font-mono text-stone-500">Optional when the experiment is organized into sub-experiments</span></div><CodeEditor code={code} onChange={setCode} onRun={runMain} isRunning={isRunning} />{outputResult && <OutputViewer outputResult={outputResult} isRunning={isRunning} statusMessage={statusMessage} />}</div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between"><div><label className="field-label mb-0">Sub-Experiments</label><p className="text-[11px] text-stone-500 mt-1">Add parts such as 1A, 1B, 1C. Programs can be combined inside each part.</p></div><button type="button" onClick={addSubExperiment} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-violet-600/10 text-violet-800 dark:text-violet-200 border border-violet-500/20 hover:bg-violet-600/20"><Plus className="w-3.5 h-3.5" /> Add Sub-Experiment</button></div>
            {subExperiments.map((sub, index) => { const label = `${initialExperiment?.number || 'NEW'}${String.fromCharCode(65 + index)}`; const result = sub.runResult || ((sub.output || sub.outputImages?.length) ? { success: true, stdout: sub.output || '', stderr: '', error: null, images: sub.outputImages || [], executionTime: sub.executionTime || 0 } : null); return <div key={index} className="rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/[0.025] p-5 space-y-4">
              <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-violet-800 dark:text-violet-200 bg-violet-500/10 px-2.5 py-1 rounded-lg border border-violet-500/20">{label}</span><button type="button" onClick={() => removeSubExperiment(index)} className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400"><Trash2 className="w-3.5 h-3.5" /> Remove</button></div>
              <input required value={sub.name} onChange={(e) => updateSub(index, { name: e.target.value })} placeholder={`Sub-experiment ${label} name`} className="lab-input" />
              <textarea required rows={2} value={sub.description} onChange={(e) => updateSub(index, { description: e.target.value })} placeholder="Description" className="lab-input resize-none" />
              <CodeEditor code={sub.code} onChange={(value) => updateSub(index, { code: value })} onRun={() => runSub(index)} isRunning={Boolean(sub.isRunning)} />
              {result && <OutputViewer outputResult={result} isRunning={Boolean(sub.isRunning)} statusMessage={sub.statusMessage || ''} />}
            </div> })}
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-white/10 flex justify-end gap-3"><button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/5">Cancel</button><button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white"><Save className="w-4 h-4" /> {isEditing ? 'Update Experiment' : 'Save Experiment'}</button></div>
        </form>
      </div>
    </div>
  );
}
