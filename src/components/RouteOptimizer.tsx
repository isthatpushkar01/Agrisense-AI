import React, { useState } from 'react';
import { 
  Truck, Navigation, MapPin, DollarSign, Clock, ShieldCheck, 
  Fuel, Compass, ArrowRight, RefreshCw, Sparkles, CheckCircle2 
} from 'lucide-react';
import { LogisticsRoute } from '../types';
import { MOCK_ROUTES } from '../data/mockData';

export const RouteOptimizer: React.FC = () => {
  const [routes, setRoutes] = useState<LogisticsRoute[]>(MOCK_ROUTES);
  const [source, setSource] = useState('Ludhiana Farms (Punjab)');
  const [destination, setDestination] = useState('Azadpur APMC Mandi (New Delhi)');
  const [vehicle, setVehicle] = useState<'Refrigerated Truck (10T)' | 'Heavy Trailer (25T)' | 'Mini Pickup (3T)' | 'Tractor Trolley'>('Refrigerated Truck (10T)');
  const [isCalculating, setIsCalculating] = useState(false);
  const [customRoute, setCustomRoute] = useState<LogisticsRoute | null>(MOCK_ROUTES[0]);

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const dist = Math.floor(Math.random() * 400 + 80);
      const rate = vehicle.includes('Refrigerated') ? 45 : vehicle.includes('Heavy') ? 65 : vehicle.includes('Mini') ? 32 : 28;
      const newRt: LogisticsRoute = {
        id: `rt-${Date.now()}`,
        providerName: 'Randhawa AI Freight Network',
        source,
        destination,
        distanceKm: dist,
        estimatedHours: Math.round((dist / 50) * 10) / 10,
        vehicleType: vehicle,
        costPerKmRs: rate,
        totalCostRs: dist * rate,
        trackingStatus: 'Available'
      };
      setCustomRoute(newRt);
      if (!routes.some(r => r.id === newRt.id)) {
        setRoutes([newRt, ...routes]);
      }
      setIsCalculating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-cyan-100 dark:bg-cyan-950/60 px-3 py-1 rounded-full text-xs font-bold text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>GPS Fleet Telemetry • Smart Freight Optimization</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Transport Route Optimizer & Cold Chain Logistics
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Calculate optimal GPS transport routes from farm to mandi or warehouse. Estimate fuel costs, toll savings, and book temperature-controlled refrigerated trucks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Route Planner Form (5 Cols) */}
          <div className="lg:col-span-5">
            <form onSubmit={handleOptimize} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Navigation className="w-5 h-5 text-cyan-600" />
                <span>Route Optimization Calculator</span>
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Source Location (Farm / Silo)
                </label>
                <input
                  type="text"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="E.g., Ludhiana Farms, Khanna Mandi..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Destination (APMC Mandi / Export Port)
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="E.g., Azadpur Mandi, Kandla Port, Vashi..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Vehicle Fleet Type
                </label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold"
                >
                  <option value="Refrigerated Truck (10T)">❄️ Refrigerated Truck (10T) - For Mangoes/Spices (₹45/km)</option>
                  <option value="Heavy Trailer (25T)">🚛 Heavy Trailer (25T) - For Bulk Grain Silos (₹65/km)</option>
                  <option value="Mini Pickup (3T)">🛻 Mini Pickup (3T) - For Local Mandi Transit (₹32/km)</option>
                  <option value="Tractor Trolley">🚜 Tractor Trolley - For Rural Short Haul (₹28/km)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-700 hover:to-teal-800 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-lg shadow-cyan-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Calculating AI GPS Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Optimize Route & Calculate Freight</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Optimized Result & Fleet Feed (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Custom Optimized Card */}
            {customRoute && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
                  <div>
                    <span className="bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      AI OPTIMIZED ROUTE
                    </span>
                    <h3 className="text-2xl font-black mt-2">{customRoute.source} ➔ {customRoute.destination}</h3>
                    <p className="text-cyan-300 text-xs font-semibold mt-0.5">Carrier: {customRoute.providerName}</p>
                  </div>

                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-600 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Total Freight Cost</p>
                    <p className="text-2xl font-black text-emerald-400">₹{customRoute.totalCostRs.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-slate-400">@ ₹{customRoute.costPerKmRs} / km</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 my-6 text-xs font-bold">
                  <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700">
                    <p className="text-slate-400 uppercase text-[10px]">Distance</p>
                    <p className="text-lg font-black mt-1">{customRoute.distanceKm} km</p>
                  </div>
                  <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700">
                    <p className="text-slate-400 uppercase text-[10px]">Est. Transit Time</p>
                    <p className="text-lg font-black mt-1">{customRoute.estimatedHours} Hours</p>
                  </div>
                  <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700">
                    <p className="text-slate-400 uppercase text-[10px]">Vehicle</p>
                    <p className="text-xs font-black mt-1 truncate">{customRoute.vehicleType.split('(')[0]}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cyan-950/50 p-4 rounded-2xl border border-cyan-800/80">
                  <div className="flex items-center space-x-2 text-xs">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Includes GPS Live Tracking, Fastag automatic toll routing, and transit insurance cover.</span>
                  </div>
                  <button className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-md whitespace-nowrap">
                    Dispatch Fleet Now
                  </button>
                </div>
              </div>
            )}

            {/* List of Active Fleet Routes */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-800 dark:text-slate-100">Available National Logistics Fleets</h3>
              <div className="space-y-3">
                {routes.map((rt) => (
                  <div key={rt.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="p-3 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 rounded-xl">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{rt.providerName}</span>
                        <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{rt.source} ➔ {rt.destination}</h4>
                        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-500 mt-1">
                          <span>📍 {rt.distanceKm} km</span>
                          <span>⏱️ {rt.estimatedHours}h</span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold">{rt.vehicleType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                      <p className="text-base font-black text-slate-800 dark:text-slate-100">₹{rt.totalCostRs.toLocaleString('en-IN')}</p>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        rt.trackingStatus === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rt.trackingStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
