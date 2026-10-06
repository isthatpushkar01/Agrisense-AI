import React, { useState } from 'react';
import { Sprout, Award, Sparkles, TrendingUp, RefreshCw, CheckCircle2, HelpCircle, MapPin, CloudRain, Thermometer } from 'lucide-react';

interface Recommendation {
  rank: number;
  cropName: string;
  suitabilityScore: number;
  expectedYieldPerAcre: string;
  estimatedRevenueRs: string;
  reasons: string[];
  fertilizerSchedule: string;
}

export const CropRecommendation: React.FC = () => {
  const [formData, setFormData] = useState({
    nitrogen: 120,
    phosphorus: 60,
    potassium: 40,
    ph: 6.8,
    rainfallMm: 850,
    temperatureC: 28,
    soilType: 'Alluvial Loamy Soil',
    state: 'Punjab / Northern Plains'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[]>([
    {
      rank: 1,
      cropName: 'Basmati Rice (Pusa 1121)',
      suitabilityScore: 97.4,
      expectedYieldPerAcre: '22 - 25 Quintals',
      estimatedRevenueRs: '₹1,95,000 - ₹2,20,000',
      reasons: [
        'High Nitrogen (120 kg/ha) and rainfall (850 mm) match Basmati requirement perfectly',
        'Soil pH (6.8) is optimal for nutrient uptake in loamy paddy fields',
        'High export demand in current APMC mandi futures'
      ],
      fertilizerSchedule: 'Basal application of DAP (50kg) + MOP (25kg), followed by 2 split doses of Urea at tillering and panicle initiation.'
    },
    {
      rank: 2,
      cropName: 'Turmeric (Salem High Curcumin)',
      suitabilityScore: 92.1,
      expectedYieldPerAcre: '80 - 100 Quintals (Fresh Rhizome)',
      estimatedRevenueRs: '₹2,40,000 - ₹2,80,000',
      reasons: [
        'Thrives in well-drained soil with warm temperature regime (28°C)',
        'High commercial value with long shelf life in cold storage',
        'Government PKVY organic subsidy available for medicinal roots'
      ],
      fertilizerSchedule: 'Apply 10 tonnes Farm Yard Manure (FYM) during land preparation + neem cake 200kg/acre.'
    },
    {
      rank: 3,
      cropName: 'Mustard (RH-725)',
      suitabilityScore: 88.5,
      expectedYieldPerAcre: '10 - 12 Quintals',
      estimatedRevenueRs: '₹65,000 - ₹75,000',
      reasons: [
        'Low water requirement crop ideal as secondary rotation',
        'MSP procurement assured by government agencies',
        'Short 130-day duration allows timely sowing of next Rabi crop'
      ],
      fertilizerSchedule: 'Single Super Phosphate (SSP) 150kg/acre to supply essential Sulfur for oil biosynthesis.'
    }
  ]);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/crop-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success && data.recommendations && data.recommendations.length > 0) {
        setResults(data.recommendations);
      }
    } catch (err) {
      console.error('Recommendation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSamplePreset = (type: 'punjab_rice' | 'mp_soybean' | 'mah_sugarcane') => {
    if (type === 'punjab_rice') {
      setFormData({ nitrogen: 130, phosphorus: 65, potassium: 45, ph: 6.7, rainfallMm: 900, temperatureC: 30, soilType: 'Alluvial Loamy Soil', state: 'Punjab' });
    } else if (type === 'mp_soybean') {
      setFormData({ nitrogen: 40, phosphorus: 80, potassium: 30, ph: 7.2, rainfallMm: 650, temperatureC: 26, soilType: 'Black Cotton Soil (Regur)', state: 'Madhya Pradesh' });
    } else if (type === 'mah_sugarcane') {
      setFormData({ nitrogen: 200, phosphorus: 100, potassium: 120, ph: 7.0, rainfallMm: 1200, temperatureC: 32, soilType: 'Deep Black Regur Soil', state: 'Maharashtra' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full text-xs font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Crop Doctor & Agronomy Engine • Powered by Google Gemini</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Smart Soil & Crop Recommendation System
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Enter your soil health parameters (NPK, pH) and climate data. Our AI model recommends the top 3 high-yield crops tailored to maximize income per acre.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Quick Presets:</span>
            <button
              onClick={() => loadSamplePreset('punjab_rice')}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              🌾 Punjab Paddy
            </button>
            <button
              onClick={() => loadSamplePreset('mp_soybean')}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-amber-50 dark:hover:bg-amber-950/40"
            >
              🌱 MP Soybean
            </button>
            <button
              onClick={() => loadSamplePreset('mah_sugarcane')}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-purple-50 dark:hover:bg-purple-950/40"
            >
              🎋 Mah Sugarcane
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form (5 Cols) */}
          <div className="lg:col-span-5">
            <form onSubmit={handlePredict} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>Soil Nutrient & Climate Input</span>
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Nitrogen (N) kg/ha
                  </label>
                  <input
                    type="number"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({ ...formData, nitrogen: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Phosphorus (P)
                  </label>
                  <input
                    type="number"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({ ...formData, phosphorus: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-blue-700 dark:text-blue-400 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Potassium (K)
                  </label>
                  <input
                    type="number"
                    value={formData.potassium}
                    onChange={(e) => setFormData({ ...formData, potassium: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-amber-700 dark:text-amber-400 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Soil pH Level
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => setFormData({ ...formData, ph: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    value={formData.rainfallMm}
                    onChange={(e) => setFormData({ ...formData, rainfallMm: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Temp (°C)
                  </label>
                  <input
                    type="number"
                    value={formData.temperatureC}
                    onChange={(e) => setFormData({ ...formData, temperatureC: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Soil Type
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100"
                >
                  <option value="Alluvial Loamy Soil">Alluvial Loamy Soil (Indo-Gangetic)</option>
                  <option value="Black Cotton Soil (Regur)">Black Cotton Regur Soil (Deccan)</option>
                  <option value="Red & Yellow Sandy Soil">Red & Yellow Sandy Soil</option>
                  <option value="Laterite Acidic Soil">Laterite Acidic Soil (Western Ghats)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  State / Agricultural Zone
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing Agronomy Models...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Generate AI Crop Recommendations</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: AI Recommendations (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Top 3 AI Recommended Crops
              </h3>
              <span className="text-xs text-slate-400 font-bold">Sorted by Net Revenue Potential</span>
            </div>

            <div className="space-y-4">
              {results.map((rec) => (
                <div
                  key={rec.rank}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all ${
                    rec.rank === 1
                      ? 'border-emerald-500 dark:border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base ${
                        rec.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        #{rec.rank}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{rec.cropName}</h4>
                          {rec.rank === 1 && (
                            <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              ⭐ Highest Profit
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Suitability Match: <span className="font-bold text-emerald-600 dark:text-emerald-400">{rec.suitabilityScore}%</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Revenue / Acre</p>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{rec.estimatedRevenueRs}</p>
                      <p className="text-[10px] font-semibold text-slate-500">Yield: {rec.expectedYieldPerAcre}</p>
                    </div>
                  </div>

                  {/* Reasons Grid */}
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Why This Crop Matches Your Soil:</p>
                    <div className="space-y-1.5">
                      {rec.reasons.map((r, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fertilizer Schedule */}
                  <div className="mt-4 p-3.5 bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl border border-amber-200/60 dark:border-amber-900/60 flex items-start space-x-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-amber-900 dark:text-amber-300">Recommended Fertilizer Schedule: </span>
                      <span className="text-amber-800 dark:text-amber-200/90">{rec.fertilizerSchedule}</span>
                    </div>
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
