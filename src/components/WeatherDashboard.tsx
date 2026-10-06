import React, { useState } from 'react';
import { 
  CloudRain, Sun, CloudLightning, Wind, Droplets, Thermometer, 
  AlertTriangle, ShieldAlert, MapPin, RefreshCw, Sparkles, Eye, Compass 
} from 'lucide-react';
import { WeatherData } from '../types';
import { MOCK_WEATHER } from '../data/mockData';

export const WeatherDashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER);
  const [selectedCity, setSelectedCity] = useState('Ludhiana, Punjab');
  const [isSyncing, setIsSyncing] = useState(false);

  const cities = [
    'Ludhiana, Punjab', 'New Delhi, NCR', 'Indore, Madhya Pradesh', 
    'Pune, Maharashtra', 'Guntur, Andhra Pradesh', 'Patna, Bihar'
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // Simulate slight weather variation for realism
      setWeather({
        ...weather,
        temp: Math.round((weather.temp + (Math.random() * 1.5 - 0.7)) * 10) / 10,
        humidity: Math.min(Math.max(Math.round(weather.humidity + (Math.random() * 4 - 2)), 30), 98)
      });
      setIsSyncing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full text-xs font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Satellite Weather Intelligence • IMD Integrated</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Agricultural Weather & 7-Day Monsoon Forecast
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Real-time micro-climate monitoring, humidity trackers, and cyclone alerts to protect crops from unpredictable weather patterns.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs focus:ring-2 focus:ring-emerald-500"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync IMD</span>
            </button>
          </div>
        </div>

        {/* Severe Weather Alert Banners */}
        <div className="space-y-4">
          {weather.alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md ${
                alt.type === 'WARNING'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-3 rounded-2xl shrink-0 ${alt.type === 'WARNING' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'}`}>
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                      {alt.type}
                    </span>
                    <h4 className="text-base font-black">{alt.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm font-medium mt-1 leading-relaxed opacity-90">
                    {alt.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-2 text-[11px] font-bold opacity-80">
                    <span>📍 Regions: {alt.affectedRegions.join(', ')}</span>
                  </div>
                </div>
              </div>

              <button className="px-4 py-2 bg-white/80 dark:bg-slate-900/80 hover:bg-white text-xs font-bold rounded-xl shadow-xs border border-current/20 whitespace-nowrap self-start sm:self-center">
                View Advisory Steps
              </button>
            </div>
          ))}
        </div>

        {/* Current Weather Big Widget & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Hero Card (6 Cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-300" />
                <span className="text-lg font-bold">{selectedCity}</span>
              </div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                Live Doppler Station
              </span>
            </div>

            <div className="my-8 flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-6xl sm:text-7xl font-black tracking-tighter">{weather.temp}°C</h2>
                <p className="text-xl font-bold text-blue-200 mt-1 flex items-center gap-2">
                  <CloudRain className="w-6 h-6 text-amber-300 animate-bounce" />
                  <span>{weather.condition}</span>
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-xs text-blue-200 font-bold uppercase">Today Range</p>
                <p className="text-2xl font-black">23°C / 32°C</p>
                <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">
                  Optimal for Kharif Sowing
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 relative z-10 text-xs font-bold">
              <div>
                <p className="text-blue-200 uppercase text-[10px]">Rainfall</p>
                <p className="text-lg font-black mt-0.5">{weather.rainfallMm} mm</p>
              </div>
              <div>
                <p className="text-blue-200 uppercase text-[10px]">Humidity</p>
                <p className="text-lg font-black mt-0.5">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-blue-200 uppercase text-[10px]">Wind Speed</p>
                <p className="text-lg font-black mt-0.5">{weather.windSpeedKmh} km/h</p>
              </div>
            </div>
          </div>

          {/* Detailed Agri Metrics Grid (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Soil Moisture Index</span>
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">74%</h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">Optimal Saturation</p>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-blue-600 h-full w-[74%]" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Evapotranspiration</span>
                <Thermometer className="w-6 h-6 text-amber-500" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">4.2 mm/d</h3>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">Moderate Water Loss</p>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 leading-tight">Recommend sprinkler irrigation in early morning hours.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Wind Direction</span>
                <Compass className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">NW • 315°</h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">Safe for Pesticide Spraying</p>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 leading-tight">Wind speed under 15 km/h ensures zero chemical drift.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Solar UV Index</span>
                <Sun className="w-6 h-6 text-purple-500" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">8.5 (High)</h3>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1">High Photosynthesis Rate</p>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 leading-tight">Accelerates chlorophyll production in young wheat seedlings.</p>
            </div>
          </div>

        </div>

        {/* 7-Day Forecast Grid */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-600" /> 7-Day Precision Agricultural Weather Forecast
            </h3>
            <span className="text-xs font-bold text-slate-400">IMD High-Resolution Grid</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {weather.forecast7Day.map((fc, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                  idx === 0
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">{fc.day}</span>
                  {idx === 0 && <span className="block text-[9px] font-bold text-emerald-600">TODAY</span>}
                </div>

                <div className="my-4 flex justify-center">
                  {fc.condition === 'Sunny' ? <Sun className="w-8 h-8 text-amber-500" /> :
                   fc.condition === 'Rainy' ? <CloudRain className="w-8 h-8 text-blue-500" /> :
                   fc.condition === 'Thunderstorm' ? <CloudLightning className="w-8 h-8 text-purple-500" /> :
                   <Droplets className="w-8 h-8 text-cyan-500" />}
                </div>

                <div>
                  <p className="text-base font-black text-slate-800 dark:text-slate-100">{fc.maxTemp}° / <span className="text-xs text-slate-400">{fc.minTemp}°</span></p>
                  <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3" /> {fc.rainProb}% Rain
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
