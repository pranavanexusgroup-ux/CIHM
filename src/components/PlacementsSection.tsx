import React, { useState } from 'react';
import {
  Award,
  Building2,
  CheckCircle,
  Search,
  Share2,
  TrendingUp,
  MapPin,
  Briefcase,
  Star,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import { PlacementRecord } from '../types';

interface PlacementsSectionProps {
  placements: PlacementRecord[];
  onSharePlacement: (record: PlacementRecord) => void;
}

export const PlacementsSection: React.FC<PlacementsSectionProps> = ({
  placements,
  onSharePlacement,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const hospitalsList = [
    { name: 'Apollo Multispeciality Hospitals', tag: 'Super-Specialty', placed: '45+ Placed' },
    { name: 'Fortis Healthcare', tag: 'Super-Specialty', placed: '38+ Placed' },
    { name: 'Medica Superspecialty', tag: 'Super-Specialty', placed: '52+ Placed' },
    { name: 'Suraksha Diagnostics', tag: 'Diagnostic Chain', placed: '70+ Placed' },
    { name: 'Dr. Lal PathLabs', tag: 'Diagnostic Chain', placed: '35+ Placed' },
    { name: 'Woodlands Multispeciality', tag: 'Super-Specialty', placed: '28+ Placed' },
    { name: 'Peerless Hospital', tag: 'Super-Specialty', placed: '30+ Placed' },
    { name: 'AMRI Hospitals', tag: 'Super-Specialty', placed: '40+ Placed' },
  ];

  const filteredRecords = placements.filter((p) => {
    const matchesFilter =
      filterType === 'All' ||
      (filterType === 'Hospitals' && p.hospitalType.includes('Hospital')) ||
      (filterType === 'Diagnostics' && p.hospitalType.includes('Diagnostic'));

    const matchesSearch =
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.course.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="placements" className="py-12 bg-white border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>100% PLACEMENT ASSISTANCE RECORD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14245c] font-['Outfit']">
            Our Students Secure Roles at Top-Tier Hospitals &amp; Diagnostics
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            From premier super-specialty hospitals like Apollo, Fortis, and Medica to India’s
            largest diagnostic chains, CIHM graduates thrive in high-demand healthcare careers.
          </p>
        </div>

        {/* Hospital Partner Badges Grid */}
        <div className="mb-10 bg-[#f8fafc] border border-blue-200/80 rounded-3xl p-6 shadow-xs">
          <h4 className="text-xs font-bold text-[#1b3280] uppercase tracking-wider mb-4 text-center">
            Recognized Clinical Recruitment Partners
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {hospitalsList.map((hosp, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-2xl border border-blue-100 hover:border-blue-400 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-[#1b3280] shrink-0 mt-0.5" />
                  <span className="font-bold text-xs text-[#14245c] leading-tight">
                    {hosp.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-blue-50 text-[10px]">
                  <span className="text-slate-500 font-medium">{hosp.tag}</span>
                  <span className="font-extrabold text-[#1b3280] bg-blue-50 px-1.5 py-0.5 rounded">
                    {hosp.placed}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['All', 'Hospitals', 'Diagnostics'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterType === type
                    ? 'bg-[#14245c] text-white shadow-xs'
                    : 'bg-blue-50 text-[#1b3280] hover:bg-blue-100 border border-blue-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#1b3280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, hospital, role..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
            />
          </div>
        </div>

        {/* Verified Placement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:border-blue-400"
            >
              {/* Header with realistic student portrait */}
              <div className="flex items-start gap-3.5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-blue-500/40 shrink-0 shadow-xs">
                  <img
                    src={record.photo}
                    alt={record.studentName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {record.verified && (
                    <div
                      className="absolute bottom-0 right-0 bg-[#14245c] text-amber-300 p-0.5 rounded-tl-md"
                      title="Verified Placement"
                    >
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#14245c] truncate font-['Outfit']">
                      {record.studentName}
                    </h3>
                    <span className="text-[11px] font-extrabold text-[#1b3280] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {record.packageLPA}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1b3280] font-semibold truncate mt-0.5">
                    {record.role}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">{record.rollNo}</p>
                </div>
              </div>

              {/* Hospital & Location pill */}
              <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-[#14245c] font-bold">
                  <Building2 className="w-3.5 h-3.5 text-[#1b3280] shrink-0" />
                  <span className="truncate">{record.hospital}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#1b3280]" />
                    {record.location}
                  </span>
                  <span className="font-medium text-[#1b3280]">Batch {record.year}</span>
                </div>
              </div>

              {/* Real Student Quote */}
              <div className="relative text-xs text-slate-600 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                <Quote className="w-3.5 h-3.5 text-amber-500 absolute -top-1.5 -left-1.5 fill-amber-300" />
                <p className="line-clamp-2 pl-2 text-[11px] leading-relaxed">"{record.quote}"</p>
              </div>

              {/* Card Footer & 1-Click Share Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  {record.hospitalType}
                </span>

                <button
                  id={`share-placement-${record.id}`}
                  onClick={() => onSharePlacement(record)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#073947] font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Success</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
