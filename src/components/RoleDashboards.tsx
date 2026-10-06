import React, { useState } from 'react';
import { 
  ShieldAlert, Users, Award, CheckCircle2, Clock, Landmark, 
  Banknote, Warehouse as WhIcon, Truck, Activity, Sparkles, 
  Search, Filter, ArrowRight, DollarSign, RefreshCw, FileText, BarChart3,
  Sprout, CloudRain, Cpu, TrendingUp, PhoneCall, Radio, Zap, MapPin, Send, AlertTriangle, ChevronRight, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserRole } from '../types';

interface RoleDashboardsProps {
  currentRole: UserRole;
}

export const RoleDashboards: React.FC<RoleDashboardsProps> = ({ currentRole }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingLoans, setPendingLoans] = useState([
    { id: 'ln-101', farmer: 'Sardar Harpreet Singh', district: 'Ludhiana, Punjab', amountRs: 450000, scheme: 'Kisan Credit Card Tier-1', cibil: 760, status: 'Pending Verification' },
    { id: 'ln-102', farmer: 'Ram Khelawan Yadav', district: 'Patna, Bihar', amountRs: 180000, scheme: 'PM-KISAN Micro Loan', cibil: 710, status: 'Pending Verification' },
    { id: 'ln-103', farmer: 'M. Subba Rao', district: 'Guntur, Andhra Pradesh', amountRs: 850000, scheme: 'Agri-Drone Mechanization Loan', cibil: 790, status: 'Pending Verification' },
  ]);

  const [pendingSchemes, setPendingSchemes] = useState([
    { id: 'sch-201', farmer: 'Sukhwinder Kaur', schemeName: 'PKVY Organic Farming Grant', subsidyRs: 50000, aadhaarKYC: 'Verified', status: 'Pending Dept Sanction' },
    { id: 'sch-202', farmer: 'Balaji Deshmukh', schemeName: 'PMFBY Kharif Crop Shield', subsidyRs: 38000, aadhaarKYC: 'Verified', status: 'Pending Dept Sanction' },
  ]);

  const handleApproveLoan = (id: string) => {
    setPendingLoans(pendingLoans.map(l => l.id === id ? { ...l, status: 'SANCTIONED (DBT INITIATED)' } : l));
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  const handleSanctionScheme = (id: string) => {
    setPendingSchemes(pendingSchemes.map(s => s.id === id ? { ...s, status: 'SANCTIONED (DBT INITIATED)' } : s));
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  // 0. Farmer (Kisan) Bento Grid Dashboard
  if (currentRole === 'Farmer' || currentRole === 'farmer') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="uppercase tracking-tighter">Active Node: Haryana West (Karnal Cluster #04)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span>Farmer Intelligence Dashboard</span>
                <span className="text-2xl">🌾</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Real-time crop advisory, mandi prices, satellite weather alerts, and AI diagnostic tools.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => confetti({ particleCount: 60, spread: 50 })}
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sync Satellite IoT</span>
              </button>
            </div>
          </div>

          {/* 6-Card Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Hero Crop Doctor (2 Cols, 2 Rows) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-all" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-2xl border border-white/30 text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Gemini 2.5 Live Assistant
                  </span>
                  <span className="text-xs bg-emerald-900/60 px-2.5 py-1 rounded-full text-emerald-200 border border-emerald-500/30">
                    Hindi | Punjabi | English
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black mt-4">AI Crop Doctor & Voice Diagnostic</h2>
                <p className="text-emerald-100 text-sm mt-2 leading-relaxed">
                  Scan infected leaves with camera or speak your crop symptoms for immediate treatment recommendations, NPK soil dosage, and pest forecasts.
                </p>

                <div className="mt-6 bg-emerald-950/50 backdrop-blur border border-emerald-400/30 rounded-2xl p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">AI</div>
                    <div>
                      <p className="text-xs font-bold text-amber-300">Recent Advisory for Wheat (Kharif cycle):</p>
                      <p className="text-xs text-white mt-1 leading-relaxed font-normal">
                        "High humidity detected in Karnal cluster. Early signs of Yellow Rust probable. Recommend prophylactic foliar spray of Propiconazole 25 EC @ 1 ml/litre within 48 hours."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => confetti({ particleCount: 50, spread: 40 })}
                    className="px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Cpu className="w-4 h-4 text-emerald-600" />
                    <span>Launch Leaf Scanner</span>
                  </button>
                  <button 
                    onClick={() => alert("Connecting to Kisan Call Centre (1800-180-1551)...")}
                    className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-300" />
                    <span>Voice Consult (1800-180-1551)</span>
                  </button>
                </div>
                <span className="text-[11px] font-semibold text-emerald-200">97.4% accuracy verified</span>
              </div>
            </div>

            {/* Card 2: Live Mandi Rates (1 Col) */}
            <div className="col-span-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-2.5 py-1 rounded-full">AGMARKNET Live</span>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mt-3">Live Mandi Prices</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">APMC Karnal & Delhi Azadpur</p>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Wheat (Sharbati)</span>
                      <p className="text-[10px] text-slate-500">Karnal Mandi</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">₹2,450 / qtl</span>
                      <p className="text-[10px] font-bold text-emerald-600">+3.2% ⬆</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Mustard Seed</span>
                      <p className="text-[10px] text-slate-500">Hisar Mandi</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">₹5,800 / qtl</span>
                      <p className="text-[10px] font-bold text-emerald-600">+1.8% ⬆</p>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => alert("Loading 4,500+ National Mandi Live Feeds...")}
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View 4,500+ Mandi Feeds</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Weather & Satellite Alert (1 Col) */}
            <div className="col-span-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-1 rounded-full">Satellite Radar</span>
                  <CloudRain className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mt-3">7-Day Weather Forecast</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">IMD Agro-Met Station #104</p>

                <div className="mt-4 p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-amber-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-800 dark:text-slate-100">28°C</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/40 px-2 py-1 rounded">Partly Cloudy</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-2">
                    ⚠️ <strong className="text-rose-600 dark:text-rose-400">Rain Alert:</strong> Light showers expected within 48 hrs. Postpone pesticide spraying until Thursday.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                <span>Soil Moisture: 42% (Optimal)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Card 4: Govt Schemes & Micro Loans (1 Col) */}
            <div className="col-span-1 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2.5 py-1 rounded-full">DBT Subsidies</span>
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mt-3">Govt Schemes & Loans</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PM-KISAN & KCC Active Status</p>

                <div className="mt-4 p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-purple-100 dark:border-purple-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">PM-KISAN 17th Installment</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">₹2,000 Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Aadhaar e-KYC verified. Direct Bank Transfer scheduled for 28th inst.</p>
                </div>
              </div>
              <button 
                onClick={() => alert("Opening KCC Micro-Loan 3% Subvention application portal...")}
                className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply for KCC Loan (3% Subsidy)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 5: Nearby Silos & Warehouses (1 Col) */}
            <div className="col-span-1 bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">WDRA Verified</span>
                  <WhIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-black text-white mt-3">Nearby Silos & Storage</h3>
                <p className="text-xs text-slate-400 mt-1">Secure grain storage & e-NWR loans</p>

                <div className="mt-4 p-3 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">National Agri-Silo #09</span>
                    <span className="text-[10px] font-bold text-amber-400">12.4 km away</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Available Capacity: 450 MT | Humidity controlled cold chain.</p>
                </div>
              </div>
              <button 
                onClick={() => alert("Connecting to WDRA e-NWR Silo Booking portal...")}
                className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book Storage Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0b. Buyer / Wholesale Trader Bento Grid Dashboard
  if (currentRole === 'Buyer' || currentRole === 'buyer') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-950/80 px-3 py-1 rounded-full text-xs font-bold text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="uppercase tracking-tighter">Verified APMC Wholesale Trader • Mandi License #DL-4482</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span>Buyer & Institutional Procurement Desk</span>
                <span className="text-2xl">🏪</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Direct-from-farm procurement, AI price prediction, AGMARKNET quality escrow, and silo logistics.
              </p>
            </div>
            <button 
              onClick={() => confetti({ particleCount: 60, spread: 50 })}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Refresh Mandi Feeds</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              <div>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-300">
                  ⚡ AI Price Discovery & Demand Forecast
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-4">Direct Farm-Gate Procurement Hub</h2>
                <p className="text-blue-100 text-sm mt-2 leading-relaxed">
                  Eliminate middlemen margins by procuring certified Grade-A crops directly from verified Kisan Producer Organizations (FPOs) with escrow payment guarantees.
                </p>
                <div className="mt-6 bg-blue-950/60 border border-blue-400/30 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-blue-200">Wheat Sharbati (Karnal FPO #12)</span>
                    <span className="text-emerald-300 font-black">500 MT Available @ ₹2,420/qtl</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold border-t border-blue-800/60 pt-3">
                    <span className="text-blue-200">Basmati Rice 1121 (Amritsar FPO #04)</span>
                    <span className="text-emerald-300 font-black">1,200 MT Available @ ₹8,100/qtl</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                <button 
                  onClick={() => alert("Initiating Smart Escrow contract with Kisan Producer Organization...")}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow transition-all cursor-pointer"
                >
                  Initiate Smart Escrow Purchase
                </button>
                <span className="text-xs text-blue-200 font-bold">AGMARKNET Certified</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">Escrow Balance</span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-3">₹45.80 Lakhs</h3>
                <p className="text-xs text-slate-500 mt-1">Locked in active procurement smart contracts</p>
              </div>
              <button className="mt-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all">
                Add Escrow Funds
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-1 rounded-full">Quality Certificates</span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-3">100% Verified</h3>
                <p className="text-xs text-slate-500 mt-1">AI computer vision grain assaying reports</p>
              </div>
              <button className="mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition-all">
                Download Lab Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0c. Insurance Company Bento Grid Dashboard
  if (currentRole === 'Insurance Company' || currentRole === 'insurance_company') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-950/80 px-3 py-1 rounded-full text-xs font-bold text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="uppercase tracking-tighter">PMFBY Crop Insurance Telemetry Node</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span>AI Crop Insurance & Claims Automated Desk</span>
                <span className="text-2xl">🛡️</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Satellite NDVI drought indices, flood radar verification, and instant Direct Benefit Transfer (DBT) claim settlement.
              </p>
            </div>
            <button 
              onClick={() => confetti({ particleCount: 60, spread: 50 })}
              className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Run Satellite Audit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-rose-700 to-red-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              <div>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-300">
                  🛰️ Satellite NDVI & Synthetic Aperture Radar
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-4">Automated PMFBY Claim Settlement Engine</h2>
                <p className="text-rose-100 text-sm mt-2 leading-relaxed">
                  Analyze crop loss severity using automated ESA Sentinel-2 NDVI satellite imagery and weather station data. Zero manual surveying required for payouts under ₹50,000.
                </p>
                <div className="mt-6 bg-rose-950/60 border border-rose-400/30 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-rose-200">Claim #PMFBY-9921 (Sardar Harpreet Singh - Wheat)</span>
                    <span className="text-emerald-300 font-black">Verified Loss: 42% (Hailstorm)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold border-t border-rose-800/60 pt-3">
                    <span className="text-rose-200">Recommended Payout Amount:</span>
                    <span className="text-amber-300 font-black text-sm">₹38,500 via Aadhaar DBT</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                <button 
                  onClick={() => {
                    confetti({ particleCount: 80, spread: 60 });
                    alert("Sanctioned ₹38,500 claim via Aadhaar Direct Bank Transfer!");
                  }}
                  className="px-5 py-2.5 bg-white text-rose-900 hover:bg-rose-50 font-black text-xs rounded-xl shadow transition-all cursor-pointer"
                >
                  Approve Automated DBT Payout
                </button>
                <span className="text-xs text-rose-200 font-bold">Smart Contract Verified</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full">Pending Verification</span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-3">142 Claims</h3>
                <p className="text-xs text-slate-500 mt-1">Awaiting drone telemetry confirmation</p>
              </div>
              <button className="mt-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all">
                Review Queue
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">Total Payouts (FY26)</span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-3">₹14.20 Crores</h3>
                <p className="text-xs text-slate-500 mt-1">Disbursed to 3,850 insured farmers</p>
              </div>
              <button className="mt-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all">
                Download Audit Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 1. Government Officer Dashboard
  if (currentRole === 'Govt Officer' || currentRole === 'government_officer') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full text-xs font-bold text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ministry of Agriculture & Farmers Welfare • AGMARKNET Admin</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
                Government Officer Portal & District Surveillance
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Monitor district crop health telemetry, sanction PM-KISAN subsidy releases, and oversee mandi APMC compliance.
              </p>
            </div>
          </div>

          {/* Govt Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Total DBT Subsidies Disbursed</p>
              <h3 className="text-3xl font-black text-purple-600 mt-1">₹48.2 Crores</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">Over 1,42,000 District Farmers Benefited</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">District Pest Outbreaks</p>
              <h3 className="text-3xl font-black text-rose-600 mt-1">2 Active Alerts</h3>
              <p className="text-xs font-bold text-rose-600 mt-2">Yellow Rust in Ludhiana Tehsil</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">APMC Mandi Escrow Compliance</p>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">99.4%</h3>
              <p className="text-xs font-bold text-slate-500 mt-2">Zero price manipulation detected</p>
            </div>
          </div>

          {/* Pending Scheme Applications Table */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-purple-600" /> Pending Subsidy Applications for Sanction
            </h3>

            <div className="space-y-3">
              {pendingSchemes.map((s) => (
                <div key={s.id} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-600">{s.schemeName}</span>
                    <h4 className="text-base font-black text-slate-800 dark:text-slate-100 mt-0.5">{s.farmer}</h4>
                    <p className="text-xs text-slate-500 mt-1">KYC: {s.aadhaarKYC} • Subsidy Claim: <span className="font-bold text-emerald-600">₹{s.subsidyRs.toLocaleString('en-IN')}</span></p>
                  </div>

                  {s.status.includes('SANCTIONED') ? (
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                      <CheckCircle2 className="w-4 h-4" /> {s.status}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSanctionScheme(s.id)}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md self-start sm:self-auto transition-all"
                    >
                      Sanction Fund via DBT
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Bank Officer Dashboard
  if (currentRole === 'Bank Officer' || currentRole === 'bank_officer') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full text-xs font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>NABARD Digital KCC Underwriting & Sanction Desk</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
                Bank Officer Underwriting Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Evaluate AI-generated Kisan credit scores, underwrite Kisan Credit Card applications, and monitor NPA recovery rates.
              </p>
            </div>
          </div>

          {/* Bank Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Total KCC Portfolio Sanctioned</p>
              <h3 className="text-3xl font-black text-blue-600 mt-1">₹112.5 Crores</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">Active across 3,400 farm accounts</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Average Credit Score</p>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">748 / 900</h3>
              <p className="text-xs font-bold text-slate-500 mt-2">Low Risk Tier-1 Portfolio</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">NPA Recovery Rate</p>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">98.8%</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">Secured by crop insurance assignment</p>
            </div>
          </div>

          {/* Pending Loan Applications Table */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-blue-600" /> Pending KCC & Mechanization Loan Applications
            </h3>

            <div className="space-y-3">
              {pendingLoans.map((l) => (
                <div key={l.id} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600">{l.scheme}</span>
                    <h4 className="text-base font-black text-slate-800 dark:text-slate-100 mt-0.5">{l.farmer} ({l.district})</h4>
                    <p className="text-xs text-slate-500 mt-1">CIBIL Score: <span className="font-bold text-emerald-600">{l.cibil}</span> • Loan Requested: <span className="font-bold text-slate-800 dark:text-slate-100">₹{l.amountRs.toLocaleString('en-IN')}</span></p>
                  </div>

                  {l.status.includes('SANCTIONED') ? (
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                      <CheckCircle2 className="w-4 h-4" /> {l.status}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApproveLoan(l.id)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md self-start sm:self-auto transition-all"
                    >
                      Sanction Loan via CBS
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Warehouse Owner Dashboard
  if (currentRole === 'Warehouse Owner' || currentRole === 'warehouse_owner') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>WDRA Licensed Operator • e-NWR Issuance Desk</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
                Warehouse & Cold Chain Operator Console
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Manage silo capacities, approve incoming grain consignments, and issue electronic Negotiable Warehouse Receipts (e-NWR).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Total Storage Managed</p>
              <h3 className="text-3xl font-black text-amber-600 mt-1">15,000 MT</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">Across 3 Punjab Facilities</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Current Occupancy</p>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">82% Full</h3>
              <p className="text-xs font-bold text-slate-500 mt-2">2,700 MT Available</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Active e-NWR Issued</p>
              <h3 className="text-3xl font-black text-blue-600 mt-1">142 Receipts</h3>
              <p className="text-xs font-bold text-blue-600 mt-2">Pledged for ₹18.4 Cr bank loans</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
            <WhIcon className="w-16 h-16 text-amber-500 mx-auto" />
            <h3 className="text-xl font-black">WDRA Automated Telemetry Active</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">All storage bays maintain optimal 12% grain moisture and 4°C cold chain refrigeration. Sensors report zero humidity spikes in the last 24 hours.</p>
          </div>
        </div>
      </div>
    );
  }

  // 4. Logistics Company Dashboard
  if (currentRole === 'Logistics Company' || currentRole === 'logistics_company') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-cyan-100 dark:bg-cyan-950/60 px-3 py-1 rounded-full text-xs font-bold text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Randhawa AI Freight Fleet • GPS Telemetry Console</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
                Fleet Dispatch & Logistics Control Desk
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Track live refrigerated trucks, monitor FASTag toll routing, and manage farm-to-mandi waybills.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Active Trucks in Haul</p>
              <h3 className="text-3xl font-black text-cyan-600 mt-1">42 Trucks</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">100% GPS Live Tracking</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Average Transit Speed</p>
              <h3 className="text-3xl font-black text-emerald-600 mt-1">54 km/h</h3>
              <p className="text-xs font-bold text-slate-500 mt-2">Zero transit delays today</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <p className="text-xs font-bold uppercase text-slate-400">Cold Chain Integrity</p>
              <h3 className="text-3xl font-black text-blue-600 mt-1">2.4°C Stable</h3>
              <p className="text-xs font-bold text-blue-600 mt-2">Refrigerated cargo protected</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
            <Truck className="w-16 h-16 text-cyan-500 mx-auto" />
            <h3 className="text-xl font-black">All Fleets Operational on Highway Grids</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">AI GPS telemetry reports all 42 freight units moving steadily on NH-44 and NH-48 corridors. Waybills and GST E-way bills verified.</p>
          </div>
        </div>
      </div>
    );
  }

  // 5. Super Admin Dashboard or Default
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>National AI Platform Core • Super Admin Control</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              National Platform Command & Health Center
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Real-time monitoring of all 8 stakeholder roles, Gemini AI API latency, cloud container ingress, and database transactions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-bold uppercase text-slate-400">Total Platform Users</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">12,48,000</h3>
            <p className="text-xs font-bold text-emerald-600 mt-2">+1,400 joined today</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-bold uppercase text-slate-400">Gemini 2.5 API Latency</p>
            <h3 className="text-3xl font-black text-blue-600 mt-1">210 ms</h3>
            <p className="text-xs font-bold text-blue-600 mt-2">100% Uptime Healthy</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-bold uppercase text-slate-400">Smart Escrow Locked</p>
            <h3 className="text-3xl font-black text-amber-500 mt-1">₹840 Crores</h3>
            <p className="text-xs font-bold text-slate-500 mt-2">Protected by AGMARKNET</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-bold uppercase text-slate-400">System Security</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">SOC-2 Type II</h3>
            <p className="text-xs font-bold text-emerald-600 mt-2">Zero breach events</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-black">All 8 Stakeholder Subsystems Online</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">✅ Farmers Network Online</div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">✅ Buyers & Mandi Escrow Online</div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">✅ Warehouse WDRA Telemetry Online</div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-slate-800 text-emerald-900 dark:text-emerald-200">✅ Randhawa Logistics GPS Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};
