import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle2,
  GraduationCap,
  Building,
  Pause,
  Play,
} from 'lucide-react';
import { HeaderSlide } from '../types';

interface HeaderSliderProps {
  slides: HeaderSlide[];
  onNavigate: (section: string) => void;
  onOpenLaunchCourse: () => void;
}

export const HeaderSlider: React.FC<HeaderSliderProps> = ({
  slides,
  onNavigate,
  onOpenLaunchCourse,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const slide = slides[currentSlide];

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0c163b]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sliding Images Container with 100% UNCOVERED, RAW, NATURAL College Photos (NO Color Cover At All!) */}
      <div className="relative h-[520px] sm:h-[580px] md:h-[640px] w-full">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Realistic College & Clinical Campus Image - 100% UNCOVERED, NO COLOR OVERLAY */}
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center scale-100 transition-transform duration-7000 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Slide Content Layer - Text directly visible with high-contrast text-shadow, NO color covering the image */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <div className="max-w-2xl space-y-4 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 text-[#14245c] text-xs sm:text-sm font-black shadow-lg">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{slide.badge}</span>
            </div>

            {/* Title with Outfit display font */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-white leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-white max-w-xl font-semibold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {slide.subtitle}
            </p>

            {/* Tagline highlight */}
            <div className="inline-block py-1.5 px-3.5 rounded-xl bg-black/60 border border-white/30 text-xs sm:text-sm text-amber-300 font-bold backdrop-blur-xs">
              ★ {slide.tagline}
            </div>

            {/* CTA Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate(slide.targetSection)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#14245c] font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLaunchCourse}
                className="px-4 py-2.5 rounded-xl bg-[#14245c] hover:bg-[#1b3280] border border-blue-400/50 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Launch New Course 2026</span>
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/40 text-blue-100 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span>Placement Trends</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-[#14245c]/85 hover:bg-[#1b3280] border border-white/30 text-white transition-all active:scale-90 shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-[#14245c]/85 hover:bg-[#1b3280] border border-white/30 text-white transition-all active:scale-90 shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Slide Indicators & Pause/Play Control */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-amber-400 shadow-md'
                  : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
            />
          ))}

          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Play slide rotation' : 'Pause slide rotation'}
            className="ml-3 p-1.5 rounded-full bg-[#14245c]/80 text-blue-200 hover:text-white border border-blue-400/40"
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Quick Trust Highlights Ribbon directly below Header Carousel */}
      <div className="bg-[#0c163b] border-t border-blue-900/80 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-blue-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">East India Authorised Center: CIHM DumDum Kolkata</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Collaborating with Virtued Eduversity (London, UK)</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-300" />
            <span className="font-semibold">100% Placement Record with Apollo, Fortis &amp; Medica</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <span>Helpline: 9073737888 / 9073737444</span>
          </div>
        </div>
      </div>
    </div>
  );
};
