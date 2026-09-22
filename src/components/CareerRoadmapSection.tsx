import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  Building2,
  Stethoscope,
  TestTube2,
  Activity,
  Eye,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Clock,
  ShieldCheck,
  Globe,
  Sparkles,
  UserCheck,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { CAREER_ROADMAPS, CourseCareerPath, CareerMilestone } from '../data/careerRoadmapData';

interface CareerRoadmapSectionProps {
  initialCourseId?: string;
  onSelectCourse?: (courseId: string) => void;
  onOpenConsultation?: () => void;
}

export const CareerRoadmapSection: React.FC<CareerRoadmapSectionProps> = ({
  initialCourseId,
  onSelectCourse,
  onOpenConsultation,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId && CAREER_ROADMAPS.some((c) => c.id === initialCourseId)
      ? initialCourseId
      : CAREER_ROADMAPS[0].id
  );
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(1);
  const [userEducation, setUserEducation] = useState<'10+2 Science' | 'Graduate (B.Sc / B.Com / Arts)' | 'Diploma Holder'>('10+2 Science');
  const [activeTab, setActiveTab] = useState<'timeline' | 'growth' | 'pathfinder'>('timeline');

  useEffect(() => {
    if (initialCourseId && CAREER_ROADMAPS.some((c) => c.id === initialCourseId)) {
      setSelectedCourseId(initialCourseId);
      setSelectedStageNumber(1);
    }
  }, [initialCourseId]);

  const currentCourse: CourseCareerPath =
    CAREER_ROADMAPS.find((c) => c.id === selectedCourseId) || CAREER_ROADMAPS[0];

  const currentMilestone: CareerMilestone =
    currentCourse.stages.find((s) => s.stageNumber === selectedStageNumber) || currentCourse.stages[0];

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'TestTube2':
        return <TestTube2 className="w-5 h-5" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getStageBadgeColor = (category: string) => {
    switch (category) {
      case 'Student':
        return 'bg-blue-50 text-[#1b3280] border-blue-200';
      case 'Intern':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Junior Professional':
        return 'bg-emerald-50 text-[#15803d] border-emerald-200';
      case 'Senior Professional':
        return 'bg-indigo-50 text-indigo-900 border-indigo-200';
      case 'Leadership':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <section id="career-roadmap" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Brand Circles from CIHM Emblem */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Official CIHM Royal Blue and Medical Green */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b3280] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Compass className="w-4 h-4 text-[#16a34a]" />
            <span>Structured Clinical Career Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#14245c] tracking-tight font-['Outfit']">
            From Student to <span className="text-[#16a34a]">Professional</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore how CIHM academic programs map into progressive hospital appointments, clinical
            competencies, and tiered earning potential over time — completely verified by accredited hospital networks.
          </p>

          {/* Quick View Mode Switcher */}
          <div className="mt-6 inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300">
            <button
              id="roadmap-tab-timeline"
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-white text-[#1b3280] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step-by-Step Roadmap
            </button>
            <button
              id="roadmap-tab-growth"
              onClick={() => setActiveTab('growth')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'growth'
                  ? 'bg-white text-[#1b3280] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Growth Potential Index
            </button>
            <button
              id="roadmap-tab-pathfinder"
              onClick={() => setActiveTab('pathfinder')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pathfinder'
                  ? 'bg-white text-[#1b3280] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Custom Pathway Finder
            </button>
          </div>
        </div>

        {/* Course Selector Horizontal Cards */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Program Pathway:
            </span>
            <span className="text-xs text-[#15803d] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              NABL / AERB / Hospital Aligned Curricula
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CAREER_ROADMAPS.map((course) => {
              const isSelected = course.id === selectedCourseId;
              return (
                <button
                  key={course.id}
                  id={`roadmap-course-btn-${course.id}`}
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setSelectedStageNumber(1);
                  }}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-white border-[#1b3280] ring-2 ring-[#1b3280]/20 shadow-md translate-y-[-2px]'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-[#1b3280] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {getCourseIcon(course.icon)}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {course.code.replace('CIHM-', '')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {course.courseName}
                  </h4>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-[#15803d] font-medium">
                    <span>Target:</span>
                    <span className="font-semibold truncate">{course.targetPeakRole}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Course Overview Ribbon in CIHM Royal Navy */}
        <div className="bg-[#14245c] rounded-2xl p-6 text-white mb-8 shadow-xl border border-blue-900/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#16a34a] text-white">
                  {currentCourse.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-100">
                  {currentCourse.duration}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Peak Scale: +{currentCourse.growthIndexMax - 100}% Progression
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-['Outfit']">
                {currentCourse.courseName}
              </h3>
              <p className="text-blue-100/90 text-sm max-w-3xl leading-relaxed">
                {currentCourse.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[220px]">
              <button
                id="roadmap-consult-advisor-btn"
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#16a34a] hover:bg-[#15803d] text-white shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Get Admission Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {onSelectCourse && (
                <button
                  id="roadmap-view-syllabus-btn"
                  onClick={() => onSelectCourse(currentCourse.id)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>View Full Syllabus</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Hiring Partners Ticker */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-blue-200">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              Recruiting Hospitals:
            </span>
            {currentCourse.topHospitalRecruiters.map((hospital, idx) => (
              <span key={idx} className="bg-white/5 px-2.5 py-1 rounded-md text-blue-100 border border-white/10">
                {hospital}
              </span>
            ))}
          </div>
        </div>

        {/* TAB 1: STEP-BY-STEP ROADMAP TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            {/* Interactive Stepper Navigation */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
                <span>Progression Stages (Click to Inspect):</span>
                <span className="text-slate-400 font-medium">Stage {selectedStageNumber} of 5</span>
              </div>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-6 left-10 right-10 h-1 bg-slate-200 z-0">
                  <div
                    className="h-full bg-[#16a34a] transition-all duration-500"
                    style={{
                      width: `${((selectedStageNumber - 1) / (currentCourse.stages.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                  {currentCourse.stages.map((stage) => {
                    const isSelected = stage.stageNumber === selectedStageNumber;
                    const isPassed = stage.stageNumber <= selectedStageNumber;

                    return (
                      <button
                        key={stage.stageNumber}
                        id={`roadmap-stage-step-${stage.stageNumber}`}
                        onClick={() => setSelectedStageNumber(stage.stageNumber)}
                        className={`flex md:flex-col items-center md:text-center text-left p-3 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 ring-2 ring-[#1b3280] shadow-sm'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                            isSelected
                              ? 'bg-[#1b3280] text-white ring-4 ring-blue-100 shadow-md'
                              : isPassed
                              ? 'bg-[#16a34a] text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isPassed && !isSelected ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            stage.stageNumber
                          )}
                        </div>

                        <div className="ml-3 md:ml-0 md:mt-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mb-1 ${getStageBadgeColor(
                              stage.roleCategory
                            )}`}
                          >
                            {stage.roleCategory}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900 leading-snug">
                            {stage.stageName}
                          </h5>
                          <p className="text-[11px] text-slate-500 mt-0.5">{stage.timeline}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Stage Card (Selected Milestone) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Role, Environment & Progression Highlights */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStageBadgeColor(
                        currentMilestone.roleCategory
                      )}`}
                    >
                      Stage {currentMilestone.stageNumber}: {currentMilestone.roleCategory}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {currentMilestone.timeline}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-[#14245c] font-['Outfit']">
                      {currentMilestone.roleTitle}
                    </h4>
                    <p className="text-sm font-semibold text-[#15803d] flex items-center gap-1.5 mt-1.5">
                      <Building2 className="w-4 h-4 text-[#15803d]" />
                      Deployment Environment: {currentMilestone.workplace}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Milestone Focus:
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {currentMilestone.keyHighlight}
                    </p>
                  </div>

                  {/* Core Clinical Competencies */}
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                      Clinical Competencies Acquired:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentMilestone.clinicalCompetencies.map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-slate-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                          <span className="font-medium">{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Unlocked */}
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      Accreditations & Certificates Unlocked:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {currentMilestone.certificationsUnlocked.map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1b3280]"
                        >
                          <Award className="w-3.5 h-3.5 text-[#16a34a]" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Earning & Progression Tier Card (Strictly No Currency Amounts) */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-[#14245c] to-[#0f1f4b] text-white shadow-xl border border-blue-950">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-blue-300 font-bold">
                          Standardized Hospital Scale
                        </span>
                        <h5 className="text-lg font-bold text-white font-['Outfit'] mt-0.5">
                          {currentMilestone.growthTier}
                        </h5>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#16a34a] text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Growth Potential Meter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-200 font-medium">Career Growth Potential Scale</span>
                        <span className="font-black text-amber-300">
                          {currentMilestone.growthIndex === 100
                            ? 'Baseline (Student Phase)'
                            : `+${currentMilestone.growthIndex - 100}% Growth Index`}
                        </span>
                      </div>

                      <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#16a34a] via-amber-400 to-[#16a34a] transition-all duration-700"
                          style={{
                            width: `${Math.min(100, (currentMilestone.growthIndex / currentCourse.growthIndexMax) * 100)}%`,
                          }}
                        />
                      </div>

                      <div className="flex justify-between text-[10px] text-blue-300/80 pt-1">
                        <span>Student Foundation</span>
                        <span>Clinical Staff Grade</span>
                        <span>Leadership / Global</span>
                      </div>
                    </div>

                    {/* Qualitative Compensation Breakdown */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Remuneration Structure & Growth:
                      </span>
                      <p className="text-xs text-blue-100/90 leading-relaxed font-normal">
                        {currentMilestone.growthDescription}
                      </p>
                    </div>

                    {/* Global Mobility & Fellowship Linkage */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-blue-200">
                        <Globe className="w-4 h-4 text-[#16a34a] shrink-0" />
                        <span className="text-white font-medium">International Recognition:</span>
                      </div>
                      <p className="text-xs text-blue-200/90 pl-6">
                        {currentCourse.internationalMobility}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      id="roadmap-prev-stage-btn"
                      disabled={selectedStageNumber <= 1}
                      onClick={() => setSelectedStageNumber((prev) => Math.max(1, prev - 1))}
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold text-blue-200 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    >
                      ← Previous Stage
                    </button>
                    <button
                      id="roadmap-next-stage-btn"
                      disabled={selectedStageNumber >= currentCourse.stages.length}
                      onClick={() =>
                        setSelectedStageNumber((prev) =>
                          Math.min(currentCourse.stages.length, prev + 1)
                        )
                      }
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-white text-[#14245c] hover:bg-blue-50 shadow transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GROWTH POTENTIAL INDEX VISUALIZER (NO CURRENCY AMOUNTS) */}
        {activeTab === 'growth' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8">
            <div className="max-w-2xl">
              <h4 className="text-xl sm:text-2xl font-black text-[#14245c] font-['Outfit']">
                Long-Term Career Acceleration Index
              </h4>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                Visualizing progression from the student foundation phase to executive healthcare leadership
                without arbitrary figures. Evaluated on standardized hospital seniority pay-scales, shift differentials, and clinical promotions.
              </p>
            </div>

            {/* Growth Potential Progression Chart */}
            <div className="space-y-4">
              {currentCourse.stages.map((stage) => {
                const percentage = Math.round(
                  (stage.growthIndex / currentCourse.growthIndexMax) * 100
                );

                return (
                  <div
                    key={stage.stageNumber}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1b3280] text-white flex items-center justify-center text-xs font-bold">
                          {stage.stageNumber}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900">{stage.stageName}</h5>
                        <span className="text-xs text-slate-500 font-medium">({stage.timeline})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStageBadgeColor(
                            stage.roleCategory
                          )}`}
                        >
                          {stage.growthTier}
                        </span>
                        <span className="text-xs font-black text-[#15803d]">
                          Index {stage.growthIndex}
                        </span>
                      </div>
                    </div>

                    {/* Visual Bar */}
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#1b3280] via-[#16a34a] to-amber-500 transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-1">
                      <span className="font-semibold text-slate-800">
                        Typical Role: {stage.roleTitle}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Growth: {stage.growthIndex === 100 ? 'Foundation Baseline' : `+${stage.growthIndex - 100}% Relative Elevation`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Growth Guarantee & Merit Framework */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center gap-2 text-[#1b3280] font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  100% Institutional Placement
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct recruitment tie-ups with Apollo, Fortis, Medica, Suraksha ensure seamless transition from student intern to permanent hospital payroll.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2 text-[#15803d] font-bold text-sm mb-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  NABL & AERB Quality Premium
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CIHM graduates command higher initial grades and rapid promotional trajectories due to hands-on automation and audit compliance training.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                  <Globe className="w-4 h-4 text-[#16a34a]" />
                  UK Fellowship Pathways
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seamless progression into 1-Year Online Fellowships with Virtued Eduversity London to qualify for senior department leadership and overseas practice.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM PATHWAY FINDER */}
        {activeTab === 'pathfinder' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl">
              <h4 className="text-xl sm:text-2xl font-black text-[#14245c] font-['Outfit']">
                Personalized Career Pathfinder
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Select your current qualification level to see the fastest route into super-specialty healthcare and senior hospital appointments.
              </p>
            </div>

            {/* Input Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(
                [
                  '10+2 Science',
                  'Graduate (B.Sc / B.Com / Arts)',
                  'Diploma Holder',
                ] as const
              ).map((edu) => (
                <button
                  key={edu}
                  onClick={() => setUserEducation(edu)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    userEducation === edu
                      ? 'bg-blue-50/80 border-[#1b3280] ring-2 ring-[#1b3280]/20 font-bold text-[#14245c]'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <GraduationCap className={`w-5 h-5 ${userEducation === edu ? 'text-[#1b3280]' : 'text-slate-400'}`} />
                    {userEducation === edu && <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />}
                  </div>
                  <span className="text-sm">{edu}</span>
                </button>
              ))}
            </div>

            {/* Tailored Roadmap Output */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#15803d]">
                  Recommended Fast-Track Pathway for {userEducation}:
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#1b3280] text-white font-bold">
                  Target Program: {currentCourse.courseName}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Phase 1 (Immediate)
                  </span>
                  <h6 className="text-sm font-bold text-slate-900">Direct CIHM Enrolment</h6>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Eligibility verified. Merit scholarship assistance applied. Fast-track admission without entrance examination stress.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Phase 2 (Year 1)
                  </span>
                  <h6 className="text-sm font-bold text-slate-900">Hospital Rotation & PPO</h6>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Over 350+ hours at Apollo/Medica. Early Pre-Placement Offer eligibility while completing your final semester.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Phase 3 (Post-Diploma)
                  </span>
                  <h6 className="text-sm font-bold text-slate-900">Senior Grade & UK Fellowship</h6>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Seamless upgrade to London Virtued Eduversity Fellowship for accelerated department leadership promotions.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                <span className="text-xs text-slate-500 font-medium">
                  Questions regarding eligibility, reservation, or batch timings?
                </span>
                <button
                  id="roadmap-speak-counselor-btn"
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1b3280] hover:bg-[#14245c] text-white shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>Speak with CIHM Career Counselor</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
