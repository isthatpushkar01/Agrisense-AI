import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Sprout, PieChart, 
  Download, Calendar, Filter, Sparkles, Award, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, LineChart, Line, AreaChart, Area, Legend 
} from 'recharts';

export const AnalyticsReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('2026 Kharif Season');

  const revenueVsExpenseData = [
    { month: 'Mar', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Apr', revenue: 62000, expenses: 38000, profit: 24000 },
    { month: 'May', revenue: 110000, expenses: 45000, profit: 65000 },
    { month: 'Jun', revenue: 85000, expenses: 40000, profit: 45000 },
    { month: 'Jul', revenue: 145000, expenses: 52000, profit: 93000 },
    { month: 'Aug (Est)', revenue: 198000, expenses: 48000, profit: 150000 },
  ];

  const cropYieldData = [
    { crop: 'Basmati Rice', areaAcres: 12, yieldQtl: 280, revenueRs: 249200 },
    { crop: 'Sharbati Wheat', areaAcres: 8, yieldQtl: 160, revenueRs: 424000 },
    { crop: 'Mustard Seeds', areaAcres: 4, yieldQtl: 48, revenueRs: 271200 },
  ];

  const nationalAgriIndex = [
    { day: 'Mon', index: 1420, aiTrend: 1425 },
    { day: 'Tue', index: 1445, aiTrend: 1450 },
    { day: 'Wed', index: 1430, aiTrend: 1460 },
    { day: 'Thu', index: 1480, aiTrend: 1490 },
    { day: 'Fri', index: 1510, aiTrend: 1520 },
    { day: 'Sat', index: 1540, aiTrend: 1560 },
    { day: 'Sun', index: 1585, aiTrend: 1610 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Agri-Financial Intelligence & Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Farm Performance & Financial Reports
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Deep dive into seasonal profitability, crop yield efficiency, input costs vs revenue, and national commodity index benchmarks.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="2026 Kharif Season">2026 Kharif Season (Active)</option>
              <option value="2025-26 Annual Financial Year">2025-26 Annual Financial Year</option>
              <option value="All Time History">All Time History</option>
            </select>

            <button
              onClick={() => alert('Exported comprehensive PDF / Excel Financial Report to Kisan account!')}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF / Excel</span>
            </button>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <p className="text-xs font-bold uppercase text-slate-400">Total Revenue (Kharif)</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-1">₹6,45,000</h3>
            <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +24.5% vs last season
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <p className="text-xs font-bold uppercase text-slate-400">Total Input Expenses</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-1">₹2,55,000</h3>
            <p className="text-xs font-bold text-blue-600 mt-2">
              Fertilizers, seeds & diesel
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <p className="text-xs font-bold uppercase text-slate-400">Net Profit Margin</p>
            <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">₹3,90,000</h3>
            <p className="text-xs font-bold text-emerald-600 mt-2">
              60.4% Profitability Rate
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <p className="text-xs font-bold uppercase text-slate-400">Yield Efficiency Score</p>
            <h3 className="text-3xl font-black text-amber-500 mt-1">94.8 / 100</h3>
            <p className="text-xs font-bold text-slate-500 mt-2">
              Top 5% in Punjab district
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue vs Expenses Bar Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Cashflow Analysis</span>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Revenue vs Input Expenses (₹)</h3>
              </div>
              <div className="flex items-center space-x-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Revenue</span>
                <span className="flex items-center gap-1.5 text-rose-500"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Expenses</span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueVsExpenseData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Amount']}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} name="Revenue" />
                  <Bar dataKey="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Area & Yield Breakdown (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Land Allocation</span>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Crop Yield Breakdown</h3>
              <p className="text-xs text-slate-500 mt-1">Total 24 Acres Cultivated</p>
            </div>

            <div className="space-y-4">
              {cropYieldData.map((cy, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between font-black text-sm">
                    <span className="text-slate-800 dark:text-slate-100">{cy.crop}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">₹{cy.revenueRs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Area: {cy.areaAcres} Acres</span>
                    <span>Total Yield: {cy.yieldQtl} Qtl</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(cy.areaAcres / 24) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                AI recommends expanding Basmati acreage by +4 Acres next Kharif to maximize export revenues.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
