import React, { useState } from 'react';
import { 
  ShieldAlert, Sprout, Bell, User as UserIcon, LogOut, CheckCircle2, 
  ChevronDown, Globe, Sun, Moon, AlertTriangle, PhoneCall, Key, Award 
} from 'lucide-react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: User;
  onLoginClick?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  user,
  onLoginClick,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const defaultUser = user || (MOCK_USERS && MOCK_USERS['farmer']) || {
    id: 'usr-default',
    name: 'Sardar Harpreet Singh',
    email: 'harpreet.singh@kisan-net.in',
    phone: '+91 98765-43210',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1595064085577-7c2ef98ec311?auto=format&fit=crop&q=80&w=250',
    location: 'Ludhiana, Punjab',
    verified: true
  };

  const roleLabels: Record<string, { title: string; color: string; icon: string }> = {
    farmer: { title: '1. Farmer (Kisan)', color: 'bg-emerald-600 text-white', icon: '🌾' },
    Farmer: { title: '1. Farmer (Kisan)', color: 'bg-emerald-600 text-white', icon: '🌾' },
    buyer: { title: '2. Buyer / Trader', color: 'bg-blue-600 text-white', icon: '🛒' },
    Buyer: { title: '2. Buyer / Trader', color: 'bg-blue-600 text-white', icon: '🛒' },
    warehouse_owner: { title: '3. Warehouse Owner', color: 'bg-amber-600 text-white', icon: '🏢' },
    'Warehouse Owner': { title: '3. Warehouse Owner', color: 'bg-amber-600 text-white', icon: '🏢' },
    government_officer: { title: '4. Government Officer', color: 'bg-purple-600 text-white', icon: '🏛️' },
    'Government Officer': { title: '4. Government Officer', color: 'bg-purple-600 text-white', icon: '🏛️' },
    'Govt Officer': { title: '4. Government Officer', color: 'bg-purple-600 text-white', icon: '🏛️' },
    bank_officer: { title: '5. Bank Officer', color: 'bg-indigo-600 text-white', icon: '🏦' },
    'Bank Officer': { title: '5. Bank Officer', color: 'bg-indigo-600 text-white', icon: '🏦' },
    insurance_company: { title: '6. Insurance Company', color: 'bg-rose-600 text-white', icon: '🛡️' },
    'Insurance Company': { title: '6. Insurance Company', color: 'bg-rose-600 text-white', icon: '🛡️' },
    logistics_company: { title: '7. Logistics Provider', color: 'bg-cyan-600 text-white', icon: '🚚' },
    'Logistics Company': { title: '7. Logistics Provider', color: 'bg-cyan-600 text-white', icon: '🚚' },
    super_admin: { title: '8. Super Admin (HQ)', color: 'bg-slate-800 text-white', icon: '⚡' },
    'Super Admin': { title: '8. Super Admin (HQ)', color: 'bg-slate-800 text-white', icon: '⚡' },
  };

  const navLinks = [
    { id: 'landing', label: 'Home / Overview' },
    { id: 'dashboard', label: 'Role Dashboard' },
    { id: 'disease', label: 'AI Disease Scan' },
    { id: 'recommend', label: 'Crop Doctor AI' },
    { id: 'mandis', label: 'Smart Mandi Rates' },
    { id: 'marketplace', label: 'Buyer Marketplace' },
    { id: 'warehouses', label: 'Warehouses' },
    { id: 'schemes', label: 'Schemes & Loans' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Banner for National Broadcast */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-blue-800 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
          <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase text-[10px] tracking-wider animate-pulse">
            LIVE NETWORK
          </span>
          <span>🚨 IMD Weather Advisory: Heavy Monsoon Alert for Punjab & Haryana. Check 7-Day Rain Forecast!</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-amber-300" /> Kisan Helpline: 1800-180-1551</span>
          <span className="text-emerald-200">|</span>
          <span className="text-amber-300 font-semibold">AI Studio Production MVP</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('landing')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 text-white transform hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                  AgriShield AI
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-700">
                  INDIA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">National Agricultural Intelligence Network</p>
            </div>
          </div>

          {/* Center Navigation Tabs (Scrollable on small screens) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.slice(0, 6).map((link) => (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-200/60 dark:border-emerald-800'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1">
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 hidden group-hover:block z-50">
                {navLinks.slice(6).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onTabChange(link.id)}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">{selectedLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
                  {['English', 'Hindi (हिन्दी)', 'Punjabi (ਪੰਜਾਬੀ)', 'Marathi (मराठी)', 'Telugu (తెలుగు)'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLang(lang.split(' ')[0]); setShowLangDropdown(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher Dropdown (Simulating 8 User Roles) */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all ${roleLabels[currentRole].color} hover:opacity-90`}
              >
                <span>{roleLabels[currentRole].icon}</span>
                <span className="hidden md:inline">{roleLabels[currentRole].title}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                    Switch Active User Role (8 Roles)
                  </div>
                  {(['Farmer', 'Buyer', 'Warehouse Owner', 'Govt Officer', 'Bank Officer', 'Insurance Company', 'Logistics Company', 'Super Admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                        currentRole === r ? 'bg-emerald-50/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{roleLabels[r].icon}</span>
                        <span>{roleLabels[r].title}</span>
                      </div>
                      {currentRole === r && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                title="Notification Center"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" /> National Notification Center
                    </h4>
                    <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">3 Alerts</span>
                  </div>
                  <div className="space-y-3 mt-3 max-h-80 overflow-y-auto pr-1">
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-xs">
                      <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-300 mb-1">
                        <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Monsoon Advisory</span>
                        <span className="text-[10px] text-amber-600 font-normal">10m ago</span>
                      </div>
                      <p className="text-amber-800 dark:text-amber-200/90 text-[11px] leading-relaxed">
                        Expected rainfall over 60mm in Punjab & Haryana. Clear field drainage channels immediately!
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 text-xs">
                      <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                        <span className="flex items-center gap-1">📈 Mandi Surge Alert</span>
                        <span className="text-[10px] text-emerald-600 font-normal">25m ago</span>
                      </div>
                      <p className="text-emerald-800 dark:text-emerald-200/90 text-[11px] leading-relaxed">
                        Basmati Rice modal price jumped +3.4% at Azadpur APMC Mandi! AI recommends holding for 12 days.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200/60 dark:border-blue-800/60 text-xs">
                      <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-300 mb-1">
                        <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-blue-600" /> KCC Subsidy Sanction</span>
                        <span className="text-[10px] text-blue-600 font-normal">1h ago</span>
                      </div>
                      <p className="text-blue-800 dark:text-blue-200/90 text-[11px] leading-relaxed">
                        NABARD approved 3% prompt repayment interest subvention for your Kisan Credit Card account.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* User Profile / Login Button */}
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all border border-slate-200 dark:border-slate-700"
            >
              <img src={defaultUser.avatar} alt={defaultUser.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none truncate max-w-[110px]">{defaultUser.name}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight">{(defaultUser.location || 'Ludhiana, Punjab').split(',')[0]}</p>
              </div>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Sub-navigation scrollable bar */}
      <div className="xl:hidden flex items-center space-x-2 overflow-x-auto px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 no-scrollbar">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onTabChange(link.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === link.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
