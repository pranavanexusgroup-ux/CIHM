import React from 'react';
import {
  GraduationCap,
  Award,
  Users,
  Building2,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Globe,
} from 'lucide-react';

interface HeroBannerProps {
  onExploreCourses: () => void;
  onViewPlacements: () => void;
  onJoinCommunity: () => void;
  onOpenStudyConnect: () => void;
  onViewRoadmap?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCourses,
  onViewPlacements,
  onJoinCommunity,
  onOpenStudyConnect,
  onViewRoadmap,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#14245c] via-[#1b3280] to-[#0f1f4b] text-white border-b border-blue-900/60">
      {/* Background Subtle Medical Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-4">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c163b] border border-blue-400/40 text-amber-300 text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Kolkata’s Premier Paramedical, Management &amp; UK Fellowship Institute</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-['Outfit']">
              Empowering Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-white">
                Healthcare Leaders
              </span>{' '}
              with Clinical Excellence
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl leading-relaxed">
              Fast-track your medical career with 1-Year Programs and International UK Fellowships.
              Hands-on diagnostic laboratory rotations, NABL-grade automated analyzers, and{' '}
              <strong className="text-amber-300 font-bold">100% Placement Assistance</strong> at
              Apollo, Fortis, Medica, and Suraksha Diagnostics.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2 text-blue-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Merit Scholarships Available</span>
              </div>
              <div className="flex items-center gap-2 text-blue-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hospital Rotations Included</span>
              </div>
              <div className="flex items-center gap-2 text-blue-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UK Fellowship Programs</span>
              </div>
              <div className="flex items-center gap-2 text-blue-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modern NABL-Grade Labs</span>
              </div>
              <div className="flex items-center gap-2 text-blue-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Offline &amp; Mobile-Ready PWA</span>
              </div>
              <div className="flex items-center gap-2 text-blue-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Career Progression Roadmap</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                id="hero-explore-courses-btn"
                onClick={onExploreCourses}
                className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-[#14245c] shadow-lg flex items-center gap-2 active:scale-95 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Explore Paramedical Courses</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {onViewRoadmap && (
                <button
                  id="hero-view-roadmap-btn"
                  onClick={onViewRoadmap}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Career Roadmap</span>
                </button>
              )}

              <button
                id="hero-view-placements-btn"
                onClick={onViewPlacements}
                className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0c163b] hover:bg-[#1b3280] text-blue-100 border border-blue-400/40 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Placement Records</span>
              </button>

              <button
                id="hero-study-connect-btn"
                onClick={onOpenStudyConnect}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs text-blue-200 hover:text-white border border-blue-800 hover:border-blue-500 flex items-center gap-1.5 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <span>Live Study Rooms</span>
              </button>
            </div>
          </div>

          {/* Quick Snapshot Card / Stats with REAL College Campus & Lab Photo */}
          <div className="lg:col-span-5">
            <div className="bg-[#0c163b] border border-blue-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
              {/* Actual College Laboratory & Student Practical Training Photo (100% Clean & Uncovered!) */}
              <div className="rounded-2xl overflow-hidden border border-blue-400/30 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=85"
                  alt="Central Institute of Healthcare & Management - Paramedical Practical Training"
                  className="w-full h-44 sm:h-52 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-blue-200 px-1">
                <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  CIHM Dumdum Diagnostics Lab
                </span>
                <span className="font-bold text-emerald-400">NABL-Aligned Training</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#1b3280] border border-amber-400/50 flex items-center justify-center text-amber-400 font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm text-white font-['Outfit']">
                      CIHM Dumdum Campus
                    </h2>
                    <p className="text-[11px] text-blue-200">105/59 DumDum Rd, Motijheel, Kolkata</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-[#14245c]">
                  4.9 ★ Google Rated
                </span>
              </div>

              {/* Metric stats 2x2 grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#14245c] p-3.5 rounded-2xl border border-blue-800/60">
                  <span className="text-2xl font-black text-amber-400 font-['Outfit']">100%</span>
                  <p className="text-xs text-white font-bold">Placement Support</p>
                  <p className="text-[10px] text-blue-200">Apollo, Fortis, Medica, Suraksha</p>
                </div>

                <div className="bg-[#14245c] p-3.5 rounded-2xl border border-blue-800/60">
                  <span className="text-xl sm:text-2xl font-black text-emerald-300 font-['Outfit']">Tier-1</span>
                  <p className="text-xs text-white font-bold">Super-Specialty Grade</p>
                  <p className="text-[10px] text-blue-200">Verified Clinical Postings</p>
                </div>

                <div className="bg-[#14245c] p-3.5 rounded-2xl border border-blue-800/60">
                  <span className="text-2xl font-black text-blue-300 font-['Outfit']">350+ Hrs</span>
                  <p className="text-xs text-white font-bold">Hands-on Lab Work</p>
                  <p className="text-[10px] text-blue-200">Live Hospital Rotations</p>
                </div>

                <div className="bg-[#14245c] p-3.5 rounded-2xl border border-blue-800/60">
                  <span className="text-2xl font-black text-amber-300 font-['Outfit']">16+</span>
                  <p className="text-xs text-white font-bold">UK Fellowships</p>
                  <p className="text-[10px] text-blue-200">International Certification</p>
                </div>
              </div>

              {/* Contact info strip */}
              <div className="pt-2 flex items-center justify-between text-xs text-blue-200">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <PhoneCall className="w-3.5 h-3.5" />
                  9073737888 / 9073737444
                </span>
                <span className="text-[11px] text-emerald-300">Admissions Open 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
