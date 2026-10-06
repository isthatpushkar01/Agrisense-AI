import React from 'react';
import { 
  Sprout, TrendingUp, ShieldCheck, Cpu, CloudRain, Users, Truck, 
  Warehouse, Landmark, PhoneCall, ArrowRight, Sparkles, CheckCircle2, 
  Award, BarChart3, Radio, Zap
} from 'lucide-react';
import { UserRole } from '../types';
import { MOCK_MANDI_PRICES } from '../data/mockData';

interface LandingPageProps {
  onExploreRole?: (role: UserRole) => void;
  onTabChange?: (tab: string) => void;
  currentRole?: UserRole;
  onNavigate?: (tab: string) => void;
}

const getBentoRoleStyle = (role: UserRole) => {
  if (role === 'farmer') {
    return {
      card: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-2xl font-black text-white group-hover:text-emerald-200 transition-colors",
      subtitle: "text-sm font-bold text-emerald-200 mt-1",
      desc: "text-xs sm:text-sm text-emerald-100 mt-4 leading-relaxed",
      badge: "bg-white/20 backdrop-blur px-3 py-1.5 rounded-2xl border border-white/30 text-white font-bold text-[10px] uppercase tracking-wider group-hover:bg-white/30 transition-colors",
      footer: "border-white/20 text-emerald-100 group-hover:text-white"
    };
  }
  if (role === 'government_officer') {
    return {
      card: "col-span-1 sm:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 border-2 border-purple-100 dark:border-purple-800/60 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-xl font-black text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors",
      subtitle: "text-xs font-bold text-purple-600 dark:text-purple-400 mt-1",
      desc: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed",
      badge: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border border-purple-200 dark:border-purple-800 group-hover:bg-purple-200 transition-colors",
      footer: "border-slate-100 dark:border-slate-800 text-purple-600 dark:text-purple-400 group-hover:text-purple-700"
    };
  }
  if (role === 'buyer') {
    return {
      card: "col-span-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
      subtitle: "text-xs font-bold text-blue-600 dark:text-blue-400 mt-1",
      desc: "text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed",
      badge: "bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider group-hover:bg-blue-200 transition-colors",
      footer: "border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 group-hover:text-blue-800"
    };
  }
  if (role === 'warehouse_owner') {
    return {
      card: "col-span-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors",
      subtitle: "text-xs font-bold text-amber-600 dark:text-amber-400 mt-1",
      desc: "text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed",
      badge: "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider group-hover:bg-amber-200 transition-colors",
      footer: "border-amber-200/50 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 group-hover:text-amber-800"
    };
  }
  if (role === 'bank_officer') {
    return {
      card: "col-span-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors",
      subtitle: "text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1",
      desc: "text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed",
      badge: "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider group-hover:bg-indigo-200 transition-colors",
      footer: "border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-800"
    };
  }
  if (role === 'insurance_company') {
    return {
      card: "col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors",
      subtitle: "text-xs font-bold text-rose-600 dark:text-rose-400 mt-1",
      desc: "text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed",
      badge: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border border-rose-200 dark:border-rose-800 group-hover:bg-rose-200 transition-colors",
      footer: "border-slate-100 dark:border-slate-800 text-rose-600 dark:text-rose-400 group-hover:text-rose-700"
    };
  }
  if (role === 'logistics_company') {
    return {
      card: "col-span-1 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-800/60 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
      title: "text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors",
      subtitle: "text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-1",
      desc: "text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed",
      badge: "bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider group-hover:bg-cyan-200 transition-colors",
      footer: "border-cyan-200/50 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-400 group-hover:text-cyan-800"
    };
  }
  return {
    card: "col-span-1 sm:col-span-2 lg:col-span-1 bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group",
    title: "text-lg font-black text-white group-hover:text-emerald-400 transition-colors",
    subtitle: "text-xs font-bold text-emerald-400 mt-1",
    desc: "text-xs text-slate-300 mt-3 leading-relaxed",
    badge: "bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border border-slate-700 group-hover:bg-slate-700 transition-colors",
    footer: "border-slate-800 text-emerald-400 group-hover:text-emerald-300"
  };
};

