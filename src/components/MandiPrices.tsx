import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Sparkles, Calendar, 
  MapPin, Filter, ArrowUpRight, ArrowDownRight, RefreshCw, BarChart2 
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend, AreaChart, Area 
} from 'recharts';
import { MandiPrice } from '../types';
import { MOCK_MANDI_PRICES } from '../data/mockData';

export const MandiPrices: React.FC = () => {
  const [mandis, setMandis] = useState<MandiPrice[]>(MOCK_MANDI_PRICES);
  const [selectedMandi, setSelectedMandi] = useState<MandiPrice>(MOCK_MANDI_PRICES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const commodities = ['All', 'Basmati Rice', 'Wheat', 'Yellow Soybean', 'Alphonso Mango', 'Cumin Seed'];

  const filteredMandis = mandis.filter((m) => {
    const matchesSearch = m.mandiName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComm = selectedCommodity === 'All' || m.commodity.toLowerCase().includes(selectedCommodity.toLowerCase());
    return matchesSearch && matchesComm;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate real-time price fluctuation
      const updated = mandis.map(m => ({
        ...m,
        modalPrice: Math.round(m.modalPrice * (1 + (Math.random() * 0.02 - 0.008))),
        lastUpdated: 'Just now'
      }));
      setMandis(updated);
      const newSelected = updated.find(u => u.id === selectedMandi.id) || updated[0];
      setSelectedMandi(newSelected);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Smart Mandi Intelligence • National APMC Network</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Live Mandi Prices & AI Commodity Forecasting
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Compare real-time wholesale modal prices across India. Our AI model forecasts 7-day price curves and calculates optimal selling windows.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing AGMARKNET...' : 'Refresh Live Mandi Feed'}</span>
          </button>
        </div>

        {/* Selected Commodity Highlight Card & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart & AI Forecast Box (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{selectedMandi.state} APMC Wholesale</span>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span>{selectedMandi.mandiName}</span>
                </h2>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Commodity: {selectedMandi.commodity}
                </p>
              </div>

              <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Current Modal Rate</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-100">₹{selectedMandi.modalPrice} <span className="text-xs text-slate-500 font-normal">/ Qtl</span></p>
                </div>
                <div className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-black ${
                  selectedMandi.changePercent >= 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {selectedMandi.changePercent >= 0 ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                  <span>{selectedMandi.changePercent}%</span>
                </div>
              </div>
            </div>

            {/* AI Selling Recommendation Banner */}
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl shadow-xs">
                  <Sparkles className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">AI Selling Window Advice</p>
                  <p className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {selectedMandi.bestSellingTime}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white dark:bg-slate-800 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs self-start sm:self-center">
                Demand: <strong className="text-emerald-600">{selectedMandi.demandTrend}</strong>
              </span>
            </div>

            {/* Price Trend Recharts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-emerald-600" /> Historical Trend & 7-Day AI Price Forecast
                </h3>
                <div className="flex items-center space-x-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Actual Mandi Price
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block border border-dashed border-white" /> AI Forecast
                  </span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedMandi.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [`₹${val}/Qtl`, 'Price']}
                    />
                    <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" name="Actual Price" />
                    <Area type="monotone" dataKey="aiForecast" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorAi)" name="AI Forecast" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Min vs Max Range */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Min Price (Low Quality)</p>
                <p className="text-base font-black text-slate-800 dark:text-slate-200 mt-0.5">₹{selectedMandi.minPrice}/Qtl</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Max Price (Grade A+)</p>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₹{selectedMandi.maxPrice}/Qtl</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl col-span-2 sm:col-span-1">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Last Updated</p>
                <p className="text-base font-black text-slate-800 dark:text-slate-200 mt-0.5">{selectedMandi.lastUpdated}</p>
              </div>
            </div>

          </div>

          {/* Mandi Selection Feed (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Search & Commodity Filter */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <input
                type="text"
                placeholder="Search mandi by city or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex flex-wrap gap-1.5">
                {commodities.map((comm) => (
                  <button
                    key={comm}
                    onClick={() => setSelectedCommodity(comm)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      selectedCommodity === comm
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {comm.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Mandis */}
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1 no-scrollbar">
              {filteredMandis.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMandi(m)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedMandi.id === m.id
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{m.state}</span>
                      <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{m.mandiName}</h4>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{m.commodity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100">₹{m.modalPrice}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-block mt-1 ${
                        m.changePercent >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {m.changePercent >= 0 ? `+${m.changePercent}%` : `${m.changePercent}%`}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-medium text-slate-500">
                    <span>Demand: <strong className="text-slate-700 dark:text-slate-300">{m.demandTrend}</strong></span>
                    <span>Updated {m.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
