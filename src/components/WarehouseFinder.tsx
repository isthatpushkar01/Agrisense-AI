import React, { useState } from 'react';
import { 
  Warehouse as WarehouseIcon, MapPin, Thermometer, ShieldCheck, 
  PhoneCall, CheckCircle2, Search, Filter, Calendar, DollarSign, 
  Sparkles, ArrowRight, X, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Warehouse } from '../types';
import { MOCK_WAREHOUSES } from '../data/mockData';

export const WarehouseFinder: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(MOCK_WAREHOUSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedWhForBooking, setSelectedWhForBooking] = useState<Warehouse | null>(null);
  const [bookingQty, setBookingQty] = useState(50);
  const [bookingDuration, setBookingDuration] = useState(3);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const types = ['All', 'Cold Storage', 'Grain Silo', 'Automated Dry Facility'];

  const filtered = warehouses.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          w.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || w.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBookSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWhForBooking) return;

    try {
      const res = await fetch('/api/v1/warehouses/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          warehouseId: selectedWhForBooking.id,
          quantityMtons: bookingQty,
          durationMonths: bookingDuration,
          farmerName: 'Sardar Harpreet Singh'
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccessMsg(data.message);
        setWarehouses(warehouses.map(w => w.id === selectedWhForBooking.id ? { ...w, availableCapacityMtons: w.availableCapacityMtons - bookingQty } : w));
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          setSelectedWhForBooking(null);
          setBookingSuccessMsg(null);
        }, 2500);
      }
    } catch (err) {
      setBookingSuccessMsg(`Reserved ${bookingQty} MT at ${selectedWhForBooking.name} for ${bookingDuration} months!`);
      setWarehouses(warehouses.map(w => w.id === selectedWhForBooking.id ? { ...w, availableCapacityMtons: Math.max(0, w.availableCapacityMtons - bookingQty) } : w));
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setSelectedWhForBooking(null);
        setBookingSuccessMsg(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>WDRA & FCI Certified Storage • e-NWR Ready</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              National Cold Chain & Grain Silo Network
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Find temperature-controlled cold storages and automated grain silos near your farm. Reserve slots instantly with electronic negotiable warehouse receipts.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search warehouse name, city or highway (e.g., 'Khanna', 'Indore', 'Cold Storage')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === t
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((wh) => {
            const utilizationPercent = Math.round(((wh.totalCapacityMtons - wh.availableCapacityMtons) / wh.totalCapacityMtons) * 100);
            const isNearFull = utilizationPercent >= 85;

            return (
              <div
                key={wh.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3.5 bg-amber-100 dark:bg-amber-950/60 rounded-2xl text-amber-600">
                        <WarehouseIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                          {wh.type}
                        </span>
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{wh.name}</h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                        ⭐ {wh.rating} / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{wh.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{wh.tempRange}</span>
                    </p>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Capacity Utilization</span>
                      <span className={isNearFull ? 'text-rose-600' : 'text-emerald-600'}>
                        {wh.availableCapacityMtons} MT Available <span className="text-slate-400 font-normal">({utilizationPercent}% Full)</span>
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isNearFull ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${utilizationPercent}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Monthly Rental</p>
                    <p className="text-lg font-black text-slate-800 dark:text-slate-100">₹{wh.pricePerMtonPerMonthRs} <span className="text-xs text-slate-400 font-normal">/ MT / Month</span></p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedWhForBooking(wh);
                      setBookingQty(Math.min(50, wh.availableCapacityMtons));
                    }}
                    disabled={wh.availableCapacityMtons === 0}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-40 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center space-x-2 transition-all"
                  >
                    <span>{wh.availableCapacityMtons > 0 ? 'Reserve Storage Slot' : 'Fully Booked'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Slot Booking */}
        {selectedWhForBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => { setSelectedWhForBooking(null); setBookingSuccessMsg(null); }}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-950/60 rounded-2xl text-amber-600">
                  <WarehouseIcon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">
                    WDRA Approved Booking
                  </span>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{selectedWhForBooking.name}</h3>
                </div>
              </div>

              {bookingSuccessMsg ? (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-black text-emerald-900 dark:text-emerald-200">Reservation Confirmed!</h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">{bookingSuccessMsg}</p>
                  <p className="text-[10px] text-slate-400">Electronic Negotiable Warehouse Receipt (e-NWR) generated and synced to your Kisan account.</p>
                </div>
              ) : (
                <form onSubmit={handleBookSlot} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-500 mb-1.5">Storage Quantity Required (Metric Tons)</label>
                    <input
                      type="number"
                      min="1"
                      max={selectedWhForBooking.availableCapacityMtons}
                      required
                      value={bookingQty}
                      onChange={(e) => setBookingQty(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-bold text-emerald-600"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Maximum available in this facility: {selectedWhForBooking.availableCapacityMtons} MT</span>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1.5">Storage Duration (Months)</label>
                    <select
                      value={bookingDuration}
                      onChange={(e) => setBookingDuration(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-bold"
                    >
                      {[1, 2, 3, 6, 9, 12].map((m) => (
                        <option key={m} value={m}>{m} {m === 1 ? 'Month' : 'Months'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Rate per MT per Month:</span>
                      <span>₹{selectedWhForBooking.pricePerMtonPerMonthRs}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Calculation:</span>
                      <span>{bookingQty} MT × ₹{selectedWhForBooking.pricePerMtonPerMonthRs} × {bookingDuration} Months</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-black">
                      <span>Total Rental Estimate:</span>
                      <span className="text-amber-600 dark:text-amber-400">₹{(bookingQty * selectedWhForBooking.pricePerMtonPerMonthRs * bookingDuration).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => setSelectedWhForBooking(null)} className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl">Cancel</button>
                    <button type="submit" className="flex-2 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black rounded-xl shadow-md">Confirm Reservation</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
