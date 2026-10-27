import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';

export default function StudentProfileModal({ isOpen, onClose, student, onSave }) {
  const [formData, setFormData] = useState(student || {});

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData((prev) => ({ ...prev, resume: { name: file.name, dataUrl: reader.result } }));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-stone-50 dark:bg-[#150e28] rounded-2xl border border-stone-200 dark:border-violet-900/40 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Edit Student Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Student Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Roll / ID Number</label>
              <input
                type="text"
                name="rollNo"
                required
                value={formData.rollNo || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Semester / Year</label>
              <input
                type="text"
                name="semester"
                value={formData.semester || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-mono uppercase text-stone-500 mb-1">Branch</label><input type="text" name="branch" value={formData.branch || ''} onChange={handleChange} placeholder="CSE (DS)" className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm" /></div>
            <div><label className="block text-xs font-mono uppercase text-stone-500 mb-1">Section</label><input type="text" name="section" value={formData.section || ''} onChange={handleChange} placeholder="A" className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm" /></div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Course / Degree</label>
            <input
              type="text"
              name="course"
              required
              value={formData.course || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Laboratory Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">University / Institute</label>
            <input
              type="text"
              name="university"
              required
              value={formData.university || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Faculty Advisor / Instructor</label>
            <input
              type="text"
              name="faculty"
              required
              value={formData.faculty || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Avatar / Photo URL</label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-500 mb-1">Resume (PDF)</label>
            <div className="flex items-center gap-2"><label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1233] text-stone-700 dark:text-stone-200 text-xs cursor-pointer"><span>Choose PDF</span><input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" /></label>{formData.resume?.name && <span className="text-xs text-stone-500 truncate">{formData.resume.name}</span>}</div>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/30 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
