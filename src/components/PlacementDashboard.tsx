import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Building2,
  Sparkles,
  Users,
  CheckCircle,
  Download,
  Filter,
  BarChart3,
  Percent,
} from 'lucide-react';
import { PlacementTrendMonth, CategoryPlacementStat } from '../types';

interface PlacementDashboardProps {
  trendData: PlacementTrendMonth[];
  categoryStats: CategoryPlacementStat[];
}

export const PlacementDashboard: React.FC<PlacementDashboardProps> = ({
  trendData,
  categoryStats,
}) => {
  const [activeMetric, setActiveMetric] = useState<'both' | 'placed' | 'growth'>('both');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const hospitalDistribution = [
    { name: 'Apollo Multispeciality', value: 142, color: '#1b3280' },
    { name: 'Fortis Healthcare', value: 118, color: '#16a34a' },
    { name: 'Medica Superspecialty', value: 95, color: '#0284c7' },
    { name: 'Suraksha Diagnostics', value: 88, color: '#d97706' },
    { name: 'Woodlands & Peerless', value: 72, color: '#6366f1' },
  ];

  // Custom tooltips without any monetary figures
  const CustomTrendsTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#14245c] text-white p-3 rounded-xl border border-blue-400/40 shadow-xl text-xs space-y-1">
          <p className="font-extrabold text-amber-300 font-['Outfit']">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-bold text-white">
                {entry.name.includes('Growth') ? `${entry.value} Index Pts` : `${entry.value} Students`}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomCategoryTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#14245c] text-white p-3 rounded-xl border border-blue-400/40 shadow-xl text-xs space-y-1">
          <p className="font-extrabold text-amber-300 font-['Outfit']">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="font-medium text-blue-200">{entry.name}:</span>
              <span className="font-bold text-white">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="dashboard" className="py-12 bg-[#f8fafc] border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#14245c] text-xs font-bold mb-2 border border-blue-200">
              <TrendingUp className="w-3.5 h-3.5 text-[#1b3280]" />
              <span>OFFICIAL INSTITUTIONAL ANALYTICS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14245c] font-['Outfit']">
              12-Month Placement Trends &amp; Category Success Rates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Live interactive data showing placement volumes, professional growth ratings, and
              accreditation-backed hiring rates across all CIHM healthcare programs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-[#14245c] flex items-center gap-1.5 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>NABL &amp; AERB Audited Records</span>
            </div>
          </div>
        </div>

        {/* High-Level KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Placed (12 Mo)
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1b3280] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#14245c] font-['Outfit']">
                515+
              </span>
              <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                ↑ 14.8% growth vs last cycle
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Overall Success Rate
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-['Outfit']">
                98.4%
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                Across all paramedical &amp; imaging cohorts
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Career Growth Index
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#14245c] font-['Outfit']">
                Tier-1
              </span>
              <span className="text-[11px] text-amber-700 font-bold block mt-0.5">
                Super-Specialty Hospital Grade
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Partner Hospitals
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#14245c] font-['Outfit']">
                35+
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                Apollo, Fortis, Medica, Suraksha
              </span>
            </div>
          </div>
        </div>

        {/* Main Charts Grid: 12-Month Trends & Category Success Rates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* 12-Month Trend AreaChart (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-[#14245c] font-['Outfit'] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#1b3280]" />
                  <span>12-Month Placement Trajectory &amp; Career Trajectory Index</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Monthly students placed alongside Career Growth Index ratings across the academic year.
                </p>
              </div>

              {/* Metric Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveMetric('both')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeMetric === 'both'
                      ? 'bg-[#14245c] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Both
                </button>
                <button
                  onClick={() => setActiveMetric('placed')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeMetric === 'placed'
                      ? 'bg-[#14245c] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Volume
                </button>
                <button
                  onClick={() => setActiveMetric('growth')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeMetric === 'growth'
                      ? 'bg-[#14245c] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Growth Rating
                </button>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1b3280" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1b3280" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                  <Tooltip content={<CustomTrendsTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                  {(activeMetric === 'both' || activeMetric === 'placed') && (
                    <Area
                      type="monotone"
                      dataKey="totalPlaced"
                      name="Students Placed"
                      stroke="#1b3280"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorPlaced)"
                    />
                  )}

                  {(activeMetric === 'both' || activeMetric === 'growth') && (
                    <Area
                      type="monotone"
                      dataKey="avgSalaryLPA"
                      name="Career Growth Index"
                      stroke="#16a34a"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorGrowth)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hospital Recruiter Distribution PieChart (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#14245c] font-['Outfit']">
                Recruiter Deployment Share
              </h3>
              <p className="text-xs text-slate-500">
                Graduates absorbed across major health systems.
              </p>
            </div>

            <div className="h-56 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hospitalDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {hospitalDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Placed`, name]}
                    contentStyle={{
                      backgroundColor: '#14245c',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {hospitalDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#14245c]">{item.value} Placed</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Success Rates Detailed Cards */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-4">
            <div>
              <h3 className="font-bold text-base text-[#14245c] font-['Outfit']">
                Placement Success Rate by Healthcare Discipline
              </h3>
              <p className="text-xs text-slate-500">
                Percentage of batch successfully securing roles in clinical laboratories, hospital
                imaging, and management.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            {categoryStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between space-y-3 hover:border-blue-400 transition-colors"
              >
                <div>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white mb-2"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.category}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#14245c] font-['Outfit']">
                      {stat.placementRate}%
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">Success</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {stat.placedStudents} of {stat.totalGraduates} Graduates Placed
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                    <span>Clinical Tier</span>
                    <span className="font-bold text-[#14245c]">{stat.averagePackageLPA}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Top Recruiter: {stat.topRecruiters[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
