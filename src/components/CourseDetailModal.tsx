import React, { useState } from 'react';
import {
  X,
  Clock,
  BookOpen,
  Building,
  Briefcase,
  CheckCircle2,
  Award,
  PhoneCall,
  Download,
  Share2,
  Send,
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onShare: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onShare,
}) => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  if (!course) return null;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone) return;
    setInquirySubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-6 animate-in fade-in zoom-in duration-200">
        {/* Banner with realistic clinical photo - 100% uncovered */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-600 text-white shadow-md">
              {course.category}
            </span>
            {course.scholarshipAvailable && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-slate-950 shadow-md">
                50% Scholarship Available
              </span>
            )}
          </div>

          {/* Title & Code at bottom of banner */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-cyan-300">
              {course.code}
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 font-['Outfit'] leading-snug">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Duration
              </span>
              <span className="font-bold text-slate-800">{course.duration}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Practical Training
              </span>
              <span className="font-bold text-cyan-800">{course.practicalHours}+ Hours</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Eligibility
              </span>
              <span className="font-bold text-slate-800">{course.eligibility}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Fee Structure
              </span>
              <span className="font-bold text-[#14245c]">{course.fees}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-700" />
              <span>Program Overview &amp; Learning Objectives</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Comprehensive Syllabus Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-700" />
              <span>Full Clinical Syllabus &amp; Laboratory Modules</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Internship Rotations */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] mb-2 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-cyan-700" />
              <span>Clinical Internship Tie-Up Hospitals</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.internshipHospitals.map((hosp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded-lg text-xs font-semibold"
                >
                  {hosp}
                </span>
              ))}
            </div>
          </div>

          {/* Career Roles */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-cyan-700" />
              <span>Career Designations Upon Completion</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.careerRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Admission Application Form inside Modal */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl text-white border border-cyan-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base text-white font-['Outfit']">
                  Apply for {course.title}
                </h4>
                <p className="text-xs text-slate-300">
                  Book direct counseling or reserve your scholarship seat for the 2025–26 batch.
                </p>
              </div>
              <a
                href="tel:+919073737888"
                className="hidden sm:flex items-center gap-1.5 text-xs text-cyan-400 font-bold hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91-9073737888</span>
              </a>
            </div>

            {inquirySubmitted ? (
              <div className="bg-emerald-950/80 border border-emerald-700 p-4 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-emerald-200">
                  Application Received Successfully!
                </p>
                <p className="text-xs text-slate-300">
                  Our CIHM Admissions Counselor will contact {studentPhone} within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  required
                  type="text"
                  placeholder="Your Full Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <input
                  required
                  type="tel"
                  placeholder="WhatsApp / Phone (+91)"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShare(course)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-700" />
              <span>Share Course</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
