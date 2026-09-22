import React, { useState } from 'react';
import {
  Award,
  Globe,
  Clock,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ExternalLink,
  BookOpen,
  DollarSign,
  Send,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { FellowshipCourse } from '../types';

interface FellowshipsSectionProps {
  fellowships: FellowshipCourse[];
  onSelectFellowship?: (fellowship: FellowshipCourse) => void;
}

export const FellowshipsSection: React.FC<FellowshipsSectionProps> = ({
  fellowships,
  onSelectFellowship,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProgram, setInquiryProgram] = useState(
    'Fellowship in Clinical Cardiology - F.C.C. (London)'
  );
  const [submitted, setSubmitted] = useState(false);

  const specialties = [
    'All',
    'Cardiology',
    'Critical Care',
    'Endocrinology',
    'Acute Trauma',
    'Child Health',
    'Cutaneous Medicine',
    'Comprehensive Adult',
    'Neurosciences',
  ];

  const filteredFellowships = fellowships.filter((fel) => {
    const matchesSearch =
      fel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fel.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fel.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'All' || fel.specialty.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
    }, 4500);
  };

  return (
    <section id="fellowships" className="py-12 bg-white border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Official Collaboration Crest Banner */}
        <div className="bg-gradient-to-r from-[#073947] via-[#09495c] to-[#0b5c71] rounded-3xl p-6 sm:p-8 text-white mb-10 shadow-xl border border-teal-500/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-300 text-xs font-bold">
                <Globe className="w-3.5 h-3.5" />
                <span>UK REGISTERED MEDICAL CERTIFICATION • 2026–27 INTAKE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] leading-tight">
                Virtued Eduversity (London, UK) &amp; CIHM Kolkata
              </h2>
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                East India Authorised Center: <strong>Central Institute of Healthcare &amp; Management (CIHM)</strong>,
                DumDum, Kolkata. 1-Year Online Fellowship Courses designed for Doctors (MBBS/MD/DNB/BAMS/BHMS)
                and Healthcare Practitioners.
              </p>
            </div>

            {/* Price Highlight Card */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0 w-full lg:w-auto">
              <span className="text-[11px] text-blue-200 uppercase tracking-wider block">
                Institutional Grant Scheme
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit'] my-1">
                50% SCHOLARSHIP
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                Zero-Cost Installment Options
              </span>
              <div className="mt-2 text-[10px] text-blue-200">
                Helplines: 9073737888 / 9073737444
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#073947] font-['Outfit']">
              1-Year Online Fellowships for Doctors &amp; Healthcare Professionals
            </h3>
            <p className="text-xs text-slate-500">
              Conducted and delivered by Virtued Academy International with CIHM Kolkata center support.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fellowship (Cardiology, ICU...)"
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
            />
          </div>
        </div>

        {/* Fellowship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {filteredFellowships.map((fel) => (
            <div
              key={fel.id}
              className="bg-white rounded-2xl border border-teal-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-teal-400 hover:-translate-y-1"
            >
              {/* Card Photo Header with 100% UNCOVERED clear image */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={fel.image}
                  alt={fel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-[#14245c] shadow-xs">
                  {fel.shortCode}
                </span>
                <span className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-bold truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {fel.specialty}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-[#14245c] group-hover:text-blue-700 transition-colors leading-snug">
                    {fel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Awarded by: {fel.awardingBody}
                  </p>
                </div>

                {/* Key Modules */}
                <div className="space-y-1 bg-[#f0fdfa] p-2.5 rounded-xl border border-teal-100 text-[11px] text-slate-700">
                  {fel.keyModules.slice(0, 2).map((mod, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{mod}</span>
                    </div>
                  ))}
                </div>

                {/* Fee & Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Grant Scheme</span>
                    <span className="text-xs font-extrabold text-[#14245c] font-['Outfit']">
                      Subsidized Installments
                    </span>
                  </div>

                  <a
                    href="tel:9073737888"
                    className="px-3 py-1.5 rounded-lg bg-[#14245c] hover:bg-[#1b3280] text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                  >
                    <span>Enroll Now</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Admission Inquiry for Fellowships */}
        <div className="bg-[#f0fdfa] border border-teal-200 p-6 rounded-3xl">
          <div className="max-w-3xl mx-auto text-center space-y-2 mb-6">
            <h3 className="text-xl font-bold text-[#073947] font-['Outfit']">
              Inquire for 2026-27 Fellowship Intake (East India Center)
            </h3>
            <p className="text-xs text-slate-600">
              Speak directly with CIHM academic counselors regarding syllabus, eligibility, and zero-cost EMI options.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-emerald-900 text-xs font-bold">
              ✓ Inquiry Submitted! Our medical fellowship coordinator will call you within 2 hours.
            </div>
          ) : (
            <form onSubmit={handleApply} className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                required
                type="text"
                placeholder="Doctor's Full Name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
              />
              <input
                required
                type="tel"
                placeholder="WhatsApp / Phone (+91)"
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
              />
              <select
                value={inquiryProgram}
                onChange={(e) => setInquiryProgram(e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800 truncate"
              >
                {fellowships.map((f) => (
                  <option key={f.id} value={f.title}>
                    {f.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#073947] font-extrabold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reserve Seat</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
