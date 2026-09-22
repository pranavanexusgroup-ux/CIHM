import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  ShieldCheck,
  ThumbsUp,
  MessageCircle,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { GoogleReview, GoogleReviewsConfig } from '../types';

interface GoogleReviewsSectionProps {
  reviews: GoogleReview[];
  config: GoogleReviewsConfig;
  onLikeReview?: (reviewId: string) => void;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  reviews,
  config,
  onLikeReview,
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');
  const [likesState, setLikesState] = useState<{ [id: string]: number }>({});

  if (!config.enabled) {
    return null;
  }

  const filteredReviews = reviews.filter((rev) => {
    if (selectedRoleFilter === 'All') return true;
    return rev.role === selectedRoleFilter;
  });

  const handleLike = (id: string, initialLikes: number) => {
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1,
    }));
    if (onLikeReview) onLikeReview(id);
  };

  return (
    <section id="reviews" className="py-12 bg-white border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Official Google Review Crest */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-[#073947] text-xs font-bold mb-2">
              <span className="font-extrabold text-[#4285F4]">G</span>
              <span className="font-extrabold text-[#EA4335]">o</span>
              <span className="font-extrabold text-[#FBBC05]">o</span>
              <span className="font-extrabold text-[#4285F4]">g</span>
              <span className="font-extrabold text-[#34A853]">l</span>
              <span className="font-extrabold text-[#EA4335]">e</span>
              <span className="text-slate-700 ml-1">VERIFIED STUDENT &amp; PARENT REVIEWS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14245c] font-['Outfit']">
              What Students, Doctors &amp; Recruiters Say About CIHM
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Authentic feedback and testimonials from students at our DumDum Kolkata campus and
              doctors enrolled in Virtued London fellowships.
            </p>
          </div>

          {/* Google Summary Badge */}
          <div className="bg-[#f8fafc] p-4 rounded-2xl border border-blue-200 shadow-xs flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-[#14245c] font-['Outfit']">
                  {config.averageRating}
                </span>
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Out of 5.0</span>
            </div>

            <div className="h-10 w-px bg-blue-200" />

            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                Based on {config.totalReviewsCount}+ Verified Reviews
              </p>
              <a
                href={config.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#1b3280] hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>Write a Review on Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6">
          {['All', 'Student', 'Doctor Fellow', 'Parent', 'Hospital Recruiter'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRoleFilter === role
                  ? 'bg-[#14245c] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const currentLikes = likesState[rev.id] ?? rev.likes;
            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-blue-300"
              >
                <div>
                  {/* Reviewer Header with Photo */}
                  <div className="flex items-start gap-3">
                    <img
                      src={rev.photo}
                      alt={rev.author}
                      className="w-11 h-11 rounded-full object-cover border border-blue-200 shadow-xs shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-[#14245c] truncate font-['Outfit']">
                          {rev.author}
                        </h4>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {rev.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-50 text-[#1b3280] font-bold border border-blue-200">
                          {rev.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">"{rev.text}"</p>
                </div>

                {/* Footer with verification & Course studied */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate text-[#1b3280] font-medium">
                    Program: {rev.courseStudied || 'CIHM Cohort'}
                  </span>

                  <button
                    onClick={() => handleLike(rev.id, rev.likes)}
                    className="flex items-center gap-1 text-slate-500 hover:text-[#1b3280] transition-colors active:scale-95 text-xs font-semibold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{currentLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Link to Google Maps Business Listing */}
        <div className="mt-8 p-4 rounded-2xl bg-[#f8fafc] border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-[#1b3280] shrink-0" />
            <span>
              Google Business Profile: <strong>{config.institutionName}</strong> • {config.location}
            </span>
          </div>

          <a
            href={config.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#14245c] hover:bg-[#1b3280] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
