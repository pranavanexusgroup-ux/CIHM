import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  Image as ImageIcon,
  BookOpen,
  Users,
  Settings,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Link as LinkIcon,
  ToggleLeft,
  ToggleRight,
  Save,
  Award,
} from 'lucide-react';
import {
  Course,
  GoogleReview,
  GoogleReviewsConfig,
  HeaderSlide,
  FellowshipCourse,
  PlacementRecord,
} from '../types';

interface AdminPanelProps {
  courses: Course[];
  headerSlides: HeaderSlide[];
  googleReviews: GoogleReview[];
  googleConfig: GoogleReviewsConfig;
  fellowships: FellowshipCourse[];
  placements: PlacementRecord[];
  onUpdateGoogleConfig: (newConfig: GoogleReviewsConfig) => void;
  onAddReview: (review: Partial<GoogleReview>) => void;
  onDeleteReview: (id: string) => void;
  onAddSlide: (slide: Partial<HeaderSlide>) => void;
  onDeleteSlide: (id: string) => void;
  onDeleteCourse: (id: string) => void;
  onOpenLaunchCourse: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  courses,
  headerSlides,
  googleReviews,
  googleConfig,
  fellowships,
  placements,
  onUpdateGoogleConfig,
  onAddReview,
  onDeleteReview,
  onAddSlide,
  onDeleteSlide,
  onDeleteCourse,
  onOpenLaunchCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'slides' | 'courses' | 'placements'>(
    'reviews'
  );

  // Reviews config state
  const [reviewsEnabled, setReviewsEnabled] = useState(googleConfig.enabled);
  const [googleReviewUrl, setGoogleReviewUrl] = useState(googleConfig.googleReviewUrl);
  const [institutionName, setInstitutionName] = useState(googleConfig.institutionName);
  const [location, setLocation] = useState(googleConfig.location);
  const [configSaved, setConfigSaved] = useState(false);

