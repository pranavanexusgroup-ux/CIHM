import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Building,
  CheckCircle,
  Plus,
  Trash2,
  Search,
  ChevronRight,
  Sparkles,
  AlertCircle,
  X,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Course, CourseCategory } from '../types';

interface CoursesSectionProps {
  courses: Course[];
  isAdminMode: boolean;
  onAddCourse: (newCourse: Partial<Course>) => Promise<void>;
  onDeleteCourse: (courseId: string) => Promise<void>;
  onSelectCourseForDetails: (course: Course) => void;
  onOpenLaunchCourseModal: () => void;
  onViewRoadmap?: (courseId?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  isAdminMode,
  onAddCourse,
  onDeleteCourse,
  onSelectCourseForDetails,
  onOpenLaunchCourseModal,
  onViewRoadmap,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Add course form state
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    category: 'Paramedical' as CourseCategory,
    duration: '1 Year + 6 Months Hospital Internship',
    eligibility: '10+2 passed (Science/Any Stream)',
    description: '',
    practicalHours: 350,
    fees: 'Subsidized Institutional Structure (Scholarship Eligible)',
    scholarshipAvailable: true,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    syllabusText:
      'Clinical Lab Procedures\nHematology & Cell Morphology\nBiochemical Assays & Quality Control\nHospital Lab Rotations',
    careerRolesText: 'Medical Lab Technologist, Pathology Lab In-charge',
    hospitalsText: 'Apollo Multispeciality, Suraksha Diagnostics, Fortis',
  });

  const categories = [
    'All',
    'Paramedical',
    'Diagnostic Imaging',
    'Critical Care',
    'Hospital Management',
    'Therapy & Rehab',
  ];

  const newlyLaunchedCourses = courses.filter((c) => c.isNewLaunch);

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.careerRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    await onAddCourse({
      title: formData.title,
      code: formData.code || `CIHM-${Math.floor(100 + Math.random() * 900)}`,
      category: formData.category,
      duration: formData.duration,
      eligibility: formData.eligibility,
      description: formData.description,
      practicalHours: Number(formData.practicalHours) || 300,
      fees: formData.fees,
      scholarshipAvailable: formData.scholarshipAvailable,
      image: formData.image,
      syllabus: formData.syllabusText.split('\n').filter((s) => s.trim().length > 0),
      careerRoles: formData.careerRolesText.split(',').map((s) => s.trim()),
      internshipHospitals: formData.hospitalsText.split(',').map((s) => s.trim()),
      featured: true,
    });

    setIsAddModalOpen(false);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this course from the CIHM curriculum?')) {
      setDeletingId(id);
      await onDeleteCourse(id);
      setDeletingId(null);
    }
  };

  return (
    <section id="courses" className="py-12 bg-[#f8fafc] border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
              <span>ACCREDITED HEALTHCARE CURRICULUM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#073947] font-['Outfit']">
              Explore Our Healthcare &amp; Paramedical Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Every course is detailed with curriculum, hands-on lab hours, top hospital internships,
              and direct career pathways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onViewRoadmap && (
              <button
                onClick={() => onViewRoadmap()}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Career Roadmap</span>
              </button>
            )}

            <button
              onClick={onOpenLaunchCourseModal}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-500 hover:bg-amber-400 text-[#14245c] shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch New Course</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#14245c] hover:bg-[#1b3280] text-white shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        {/* Newly Launched Course Showcase Banner */}
        {newlyLaunchedCourses.length > 0 && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#14245c] via-[#1b3280] to-[#0f1f4b] text-white shadow-md border border-blue-400/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-[#14245c] text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEW COURSE LAUNCH 2026</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-['Outfit']">
                  {newlyLaunchedCourses[0].title}
                </h3>
                <p className="text-xs text-blue-100 line-clamp-2">
                  {newlyLaunchedCourses[0].description}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-amber-200">
                  <span>• {newlyLaunchedCourses[0].duration}</span>
                  <span>• {newlyLaunchedCourses[0].practicalHours}+ Practical Lab Hours</span>
                  <span>• Structure: {newlyLaunchedCourses[0].fees}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onViewRoadmap && (
                  <button
                    onClick={() => onViewRoadmap(newlyLaunchedCourses[0].id)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all active:scale-95"
                  >
                    View Career Path
                  </button>
                )}
                <button
                  onClick={() => onSelectCourseForDetails(newlyLaunchedCourses[0])}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#14245c] font-black text-xs shadow-md transition-all active:scale-95"
                >
                  View Syllabus &amp; Enroll
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#073947] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course title, code, roles..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800 shadow-xs"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-xs">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-700 font-semibold">No courses match your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourseForDetails(course)}
                className="group bg-white rounded-2xl border border-teal-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1 hover:border-teal-400"
              >
                {/* Image Container with realistic photo & UNCOVERED clear view */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#14245c]/90 text-blue-100 border border-blue-400/40 backdrop-blur-md">
                    {course.category}
                  </span>

                  {/* New Launch or Scholarship Tag */}
                  {course.isNewLaunch ? (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-[#14245c] shadow-sm animate-pulse">
                      ★ New Launch
                    </span>
                  ) : (
                    course.scholarshipAvailable && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-[#14245c] shadow-xs">
                        Scholarship Scheme
                      </span>
                    )
                  )}

                  {/* Course Code & Practical hours overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-mono text-[11px] bg-[#14245c]/90 px-2 py-0.5 rounded border border-blue-400/40">
                      {course.code}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.practicalHours}+ Lab Hrs
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[#14245c] group-hover:text-blue-700 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span className="truncate">
                        Internships: {course.internshipHospitals.slice(0, 2).join(', ')}
                        {course.internshipHospitals.length > 2 ? ' +' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Footer of Card */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Fee Structure
                      </span>
                      <span className="font-extrabold text-xs text-[#14245c] font-['Outfit'] line-clamp-1 max-w-[140px]" title={course.fees}>
                        {course.fees}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onViewRoadmap && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewRoadmap(course.id);
                          }}
                          className="px-2 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1"
                          title="View career roadmap for this course"
                        >
                          <TrendingUp className="w-3 h-3" />
                          <span>Roadmap</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => handleDelete(e, course.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-bold text-[#14245c] group-hover:text-blue-700 flex items-center gap-0.5">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#073947]/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl rounded-3xl border border-teal-200 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#073947] font-['Outfit']">
                  Add New Paramedical Course
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCourse} className="mt-4 space-y-3 overflow-y-auto pr-1 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Diploma in Operation Theatre Technology"
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as CourseCategory })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    >
                      <option value="Paramedical">Paramedical</option>
                      <option value="Diagnostic Imaging">Diagnostic Imaging</option>
                      <option value="Critical Care">Critical Care</option>
                      <option value="Hospital Management">Hospital Management</option>
                      <option value="Therapy & Rehab">Therapy &amp; Rehab</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Annual Fees</label>
                    <input
                      type="text"
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Overview</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Realistic Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#073947] hover:bg-[#09495c] text-white font-bold rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    Publish Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
