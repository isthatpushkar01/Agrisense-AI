import React, { useState } from 'react';
import { 
  User as UserIcon, Shield, Bell, Smartphone, Globe, Lock, 
  MapPin, CheckCircle2, Save, Sparkles, AlertCircle, Key, LogOut 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserRole } from '../types';

interface ProfileSettingsProps {
  currentRole: UserRole;
  onLogout: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ currentRole, onLogout }) => {
  const [profile, setProfile] = useState({
    fullName: 'Sardar Harpreet Singh',
    phoneNumber: '+91 98765 43210',
    aadhaarMasked: 'XXXX XXXX 8892',
    panMasked: 'ABCPS****K',
    farmLocation: 'Village Kila Raipur, District Ludhiana, Punjab',
    totalAcres: 24.5,
    primaryLanguage: 'Punjabi (ਪੰਜਾਬੀ)',
    smsAlerts: true,
    whatsappAlerts: true,
    voiceCallAlerts: true,
    mandiPriceThresholdAlerts: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Aadhaar e-KYC Verified Account • Digital Agri ID</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
              Account Profile & Platform Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Manage your personal identity, land parcel telemetry, multilingual voice preferences, and SMS / WhatsApp instant alerts.
            </p>
          </div>

          <button
            onClick={onLogout}
            className="px-5 py-2.5 bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 text-rose-700 dark:text-rose-300 font-bold text-xs rounded-xl shadow-xs flex items-center space-x-2 self-start sm:self-auto transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Your profile preferences and notification channels have been updated successfully!</span>
          </div>
        )}

        {/* Form Grid */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Identity & Contact Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <UserIcon className="w-5 h-5 text-emerald-600" />
              <span>Personal Identity & KYC Credentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase">Full Legal Name (Aadhaar Verified)</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase">Mobile Number (SMS / OTP Linked)</label>
                <input
                  type="text"
                  value={profile.phoneNumber}
                  onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase">Aadhaar Card Number (Masked)</label>
                <input
                  type="text"
                  disabled
                  value={profile.aadhaarMasked}
                  className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-400 cursor-not-allowed font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase">PAN Number (For Mandi Escrow Tax)</label>
                <input
                  type="text"
                  disabled
                  value={profile.panMasked}
                  className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-400 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </div>

          {/* Farm Location & Land Parcel Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Farm Parcel & Satellite Telemetry Setup</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="sm:col-span-2">
                <label className="block text-slate-500 mb-1.5 uppercase">Primary Farm Address & Tehsil</label>
                <input
                  type="text"
                  value={profile.farmLocation}
                  onChange={(e) => setProfile({ ...profile, farmLocation: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase">Total Land (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={profile.totalAcres}
                  onChange={(e) => setProfile({ ...profile, totalAcres: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 font-bold text-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Notification Channels & Languages Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Bell className="w-5 h-5 text-amber-500" />
              <span>Notification Channels & Voice Language</span>
            </h2>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-500 mb-1.5 uppercase">Preferred Kisan Voice Assistant Language</label>
                <select
                  value={profile.primaryLanguage}
                  onChange={(e) => setProfile({ ...profile, primaryLanguage: e.target.value })}
                  className="w-full sm:w-1/2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 font-bold"
                >
                  <option value="Punjabi (ਪੰਜਾਬੀ)">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                  <option value="English">English</option>
                  <option value="Marathi (मराठी)">Marathi (मराठी)</option>
                  <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
                </select>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.smsAlerts}
                    onChange={(e) => setProfile({ ...profile, smsAlerts: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-slate-800 dark:text-slate-100">SMS Severe Weather Alerts</span>
                    <span className="text-[10px] text-slate-400">Instant IMD storm & hail warnings via text message</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.whatsappAlerts}
                    onChange={(e) => setProfile({ ...profile, whatsappAlerts: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-slate-800 dark:text-slate-100">WhatsApp Mandi Price Bulletins</span>
                    <span className="text-[10px] text-slate-400">Daily 7:00 AM APMC rates sent to WhatsApp</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.voiceCallAlerts}
                    onChange={(e) => setProfile({ ...profile, voiceCallAlerts: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-slate-800 dark:text-slate-100">Kisan Mitra AI Voice Calls</span>
                    <span className="text-[10px] text-slate-400">Automated phone calls for pest outbreak warnings</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.mandiPriceThresholdAlerts}
                    onChange={(e) => setProfile({ ...profile, mandiPriceThresholdAlerts: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-slate-800 dark:text-slate-100">Price Target Spike Alerts</span>
                    <span className="text-[10px] text-slate-400">Notify when Basmati crosses ₹9,000 / Qtl</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transition-all"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving Profile Telemetry...' : 'Save Preferences'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
