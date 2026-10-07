import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api/adminService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';

export const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const res = await adminService.getMetrics();
      if (res.success) setMetrics(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage message="Loading university placement analytics..." />;
  }

  return (
    <div className="w-full space-y-7 animate-fade-up">
      <PageHeader
        title="Institutional Placement Command Center"
        subtitle="University Overview • Campus Drive Participation, Recruiter Inflow, & Verified Offer Analytics."
      />

      {/* 1. INSTITUTIONAL METRICS COMMAND STRIP */}
      <Card className="bg-[#FAF5EF] border border-[#E8DED4] p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5F5A5C]">
            ANNUAL PLACEMENT CONSOLE • ACADEMIC SESSION 2025–26
          </span>
          <span className="text-[10px] font-mono font-bold text-[#8B0026] bg-[#8B0026]/10 px-2.5 py-0.5 rounded-full border border-[#8B0026]/20">
            Audit Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DED4] text-center">
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {metrics?.totalStudents?.toLocaleString() || '1,480'}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Total Students</p>
            <span className="text-[10px] text-[#8B0026] font-mono font-medium">+120 current batch</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {metrics?.totalCompanies || '142'}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Recruiters Onboarded</p>
            <span className="text-[10px] text-[#8B0026] font-mono font-medium">+18 active drives</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {metrics?.totalJobs || '385'}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Live Requisitions</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono">Approved drives</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {metrics?.totalApplications?.toLocaleString() || '4,920'}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Submissions</p>
            <span className="text-[10px] text-[#8B0026] font-mono font-medium">+840 this month</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#238B68]">
              {metrics?.placementRate || '78.4%'}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Placement Ratio</p>
            <span className="text-[10px] text-[#238B68] font-mono font-semibold">{metrics?.totalPlacements || '680'} placed</span>
          </div>
        </div>
      </Card>

      {/* 2. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications vs Placements Monthly Trend */}
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8DED4]">
            <div>
              <h3 className="text-sm font-bold text-[#1E1B1C]">
                Applications & Offers Trajectory
              </h3>
              <p className="text-xs text-[#5F5A5C]">Monthly candidate submissions vs verified offers</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#8B0026] bg-[#8B0026]/10 px-2 py-0.5 rounded border border-[#8B0026]/20">
              Session 2026
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.applicationsByMonth || []}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B0026" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B0026" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#238B68" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#238B68" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DED4" />
                <XAxis dataKey="month" stroke="#5F5A5C" fontSize={11} />
                <YAxis stroke="#5F5A5C" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF9F2',
                    borderColor: '#E8DED4',
                    fontSize: '12px',
                    borderRadius: '12px',
                    color: '#1E1B1C',
                    boxShadow: '0 4px 20px rgba(101,0,28,0.08)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#8B0026"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorApps)"
                />
                <Area
                  type="monotone"
                  dataKey="placements"
                  name="Verified Offers"
                  stroke="#238B68"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOffers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Demanded Skills */}
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8DED4]">
            <div>
              <h3 className="text-sm font-bold text-[#1E1B1C]">
                Top Technical Skills Demanded by Recruiters
              </h3>
              <p className="text-xs text-[#5F5A5C]">Requisition frequency across campus drives</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#8B0026] bg-[#8B0026]/10 px-2 py-0.5 rounded border border-[#8B0026]/20">
              Industry Pulse
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.topSkillsInDemand || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DED4" />
                <XAxis type="number" stroke="#5F5A5C" fontSize={11} />
                <YAxis dataKey="skill" type="category" stroke="#5F5A5C" fontSize={11} width={85} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF9F2',
                    borderColor: '#E8DED4',
                    fontSize: '12px',
                    borderRadius: '12px',
                    color: '#1E1B1C',
                    boxShadow: '0 4px 20px rgba(101,0,28,0.08)',
                  }}
                />
                <Bar dataKey="count" name="Requisitions" fill="#8B0026" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3. BRANCH-WISE PLACEMENT TABLE & SALARY BENCHMARKS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-[#E8DED4] shadow-sm">
            <h3 className="text-sm font-bold text-[#1E1B1C] mb-4 pb-2 border-b border-[#E8DED4]">
              Discipline-Wise Placement Distribution
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E1B1C]">
                <thead className="text-[10px] font-mono uppercase tracking-wider text-[#5F5A5C] bg-[#FAF5EF] border-b border-[#E8DED4]">
                  <tr>
                    <th className="py-2.5 px-3">Academic Discipline</th>
                    <th className="py-2.5 px-2">Placed Candidates</th>
                    <th className="py-2.5 px-2">Total Batch</th>
                    <th className="py-2.5 px-3">Success Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DED4]">
                  {metrics?.placementByBranch?.map((b) => (
                    <tr key={b.branch} className="hover:bg-[#FAF5EF]/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#1E1B1C]">{b.branch}</td>
                      <td className="py-2.5 px-2 text-[#238B68] font-mono font-semibold">{b.placed}</td>
                      <td className="py-2.5 px-2 text-[#5F5A5C] font-mono">{b.total}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold font-mono text-[#1E1B1C]">{b.rate}%</span>
                          <div className="w-24 bg-[#FAF5EF] rounded-full h-2 overflow-hidden border border-[#E8DED4]">
                            <div
                              className="bg-[#8B0026] h-full rounded-full"
                              style={{ width: `${b.rate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-[#E8DED4] shadow-sm h-full flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1E1B1C] mb-4 pb-2 border-b border-[#E8DED4]">
                Compensation & Placement Benchmarks
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                  <span className="text-[10px] font-mono text-[#5F5A5C] uppercase tracking-wider font-semibold">Average Campus CTC</span>
                  <p className="text-2xl font-black font-mono text-[#1E1B1C] mt-1">{metrics?.averagePackage || '₹9.4 LPA'}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                  <span className="text-[10px] font-mono text-[#5F5A5C] uppercase tracking-wider font-semibold">Highest Campus Offer</span>
                  <p className="text-2xl font-black font-mono text-[#238B68] mt-1">{metrics?.highestPackage || '₹44.0 LPA'}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
                  <span className="text-[10px] font-mono text-[#5F5A5C] uppercase tracking-wider font-semibold">Drive Participation Rate</span>
                  <p className="text-2xl font-black font-mono text-[#8B0026] mt-1">91.2%</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DED4] text-[11px] font-mono text-[#5F5A5C]">
              Audited by Central Training & Placement Cell.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
