import React from 'react';
import { Edit3, FileText } from 'lucide-react';
import mbuLogo from '../assets/mbu-logo.png';

function LinkedInIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function GitHubIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7.688.214.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function StudentProfile({ student, onEditProfile, onViewPortfolio }) {
  if (!student) return null;

  const rollNumber = student.rollNo || '24102A030008';
  const branchName = student.branch || 'CSE (DS)';
  const sectionName = student.section || 'DS-1';
  const facultyName = student.faculty || 'S.BosuBabu';
  const courseName = student.course || 'Bachelore-CSEDS';
  const yearAdmission = student.batch || '2024-2025';

  return (
    <div className="w-[330px] sm:w-[350px] max-w-[calc(100vw-2rem)] select-none">
      {/* Official Physical Card Container with Cardboard Corner Radii & Realistic Shadow */}
      <div className="relative rounded-[22px] overflow-hidden bg-white text-stone-900 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.15)] border-2 border-stone-200/90 dark:border-stone-700">
        
        {/* Top Header Background with Golden-Yellow Banner & Red Diagonal Cut Accent */}
        <div className="relative bg-gradient-to-r from-[#fcb900] via-[#fcb900] to-[#f5a623] h-[78px] px-3.5 py-2 flex items-center justify-between overflow-hidden border-b border-[#e5a000]">
          {/* Red Corner Badge like real card */}
          <div className="absolute top-0 right-0 w-24 h-10 bg-[#c8102e] transform skew-x-[-35deg] translate-x-6 -translate-y-2 shadow-sm" />

          {/* Authentic College Logo and Typography */}
          <div className="flex items-center gap-2 z-10">
            <img
              src={mbuLogo}
              alt="MBU Mohan Babu University Logo"
              className="h-12 w-auto object-contain filter drop-shadow-sm"
              onError={(e) => {
                // Fallback elegant text if image fails
                e.target.style.display = 'none';
              }}
            />
            <div className="leading-tight">
              <span className="block font-serif font-black text-2xl tracking-tighter text-[#c8102e]">
                MBU
              </span>
              <span className="block font-sans font-extrabold text-[9px] tracking-[0.08em] uppercase text-[#8b0000]">
                MOHAN BABU
              </span>
              <span className="block font-sans font-bold text-[7.5px] tracking-[0.14em] uppercase text-[#8b0000]">
                UNIVERSITY
              </span>
            </div>
          </div>
        </div>

        {/* Card Body - Crisp White Paper */}
        <div className="px-5 pt-4 pb-3 flex flex-col items-center relative bg-gradient-to-b from-white via-white to-stone-50">
          
        

          {/* Student Portrait with Subtle Border Frame */}
          <div className="relative mb-3">
            <div className="w-32 h-40 rounded-sm overflow-hidden border-2 border-stone-300 shadow-md bg-stone-100">
              <img
                src={student.avatar || '/src/assets/id-card-photo.jpeg'}
                alt={student.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Student Name */}
          <h2 className="font-sans font-black text-lg sm:text-xl text-[#c8102e] tracking-tight uppercase text-center mb-3">
            {student.name || 'BAPATHI SARANYA'}
          </h2>

          {/* Official Key-Value Information Table */}
          <div className="w-full space-y-1.5 text-[11px] sm:text-[11.5px] font-sans pr-6">
            <div className="flex items-baseline">
              <span className="w-32 font-bold text-stone-800 shrink-0">Registration No.</span>
              <span className="font-bold text-stone-800 mr-1.5">:</span>
              <span className="font-extrabold font-mono text-stone-900">{rollNumber}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-32 font-bold text-stone-800 shrink-0">Course</span>
              <span className="font-bold text-stone-800 mr-1.5">:</span>
              <span className="font-bold text-stone-900">{courseName}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-32 font-bold text-stone-800 shrink-0">Branch</span>
              <span className="font-bold text-stone-800 mr-1.5">:</span>
              <span className="font-bold text-stone-900">{branchName}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-32 font-bold text-stone-800 shrink-0">Section</span>
              <span className="font-bold text-stone-800 mr-1.5">:</span>
              <span className="font-bold text-stone-900">{sectionName}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-32 font-bold text-stone-800 shrink-0">Faculty Name</span>
              <span className="font-bold text-stone-800 mr-1.5">:</span>
              <span className="font-bold text-stone-900">{facultyName}</span>
            </div>

            <div className="flex items-baseline">
              <span className="w-32 font-bold text-stone-800 shrink-0">Year of Admission</span>
              <span className="font-bold text-stone-800 mr-1.5">:</span>
              <span className="font-bold text-stone-900">{yearAdmission}</span>
            </div>
          </div>

        </div>

        {/* Bottom Red Footer Motto Banner */}
        <div className="bg-[#c8102e] text-white py-1.5 px-4 text-center">
          <p className="font-sans font-extrabold text-[10px] tracking-[0.24em] uppercase text-stone-100">
            D R E A M &nbsp; B E L I E V E &nbsp; A C H I E V E
          </p>
        </div>

        {/* Action Toolbar on Bottom */}
        <div className="px-4 py-2 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
          
{student.github && (
  <a
    href={student.github}
    target="_blank"
    rel="noreferrer"
    className="p-1.5 rounded-lg text-black hover:text-black hover:bg-stone-200 transition-colors"
    title="GitHub"
  >
    <GitHubIcon className="w-6 h-6 text-black" />
  </a>
)}

            {student.linkedIn && (
              <a
                href={student.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onViewPortfolio}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-[#c8102e] hover:bg-[#a00d24] text-white shadow-sm transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