  // New review state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState<'Student' | 'Doctor Fellow' | 'Parent' | 'Hospital Recruiter'>(
    'Student'
  );
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCourseStudied, setNewCourseStudied] = useState('DMLT 2024');

  // New slide state
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideBadge, setNewSlideBadge] = useState('ADMISSIONS OPEN 2026');
  const [newSlideImage, setNewSlideImage] = useState(
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&auto=format&fit=crop&q=85'
  );

  const handleSaveReviewsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoogleConfig({
      ...googleConfig,
      enabled: reviewsEnabled,
      googleReviewUrl,
      institutionName,
      location,
    });
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;
    onAddReview({
      author: newAuthor,
      role: newRole,
      text: newText,
      rating: newRating,
      courseStudied: newCourseStudied,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      date: 'Just now',
      verified: true,
      likes: 1,
    });
    setNewAuthor('');
    setNewText('');
  };

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideTitle || !newSlideImage) return;
    onAddSlide({
      title: newSlideTitle,
      subtitle: newSlideSubtitle,
      badge: newSlideBadge,
      image: newSlideImage,
      tagline: 'CIHM DumDum Center',
      ctaText: 'Explore Program',
      targetSection: 'courses',
    });
    setNewSlideTitle('');
    setNewSlideSubtitle('');
  };

  return (
    <div className="py-8 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Header - CIHM Royal Navy & Amber (No Pitch Black) */}
        <div className="bg-gradient-to-r from-[#14245c] via-[#1b3280] to-[#0f1f4b] p-6 rounded-3xl text-white shadow-lg mb-8 border border-blue-400/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-[#14245c] flex items-center justify-center font-extrabold shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black font-['Outfit'] flex items-center gap-2">
                  <span>CIHM Administrative Control Center</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 text-emerald-300 text-xs font-bold border border-emerald-400/40">
                    Live System
                  </span>
                </h1>
                <p className="text-xs text-blue-100">
                  Manage Google reviews, live carousel slides, launch accredited courses &amp; placement audits.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenLaunchCourse}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#073947] font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch New Course (2026)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'bg-[#073947] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>Google Reviews &amp; Maps Link</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'slides'
                ? 'bg-[#073947] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Sliding Header Images ({headerSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-[#073947] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Courses &amp; Fellowships ({courses.length + fellowships.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('placements')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'placements'
                ? 'bg-[#073947] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Placements ({placements.length})</span>
          </button>
        </div>

        {/* TAB 1: GOOGLE REVIEWS SETTINGS & MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Global Settings & Google Review Link */}
            <div className="bg-white p-6 rounded-3xl border border-teal-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-[#073947] font-['Outfit'] mb-1 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#0b5c71]" />
                <span>Google Review Display &amp; Admin Link Configuration</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Control whether the Google reviews section is enabled on the public portal and set the
                destination link for user submissions.
              </p>

              <form onSubmit={handleSaveReviewsConfig} className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-4 bg-[#f0fdfa] rounded-2xl border border-teal-100">
                  <div>
                    <span className="font-extrabold text-sm text-[#073947] block">
                      Enable Google Reviews Section
                    </span>
                    <span className="text-slate-500 text-xs">
                      When active, visitors can read verified reviews and click to submit their own.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReviewsEnabled(!reviewsEnabled)}
                    className="text-[#073947] focus:outline-none transition-transform"
                  >
                    {reviewsEnabled ? (
                      <ToggleRight className="w-10 h-10 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-slate-400" />
                    )}
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Google Review &amp; Maps URL (Link given by Admin) *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={googleReviewUrl}
                      onChange={(e) => setGoogleReviewUrl(e.target.value)}
                      placeholder="https://maps.google.com/?q=CIHM+Kolkata"
                      className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                    <a
                      href={googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold flex items-center gap-1 shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Test Link</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Institution Business Name
                    </label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Campus Physical Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {configSaved ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      Settings updated and live!
                    </span>
                  ) : (
                    <span className="text-slate-400">Updates take effect immediately on all clients.</span>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#073947] hover:bg-[#09495c] text-white font-bold shadow-xs flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Review Settings</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Add New Verified Review */}
            <div className="bg-white p-6 rounded-3xl border border-teal-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-[#073947] font-['Outfit'] mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>Publish a Verified Student / Doctor Google Review</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Add authentic testimonials received via Google Business or direct campus feedback.
              </p>

              <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reviewer Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Subrata Majumdar"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reviewer Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    >
                      <option value="Student">Student</option>
                      <option value="Doctor Fellow">Doctor Fellow</option>
                      <option value="Parent">Parent</option>
                      <option value="Hospital Recruiter">Hospital Recruiter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Course / Batch</label>
                    <input
                      type="text"
                      placeholder="e.g. DMLT Batch 2023-24"
                      value={newCourseStudied}
                      onChange={(e) => setNewCourseStudied(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewRating(s)}
                        className={`p-1.5 rounded-lg border flex items-center gap-1 ${
                          newRating >= s
                            ? 'bg-amber-50 border-amber-300 text-amber-500'
                            : 'bg-slate-50 border-slate-200 text-slate-300'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                    <span className="font-bold text-slate-700 ml-2">{newRating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Review Content *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Details about practical laboratories, faculty guidance, clinical internships, and placement experience..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#073947] font-extrabold shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Review</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Reviews List */}
            <div className="bg-white p-6 rounded-3xl border border-teal-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-[#073947] font-['Outfit'] mb-4">
                Active Live Reviews ({googleReviews.length})
              </h2>

              <div className="space-y-3">
                {googleReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{rev.author}</span>
                        <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                          {rev.role}
                        </span>
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 italic">"{rev.text}"</p>
                      <span className="text-[11px] text-slate-400 block">
                        Course: {rev.courseStudied} • {rev.date}
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteReview(rev.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SLIDING HEADER IMAGES MANAGEMENT */}
        {activeTab === 'slides' && (
          <div className="space-y-8">
            {/* Add New Header Slide */}
            <div className="bg-white p-6 rounded-3xl border border-teal-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-[#073947] font-['Outfit'] mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>Add Realistic Header Image &amp; Slide</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                All slides automatically inherit CIHM oceanic brand colors (strictly no black background!).
              </p>

              <form onSubmit={handleCreateSlide} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Slide Title *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. World-Class Dialysis Training Station"
                      value={newSlideTitle}
                      onChange={(e) => setNewSlideTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pill Badge</label>
                    <input
                      type="text"
                      value={newSlideBadge}
                      onChange={(e) => setNewSlideBadge(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtitle Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Hands-on Fresenius dialysis units with 100% Apollo internship placement."
                    value={newSlideSubtitle}
                    onChange={(e) => setNewSlideSubtitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Realistic Image URL *
                  </label>
                  <input
                    required
                    type="url"
                    value={newSlideImage}
                    onChange={(e) => setNewSlideImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#073947] hover:bg-[#09495c] text-white font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Append to Header Slider</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Slides Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {headerSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-white rounded-3xl border border-teal-200/80 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-[#14245c]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-[#14245c] text-[10px] font-bold">
                      Slide #{idx + 1}: {slide.badge}
                    </span>
                    <button
                      onClick={() => onDeleteSlide(slide.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm"
                      title="Delete slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-bold text-sm font-['Outfit'] truncate">{slide.title}</h4>
                      <p className="text-[11px] text-blue-100 truncate">{slide.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span>CTA: "{slide.ctaText}"</span>
                    <span className="font-semibold text-teal-700">Target: #{slide.targetSection}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COURSES & FELLOWSHIPS */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-teal-200/80 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-[#073947] font-['Outfit']">
                  Accredited Healthcare Programs ({courses.length} Diplomas + {fellowships.length} International Fellowships)
                </h3>
                <p className="text-xs text-slate-500">
                  Launch a new course or manage existing programs.
                </p>
              </div>

              <button
                onClick={onOpenLaunchCourse}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#073947] font-black text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Launch New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                        {course.code}
                      </span>
                      {course.isNewLaunch && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[#073947] text-[10px] font-extrabold">
                          New Launch
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-[#073947] mt-2 leading-snug">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-[#073947]">{course.fees}</span>
                    <button
                      onClick={() => onDeleteCourse(course.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PLACEMENT AUDITS */}
        {activeTab === 'placements' && (
          <div className="bg-white p-6 rounded-3xl border border-teal-200/80 shadow-xs">
            <h3 className="text-lg font-bold text-[#073947] font-['Outfit'] mb-4">
              Hospital Placement Audit Records ({placements.length} Verified Entries)
            </h3>
            <div className="space-y-3">
              {placements.map((plc) => (
                <div
                  key={plc.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={plc.photo}
                      alt={plc.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-teal-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800">{plc.studentName}</h4>
                      <p className="text-[11px] text-teal-700 font-semibold">
                        {plc.role} at {plc.hospital}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {plc.course} • Roll: {plc.rollNo}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-amber-700 block">{plc.packageLPA}</span>
                    <span className="text-[10px] text-slate-500">{plc.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
