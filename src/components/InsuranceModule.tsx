import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CloudRain, Satellite, Award, 
  CheckCircle2, ArrowRight, Sparkles, RefreshCw, HelpCircle, DollarSign 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InsurancePolicy } from '../types';
import { MOCK_INSURANCE } from '../data/mockData';

export const InsuranceModule: React.FC = () => {
  const [policies, setPolicies] = useState<InsurancePolicy[]>(MOCK_INSURANCE);
  const [selectedCrop, setSelectedCrop] = useState('Paddy (Rice)');
  const [farmAcres, setFarmAcres] = useState(8);
  const [isVerifying, setIsVerifying] = useState(false);
  const [claimResult, setClaimResult] = useState<any>(null);

  const handleVerifyClaim = () => {
    setIsVerifying(true);
    setClaimResult(null);
    setTimeout(() => {
      setClaimResult({
        status: 'SANCTIONED (AUTOMATED SATELLITE NDVI TRIGGER)',
        ndviScore: '0.38 (Deficit Growth Detected due to Unseasonal Monsoon Flood)',
        payoutAmountRs: farmAcres * 36000,
        disbursementTime: 'Direct Bank Transfer (DBT) within 48 Hours',
        inspectorsNeeded: 'Zero physical inspection required under PMFBY Tech-1.0'
      });
      setIsVerifying(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full text-xs font-bold text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>PMFBY Tech-1.0 • Satellite NDVI Automated Claim Shield</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Crop Insurance & Automated Risk Protection
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Protect your farm against drought, flood, hailstorm, and pest epidemics. Automated claim settlement powered by IMD weather grids and ISRO satellite NDVI vegetative index.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Satellite NDVI Claim Verification Sandbox (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Satellite className="w-5 h-5 text-rose-600" />
                <span>Satellite NDVI Claim Auto-Assessment</span>
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Insured Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold"
                >
                  {['Paddy (Rice)', 'Wheat', 'Cotton', 'Sugarcane', 'Soybean', 'Mustard'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Insured Farm Parcel Size (Acres)
                </label>
                <input
                  type="number"
                  min="1"
                  value={farmAcres}
                  onChange={(e) => setFarmAcres(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-bold text-emerald-600"
                />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kharif Farmer Premium (2%):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">₹{farmAcres * 650} / Season</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Govt Subsidy Contribution:</span>
                  <span className="font-bold text-emerald-600">₹{farmAcres * 3200} (Subsumed)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-black">
                  <span>Max Insurance Shield:</span>
                  <span className="text-blue-600 dark:text-blue-400">₹{(farmAcres * 48000).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleVerifyClaim}
                disabled={isVerifying}
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing ISRO Satellite NDVI Data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Simulate Satellite Crop Loss Payout</span>
                  </>
                )}
              </button>
            </div>

            {/* Verification Payout Card */}
            {claimResult && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white border border-slate-700 shadow-xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    AUTOMATED DBT SANCTION
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">100% Verified</span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{claimResult.status}</h3>
                  <p className="text-xs text-slate-300 mt-1">NDVI Telemetry: {claimResult.ndviScore}</p>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-600 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Approved Sanction Payout</p>
                    <p className="text-2xl font-black text-amber-400">₹{claimResult.payoutAmountRs.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold px-3 py-1.5 rounded-xl">
                    Zero Paperwork
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Disbursement: <strong>{claimResult.disbursementTime}</strong>. {claimResult.inspectorsNeeded}.
                </p>
              </div>
            )}
          </div>

          {/* Right: Active Insurance Policies List (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-600" /> Approved PMFBY Policy Shield Products ({policies.length})
            </h3>

            <div className="space-y-4">
              {policies.map((pol) => (
                <div
                  key={pol.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-600">{pol.providerName}</span>
                      <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-0.5">{pol.policyName}</h4>
                    </div>
                    <div className="text-left sm:text-right bg-rose-50 dark:bg-rose-950/50 px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 self-start">
                      <span className="text-lg font-black text-rose-700 dark:text-rose-300">₹{pol.premiumPerAcreRs} / Acre</span>
                      <span className="block text-[9px] font-bold text-slate-500">Farmer Share (1.5% - 2%)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                      <p className="text-slate-400 font-bold uppercase text-[10px]">Max Coverage Limit</p>
                      <p className="text-base font-black text-emerald-600 mt-0.5">₹{pol.maxCoveragePerAcreRs.toLocaleString('en-IN')} / Acre</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                      <p className="text-slate-400 font-bold uppercase text-[10px]">Risk Profile</p>
                      <span className="text-xs font-black text-blue-600 mt-0.5 inline-block">{pol.riskScore} Risk Shield</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Covered Crops:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pol.cropCovered.map((c, i) => (
                        <span key={i} className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200/80 dark:border-emerald-800">
                          🌱 {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Automated Policy Features:</p>
                    <div className="space-y-1.5">
                      {pol.features.map((f, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => alert(`Enrolled farm parcel in ${pol.policyName} with Aadhaar e-Sign!`)}
                      className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center space-x-2 transition-all"
                    >
                      <span>Enrol Under PMFBY Policy</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
