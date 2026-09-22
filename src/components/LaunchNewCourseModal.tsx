import React, { useState } from 'react';
import {
  X,
  Sparkles,
  PlusCircle,
  CheckCircle,
  GraduationCap,
  Building,
  Clock,
  Layers,
} from 'lucide-react';
import { Course } from '../types';

interface LaunchNewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchSuccess: (newCourse: Course) => void;
}

export const LaunchNewCourseModal: React.FC<LaunchNewCourseModalProps> = ({
  isOpen,
  onClose,
  onLaunchSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<Course['category']>('Paramedical');
  const [duration, setDuration] = useState('2 Years + 6 Months Hospital Internship');
  const [eligibility, setEligibility] = useState('10+2 with Physics, Chemistry & Biology (PCB)');
  const [description, setDescription] = useState('');
  const [fees, setFees] = useState('Subsidized Institutional Structure (Scholarship Eligible)');
  const [practicalHours, setPracticalHours] = useState(360);
  const [internshipHospitals, setInternshipHospitals] = useState(
    'Apollo Multispeciality Hospitals, Fortis Healthcare, Medica Superspecialty'
  );
  const [careerRoles, setCareerRoles] = useState(
    'Chief Clinical Technologist, Senior Diagnostic Officer'
  );
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80'
  );
  const [syllabusModules, setSyllabusModules] = useState(
    'Advanced Diagnostic Clinical Principles\nNABL Quality Standard Audits\nHospital Internship Practicum'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      code: code || `CIHM-NEW-${Math.floor(100 + Math.random() * 900)}`,
      category,
      duration,
      eligibility,
      description,
      fees,
      practicalHours: Number(practicalHours) || 300,
      internshipHospitals: internshipHospitals.split(',').map((s) => s.trim()).filter(Boolean),
      careerRoles: careerRoles.split(',').map((s) => s.trim()).filter(Boolean),
      image,
      syllabus: syllabusModules.split('\n').map((s) => s.trim()).filter(Boolean),
      featured: true,
      scholarshipAvailable: true,
      isNewLaunch: true,
      launchYear: '2026–27 (Newly Launched)',
    };

    try {
      const res = await fetch('/api/courses/launch-new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(`Course "${title}" launched successfully! Broadcast notification sent.`);
        onLaunchSuccess(data.course);
        setTimeout(() => {
          setIsSubmitting(false);
          setSuccessMessage('');
          onClose();
        }, 1800);
      } else {
        // Fallback for offline queue
        const fallbackCourse: Course = {
          id: `course-local-${Date.now()}`,
          ...payload,
        };
        onLaunchSuccess(fallbackCourse);
        setSuccessMessage(`Course launched in offline storage!`);
        setTimeout(() => {
          setIsSubmitting(false);
          setSuccessMessage('');
          onClose();
        }, 1800);
      }
    } catch (err) {
      const fallbackCourse: Course = {
        id: `course-local-${Date.now()}`,
        ...payload,
      };
      onLaunchSuccess(fallbackCourse);
      setSuccessMessage(`Course launched in offline storage!`);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage('');
        onClose();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#073947]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-teal-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header - CIHM Brand Colors (No Black) */}
        <div className="bg-gradient-to-r from-[#073947] via-[#09495c] to-[#0b5c71] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-[#073947] flex items-center justify-center font-extrabold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] flex items-center gap-2">
                <span>Launch New Healthcare Course</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/30 text-amber-200 text-[10px] font-extrabold">
                  2026 Batch
                </span>
              </h3>
              <p className="text-xs text-teal-100">
                Instantly publish new academic programs to student app &amp; hospital networks.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {successMessage ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="font-extrabold text-sm text-emerald-900">{successMessage}</p>
              <p className="text-emerald-700">Course will appear in the New Course Launch showcase.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Diploma in Emergency & Trauma Care"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CIHM-DETC-07"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  >
                    <option value="Paramedical">Paramedical</option>
                    <option value="Diagnostic Imaging">Diagnostic Imaging</option>
                    <option value="Critical Care">Critical Care</option>
                    <option value="Hospital Management">Hospital Management</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fee Structure / Scholarship Grant</label>
                  <input
                    type="text"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Description *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Overview of clinical training, laboratory exposure, hospital machines, and job scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Internship Hospitals (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={internshipHospitals}
                    onChange={(e) => setInternshipHospitals(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Career Roles (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={careerRoles}
                    onChange={(e) => setCareerRoles(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Syllabus Key Modules (One per line)
                </label>
                <textarea
                  rows={3}
                  value={syllabusModules}
                  onChange={(e) => setSyllabusModules(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Realistic Course Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#073947] font-black shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Publishing...' : 'Launch Course & Broadcast'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