export const LandingPage: React.FC<LandingPageProps> = ({ onExploreRole, onTabChange, onNavigate }) => {
  const handleTabSwitch = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    else if (onNavigate) onNavigate(tab);
  };
  const handleRoleSelect = (role: UserRole) => {
    if (onExploreRole) onExploreRole(role);
    handleTabSwitch('dashboard');
  };
  const stats = [
    { label: 'Farmers Connected Nationwide', value: '1.45 Million+', icon: <Users className="w-6 h-6 text-emerald-600" />, change: '+18% this month' },
    { label: 'APMC Mandis Daily Vol', value: '₹480+ Crore', icon: <TrendingUp className="w-6 h-6 text-blue-600" />, change: 'Real-time AI Forecasts' },
    { label: 'Verified Warehouses & Silos', value: '4,850+ Hubs', icon: <Warehouse className="w-6 h-6 text-amber-600" />, change: '2.4M MT Capacity' },
    { label: 'AI Disease Diagnostic Accuracy', value: '97.4% Precision', icon: <Cpu className="w-6 h-6 text-purple-600" />, change: 'Powered by Gemini 2.5' },
  ];

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: string; badge: string; color: string; desc: string }[] = [
    {
      role: 'farmer',
      title: '1. Farmer (Kisan)',
      subtitle: 'Crop Doctor, Yield AI & Voice Assistant',
      icon: '🌾',
      badge: 'Core Target',
      color: 'from-emerald-500 to-teal-700',
      desc: 'Get instant leaf disease diagnosis via phone camera, soil NPK crop recommendations, 7-day rain alerts, and sell crops directly to verified buyers.'
    },
    {
      role: 'buyer',
      title: '2. Buyer / Wholesale Trader',
      subtitle: 'Live Marketplace & Escrow Bidding',
      icon: '🛒',
      badge: 'Marketplace',
      color: 'from-blue-500 to-indigo-700',
      desc: 'Browse Grade-A+ organic crops directly from farmers across Punjab, UP, MP, and Maharashtra. Execute transparent escrow transactions without middlemen.'
    },
    {
      role: 'warehouse_owner',
      title: '3. Warehouse Owner',
      subtitle: 'Cold Storage & Silo Capacity Booking',
      icon: '🏢',
      badge: 'Storage Hub',
      color: 'from-amber-500 to-orange-700',
      desc: 'List cold storage temperature zones, manage electronic Negotiable Warehouse Receipts (e-NWR), and receive automated storage booking reservations.'
    },
    {
      role: 'government_officer',
      title: '4. Government Officer',
      subtitle: 'Scheme Disbursement & Policy Telemetry',
      icon: '🏛️',
      badge: 'Governance',
      color: 'from-purple-500 to-violet-700',
      desc: 'Monitor PM-KISAN direct benefit transfers, verify farmer land registrations, and track regional crop yield analytics across 730+ agricultural districts.'
    },
    {
      role: 'bank_officer',
      title: '5. Bank Officer (NABARD/SBI)',
      subtitle: 'Kisan Credit Card & Subvention Loans',
      icon: '🏦',
      badge: 'Agri-Finance',
      color: 'from-indigo-500 to-blue-800',
      desc: 'Evaluate AI-calculated Kisan Credit Card eligibility scores, approve drone mechanization loans, and verify land ownership documents instantly.'
    },
    {
      role: 'insurance_company',
      title: '6. Insurance Company',
      subtitle: 'PMFBY Satellite NDVI Claim Verification',
      icon: '🛡️',
      badge: 'Risk Shield',
      color: 'from-rose-500 to-pink-700',
      desc: 'Assess parametric weather risks, analyze satellite NDVI crop health indices, and automate claim settlements within 72 hours without physical inspection.'
    },
    {
      role: 'logistics_company',
      title: '7. Logistics & Transport Provider',
      subtitle: 'Refrigerated Fleet Route Optimization',
      icon: '🚚',
      badge: 'Cold Chain',
      color: 'from-cyan-500 to-teal-800',
      desc: 'Optimize GPS transport routes from farm to export port, calculate fuel savings, and offer refrigerated 10-ton trucks for perishable mangoes and spices.'
    },
    {
      role: 'super_admin',
      title: '8. Super Admin (HQ)',
      subtitle: 'National Telemetry & System Command',
      icon: '⚡',
      badge: 'HQ Control',
      color: 'from-slate-700 to-slate-950',
      desc: 'Manage role-based access control, monitor real-time Express/FastAPI microservices, audit smart contract transactions, and inspect MongoDB/PostgreSQL tables.'
    }
  ];

  const features = [
    {
      title: 'Multimodal AI Disease Detection',
      desc: 'Upload leaf photos or scan live with camera. Powered by Google Gemini 2.5 Vision to identify 140+ plant pathogens with exact bounding box highlights and organic treatment steps.',
      icon: <Cpu className="w-7 h-7 text-emerald-600" />
    },
    {
      title: 'Kisan Mitra Multilingual Voice AI',
      desc: 'Speak naturally in Hindi, Punjabi, Marathi, Telugu, or English! Voice-to-text and speech output explains fertilizers, pesticides, and mandi trends to rural farmers.',
      icon: <Radio className="w-7 h-7 text-blue-600" />
    },
    {
      title: 'Smart Mandi Price Prediction Engine',
      desc: 'Recharts price curve analytics predicting 7-day APMC mandi rates across India. Tells farmers the exact best selling window to maximize profit margins.',
      icon: <BarChart3 className="w-7 h-7 text-amber-600" />
    },
    {
      title: 'Connected 8-Role Agricultural Ecosystem',
      desc: 'Seamless data flow connecting Farmers, Buyers, Cold Storage Warehouses, NABARD Banks, PMFBY Insurers, Logistics fleets, and Government policymakers.',
      icon: <Users className="w-7 h-7 text-purple-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Live Mandi Ticker Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2.5 px-4 overflow-hidden shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 font-black text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
            <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Live APMC Mandi Rates:</span>
          </div>
          <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
            {MOCK_MANDI_PRICES.map((mandi) => (
              <div key={mandi.id} className="flex items-center space-x-2 text-xs font-semibold whitespace-nowrap bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <span className="text-slate-500 dark:text-slate-400">{mandi.mandiName.split(' ')[0]}:</span>
                <span className="text-slate-800 dark:text-slate-200">{mandi.commodity.split(' ')[0]}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">₹{mandi.modalPrice}/Qtl</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  mandi.changePercent >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {mandi.changePercent >= 0 ? `+${mandi.changePercent}%` : `${mandi.changePercent}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 z-0 opacity-15 dark:opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 via-blue-100 to-amber-100 dark:from-emerald-950 dark:via-blue-950 dark:to-amber-950 px-4 py-2 rounded-full border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-6 shadow-sm animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>National AI-Powered Agricultural Network • Google Gemini 2.5 Multimodal Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-tight">
            Protecting Crops, Boosting Yields & Connecting India's{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Agri-Ecosystem
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            AgriShield AI integrates <strong>Computer Vision Disease Diagnostics</strong>, <strong>Voice AI Assistants in 5 Regional Languages</strong>, <strong>Smart Mandi Price Forecasting</strong>, and an escrow marketplace connecting Farmers, Buyers, Warehouses, NABARD Banks, and Insurers.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleTabSwitch('dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Sprout className="w-5 h-5" />
              <span>Launch Active Role Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleTabSwitch('disease')}
              className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base rounded-2xl border border-slate-300 dark:border-slate-700 shadow-md flex items-center space-x-2 transition-all"
            >
              <Cpu className="w-5 h-5 text-emerald-600" />
              <span>Try AI Disease Scanner</span>
            </button>
            <button
              onClick={() => handleTabSwitch('recommend')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-2xl shadow-md flex items-center space-x-2 transition-all"
            >
              <Award className="w-5 h-5 text-amber-300" />
              <span>AI Crop Doctor</span>
            </button>
          </div>

          {/* Quick trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Google Material Design UI</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> FastAPI / Express REST APIs</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> PostgreSQL & MongoDB Simulated Stores</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Firebase Auth & RBAC Security</span>
          </div>
        </div>
      </div>

      {/* Stats Counter Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((st, i) => {
            const cardThemes = [
              "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl",
              "bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60 text-slate-800 dark:text-slate-100",
              "bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60 text-slate-800 dark:text-slate-100",
              "bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60 text-slate-800 dark:text-slate-100"
            ];
            const isHero = i === 0;
            return (
              <div key={i} className={`p-6 rounded-3xl transition-all hover:translate-y-[-2px] flex items-center justify-between ${cardThemes[i % cardThemes.length]}`}>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${isHero ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>{st.label}</p>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1">{st.value}</h3>
                  <p className={`text-[11px] font-semibold mt-2 flex items-center gap-1.5 ${isHero ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${isHero ? 'bg-white' : 'bg-emerald-500'}`} /> {st.change}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${isHero ? 'bg-emerald-950/30 border border-emerald-400/30 text-white' : 'bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 shadow-sm'}`}>
                  {st.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8-Role Architecture Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Role-Based Access Control (RBAC)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 mt-3">
            Designed for All 8 Stakeholders of Indian Agriculture
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Click any role below to instantly switch your active persona and experience specialized workflows, customized analytics, and AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rolesList.map((r) => {
            const style = getBentoRoleStyle(r.role);
            return (
              <div
                key={r.role}
                onClick={() => handleRoleSelect(r.role)}
                className={style.card}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl p-3 bg-white/40 dark:bg-slate-800/80 backdrop-blur rounded-2xl border border-white/40 dark:border-slate-700 group-hover:scale-110 transition-transform">
                      {r.icon}
                    </div>
                    <span className={style.badge}>
                      {r.badge}
                    </span>
                  </div>

                  <h3 className={style.title}>
                    {r.title}
                  </h3>
                  <p className={style.subtitle}>
                    {r.subtitle}
                  </p>
                  <p className={style.desc}>
                    {r.desc}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold ${style.footer}`}>
                  <span>Switch to this persona</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Features Showcase */}
      <div className="bg-slate-100 dark:bg-slate-900/60 py-16 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">
              Powered by Google Gemini 2.5 Multimodal Engine
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
              Real-time computer vision, voice speech synthesis, and deep market predictive analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feat, i) => {
              const featBentoThemes = [
                "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60",
                "bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60",
                "bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60",
                "bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60"
              ];
              return (
                <div key={i} className={`p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-start space-x-5 ${featBentoThemes[i % featBentoThemes.length]}`}>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{feat.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black">Ready to Transform Your Farming Operations?</h2>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base">
              Join 1.45M+ farmers, buyers, and agricultural institutions on India's most advanced AI intelligence network.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleTabSwitch('dashboard')}
                className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base rounded-2xl shadow-xl transition-all flex items-center gap-2"
              >
                <span>Enter Role Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleTabSwitch('schemes')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 backdrop-blur-md transition-all"
              >
                Explore Govt Schemes & Loans
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
