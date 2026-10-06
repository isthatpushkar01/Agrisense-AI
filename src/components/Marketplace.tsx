import React, { useState } from 'react';
import { 
  ShoppingCart, Plus, ShieldCheck, Award, MapPin, Filter, 
  Search, CheckCircle2, ArrowRight, Package, DollarSign, Sparkles, X, Heart 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CropListing, UserRole } from '../types';
import { MOCK_CROPS } from '../data/mockData';

interface MarketplaceProps {
  currentRole: UserRole;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ currentRole }) => {
  const [crops, setCrops] = useState<CropListing[]>(MOCK_CROPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [filterOrganicOnly, setFilterOrganicOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCropModal, setSelectedCropModal] = useState<CropListing | null>(null);

  // New Listing Form State
  const [newCrop, setNewCrop] = useState({
    cropName: 'Basmati Rice',
    variety: 'Pusa 1121 Export Quality',
    quantityMtons: 20,
    pricePerQuintal: 8800,
    qualityGrade: 'Grade A+ (Export)' as const,
    isOrganic: true,
    harvestDate: '2026-07-28',
    farmerName: 'Sardar Harpreet Singh',
    farmerLocation: 'Ludhiana, Punjab',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600'
  });

  const filteredCrops = crops.filter((c) => {
    const matchesSearch = c.cropName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || c.qualityGrade.includes(selectedGrade);
    const matchesOrganic = !filterOrganicOnly || c.isOrganic;
    return matchesSearch && matchesGrade && matchesOrganic && c.status === 'available';
  });

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCrop,
          farmerId: 'usr-f101'
        })
      });
      const data = await response.json();
      if (data.success && data.crop) {
        setCrops([data.crop, ...crops]);
        setShowAddModal(false);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err) {
      const created: CropListing = {
        id: `crp-${Date.now()}`,
        farmerId: 'usr-f101',
        status: 'available',
        ...newCrop
      };
      setCrops([created, ...crops]);
      setShowAddModal(false);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleBuyCrop = async (id: string) => {
    try {
      await fetch(`/api/v1/crops/${id}/buy`, { method: 'POST' });
    } catch (e) {}
    setCrops(crops.map(c => c.id === id ? { ...c, status: 'sold' } : c));
    setSelectedCropModal(null);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>National Buyer Marketplace • Direct Farmer-to-Trader Escrow</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Verified Agri-Commodities & Direct Escrow Bidding
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Browse quality-certified harvests without middlemen. Every lot is verified by AGMARKNET quality inspectors with guaranteed smart contract payment escrow.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>List Crop for Sale (Farmer)</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by crop name, variety, farmer name or city (e.g., 'Ludhiana Basmati')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Quality Grades</option>
              <option value="Grade A+">Grade A+ (Export)</option>
              <option value="Grade A">Grade A (Standard)</option>
              <option value="Grade B">Grade B (Commercial)</option>
            </select>

            <label className="flex items-center space-x-2 cursor-pointer bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <input
                type="checkbox"
                checked={filterOrganicOnly}
                onChange={(e) => setFilterOrganicOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-amber-500" /> Organic Only</span>
            </label>
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between transform hover:-translate-y-1 group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={crop.imageUrl} alt={crop.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {crop.isOrganic && (
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-300" /> Certified Organic
                      </span>
                    )}
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {crop.qualityGrade.split(' ')[0]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Wholesale Rate</p>
                    <p className="text-base font-black text-emerald-600 dark:text-emerald-400">₹{crop.pricePerQuintal} <span className="text-xs font-normal text-slate-500">/ Qtl</span></p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {crop.farmerLocation}</span>
                    <span>Harvested: {crop.harvestDate}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{crop.cropName}</h3>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{crop.variety}</p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Available Lot Size</p>
                      <p className="text-base font-black text-slate-800 dark:text-slate-100">{crop.quantityMtons} <span className="text-xs font-normal text-slate-500">Metric Tons</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Total Lot Value</p>
                      <p className="text-base font-black text-blue-600 dark:text-blue-400">₹{(crop.quantityMtons * 10 * crop.pricePerQuintal).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex items-center space-x-3">
                <button
                  onClick={() => setSelectedCropModal(crop)}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Direct / Bid Escrow</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <Package className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold">No Crops Matching Your Criteria</h3>
            <p className="text-xs text-slate-400">Try removing organic filter or search a different crop name.</p>
          </div>
        )}

        {/* Modal: Direct Purchase & Smart Contract Escrow */}
        {selectedCropModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setSelectedCropModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl text-emerald-600">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                    Smart Contract Escrow Protected
                  </span>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{selectedCropModal.cropName} Purchase</h3>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Farmer Seller:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{selectedCropModal.farmerName} ({selectedCropModal.farmerLocation})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Variety & Quality:</span>
                  <span className="font-bold text-emerald-600">{selectedCropModal.variety} • {selectedCropModal.qualityGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quantity Required:</span>
                  <span className="font-bold">{selectedCropModal.quantityMtons} Metric Tons ({selectedCropModal.quantityMtons * 10} Quintals)</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-black">
                  <span>Total Escrow Value:</span>
                  <span className="text-blue-600 dark:text-blue-400">₹{(selectedCropModal.quantityMtons * 10 * selectedCropModal.pricePerQuintal).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-500 leading-relaxed">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Funds are locked in AGMARKNET smart escrow until physical quality verification is completed at destination warehouse.</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Includes automatic transport route coordination with Randhawa Refrigerated Freight.</span>
                </p>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setSelectedCropModal(null)}
                  className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuyCrop(selectedCropModal.id)}
                  className="flex-2 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2"
                >
                  <span>Confirm Purchase & Lock Escrow</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Listing */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">List Your Harvest on Marketplace</h3>

              <form onSubmit={handleCreateListing} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    value={newCrop.cropName}
                    onChange={(e) => setNewCrop({ ...newCrop, cropName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Quantity (Metric Tons)</label>
                    <input
                      type="number"
                      required
                      value={newCrop.quantityMtons}
                      onChange={(e) => setNewCrop({ ...newCrop, quantityMtons: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Price per Quintal (₹)</label>
                    <input
                      type="number"
                      required
                      value={newCrop.pricePerQuintal}
                      onChange={(e) => setNewCrop({ ...newCrop, pricePerQuintal: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Publish to Network</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
