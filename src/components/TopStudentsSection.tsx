import React from 'react';
import { Award, Star, Medal, Sparkles, Share2, Quote, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TopStudent } from '../types';

interface TopStudentsSectionProps {
  topStudents: TopStudent[];
  onShareStudentAchievement: (student: TopStudent) => void;
}

export const TopStudentsSection: React.FC<TopStudentsSectionProps> = ({
  topStudents,
  onShareStudentAchievement,
}) => {
  const triggerCelebration = (student: TopStudent) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0891b2', '#f59e0b', '#10b981'],
    });
    onShareStudentAchievement(student);
  };

  return (
    <section id="toppers" className="py-12 bg-gradient-to-b from-[#14245c] to-[#1b3280] text-white border-b border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/50 text-xs font-bold mb-2">
              <Medal className="w-3.5 h-3.5 text-amber-400" />
              <span>CIHM HALL OF FAME &amp; ACADEMIC TOPPERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Celebrating Outstanding Student Achievements
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
              Honoring our gold medalists, state board toppers, and clinical performers who have set
              benchmarks of excellence in healthcare diagnostics.
            </p>
          </div>
        </div>

        {/* Top Students Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topStudents.map((student) => (
            <div
              key={student.id}
              className="bg-[#0f1f4b] rounded-2xl border border-blue-500/40 p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Photo with Badge */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-3 border-amber-400 shadow-lg bg-[#14245c]">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-[#14245c] font-black text-[10px] whitespace-nowrap shadow uppercase tracking-wider">
                    {student.score}
                  </div>
                </div>

                {/* Name & Badge */}
                <div className="text-center pt-2">
                  <h3 className="font-extrabold text-base text-white font-['Outfit']">
                    {student.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-blue-200 mt-0.5">
                    {student.course}
                  </p>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md text-[10px] font-bold">
                    ★ {student.badge}
                  </span>
                </div>

                {/* Achievement Highlight */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#14245c] border border-blue-700/60 text-xs text-blue-100 space-y-1.5">
                  <p className="text-[11px] leading-relaxed line-clamp-3">
                    {student.achievement}
                  </p>
                  <div className="pt-1.5 border-t border-blue-800 text-[10px] text-amber-300 font-semibold truncate">
                    Currently: {student.currentPosition}
                  </div>
                </div>
              </div>

              {/* Share Certificate / Achievement Button */}
              <button
                id={`share-student-${student.id}`}
                onClick={() => triggerCelebration(student)}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#14245c] font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Achievement Card</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
