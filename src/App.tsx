import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DiseaseDetection } from './components/DiseaseDetection';
import { CropRecommendation } from './components/CropRecommendation';
import { MandiPrices } from './components/MandiPrices';
import { VoiceAssistant } from './components/VoiceAssistant';
import { WeatherDashboard } from './components/WeatherDashboard';
import { Marketplace } from './components/Marketplace';
import { WarehouseFinder } from './components/WarehouseFinder';
import { RouteOptimizer } from './components/RouteOptimizer';
import { SchemesLoans } from './components/SchemesLoans';
import { InsuranceModule } from './components/InsuranceModule';
import { AnalyticsReports } from './components/AnalyticsReports';
import { ProfileSettings } from './components/ProfileSettings';
import { RoleDashboards } from './components/RoleDashboards';
import { UserRole } from './types';
import { getUserForRole } from './data/mockData';
import { Sprout, ShieldCheck, ArrowRight, Lock, UserCheck, Globe } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('Farmer');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Default logged in for MVP demonstration
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);

  const currentUser = getUserForRole(currentRole);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    // Automatically navigate to specialized desk if selecting specialized roles
    if (['Farmer', 'Govt Officer', 'Bank Officer', 'Warehouse Owner', 'Logistics Company', 'Super Admin', 'Insurance Company', 'Buyer'].includes(role)) {
      setActiveTab('role-desk');
    } else {
      setActiveTab('home');
    }
    setShowRoleModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10 space-y-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Sprout className="w-9 h-9 text-white" />
          </div>

          <div>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
              National Agricultural Intelligence Platform
            </span>
            <h1 className="text-3xl font-black mt-3 text-white">AgriShield AI</h1>
            <p className="text-xs text-slate-400 mt-1">
              AI-Powered Crop Pathology, Satellite Weather, Smart Escrow Marketplace & KCC Underwriting Network.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => { setIsLoggedIn(true); handleRoleChange('Farmer'); }}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <UserCheck className="w-5 h-5" />
              <span>Enter as Farmer (Kisan Portal)</span>
            </button>

            <button
              onClick={() => { setIsLoggedIn(true); handleRoleChange('Buyer'); }}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 transition-all"
            >
              <span>Enter as Buyer / Mandi Trader</span>
            </button>

            <button
              onClick={() => setShowRoleModal(true)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-800/60 transition-all"
            >
              Select Other Enterprise Role (Govt, Bank, Silo, Fleet)
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Aadhaar e-KYC & Firebase Auth SOC-2 Secure</span>
          </div>
        </div>

        {/* Modal for all 8 roles */}
        {showRoleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-4 text-left">
              <h3 className="text-lg font-black text-white">Select Your National Stakeholder Role</h3>
              <p className="text-xs text-slate-400">Choose your authorized credentials to access role-specific specialized dashboards:</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {(['Farmer', 'Buyer', 'Warehouse Owner', 'Govt Officer', 'Bank Officer', 'Insurance Company', 'Logistics Company', 'Super Admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => { setIsLoggedIn(true); handleRoleChange(r); }}
                    className="p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl border border-slate-700 text-left transition-all flex items-center justify-between"
                  >
                    <span>{r}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowRoleModal(false)}
                className="w-full py-3 bg-slate-800 text-slate-400 font-bold text-xs rounded-xl mt-4 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={currentUser}
        onLoginClick={() => setActiveTab('profile')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {activeTab === 'home' && <LandingPage currentRole={currentRole} onNavigate={setActiveTab} onExploreRole={handleRoleChange} onTabChange={setActiveTab} />}
        {activeTab === 'disease' && <DiseaseDetection />}
        {activeTab === 'recommendation' && <CropRecommendation />}
        {activeTab === 'mandi' && <MandiPrices />}
        {activeTab === 'assistant' && <VoiceAssistant currentRole={currentRole} />}
        {activeTab === 'weather' && <WeatherDashboard />}
        {activeTab === 'marketplace' && <Marketplace currentRole={currentRole} />}
        {activeTab === 'warehouse' && <WarehouseFinder />}
        {activeTab === 'logistics' && <RouteOptimizer />}
        {activeTab === 'schemes' && <SchemesLoans />}
        {activeTab === 'insurance' && <InsuranceModule />}
        {activeTab === 'reports' && <AnalyticsReports />}
        {activeTab === 'profile' && <ProfileSettings currentRole={currentRole} onLogout={handleLogout} />}
        {(activeTab === 'role-desk' || activeTab === 'dashboard') && <RoleDashboards currentRole={currentRole} />}
      </main>

      {/* Footer Banner */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <div className="flex items-center justify-center space-x-2 font-bold text-slate-700 dark:text-slate-300">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>AgriShield AI • National Agricultural Intelligence Network</span>
        </div>
        <p>
          Integrated with Ministry of Agriculture & Farmers Welfare, AGMARKNET Mandi Grids, IMD Doppler Weather, and ISRO Satellite Telemetry.
        </p>
        <p className="text-[10px] opacity-70">
          © 2026 AgriShield AI Platform • Built for Indian Farmers & Global Food Security • All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
