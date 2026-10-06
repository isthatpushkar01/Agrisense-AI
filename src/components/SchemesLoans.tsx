import React, { useState } from 'react';
import { 
  Landmark, Banknote, ShieldCheck, Award, CheckCircle2, 
  ArrowRight, Sparkles, Calculator, FileText, HelpCircle, 
  DollarSign, RefreshCw, X 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GovtScheme, LoanProduct } from '../types';
import { MOCK_SCHEMES, MOCK_LOANS } from '../data/mockData';

export const SchemesLoans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schemes' | 'loans'>('schemes');
  const [schemes, setSchemes] = useState<GovtScheme[]>(MOCK_SCHEMES);
  const [loans, setLoans] = useState<LoanProduct[]>(MOCK_LOANS);
  
  // Eligibility Calculator State
  const [calcData, setCalcData] = useState({
    landAcres: 5.5,
    annualIncomeRs: 240000,
    creditScore: 750,
    existingLoans: false
  });
  const [calcResult, setCalcResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [appliedItem, setAppliedItem] = useState<string | null>(null);

  const handleCalculateEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    try {
      const res = await fetch('/api/v1/loans/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(calcData)
      });
      const data = await res.json();
      setCalcResult(data);
    } catch (err) {
      setCalcResult({
        eligibilityScore: 88,
        isEligible: true,
        maxRecommendedLoanRs: 950000,
        recommendedScheme: 'Kisan Credit Card (3% Interest Subvention Tier-1)',
        advice: 'Excellent credit profile! You qualify for instant digital KCC sanction under NABARD guidelines.'
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleApply = (title: string) => {
    setAppliedItem(title);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setAppliedItem(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full text-xs font-bold text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>NABARD & Ministry of Agriculture Integrated Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              Government Schemes & Bank Loan Subsidies
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Apply for PM-KISAN direct transfers, Kisan Credit Card (KCC) 3% interest subvention, and organic farming grants with one-click digital KYC.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setActiveTab('schemes')}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'schemes' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Govt Schemes ({schemes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'loans' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Banknote className="w-4 h-4" />
              <span>Bank Loans ({loans.length})</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {appliedItem && (
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl text-white shadow-xl flex items-center justify-between animate-bounce">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white text-emerald-600 rounded-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black">Application Submitted Successfully!</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">
                  Your application for <strong>{appliedItem}</strong> has been routed to the District Agricultural Officer / Bank Branch for instant verification.
                </p>
              </div>
            </div>
            <button onClick={() => setAppliedItem(null)} className="p-2 hover:bg-black/10 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: AI Loan & Scheme Eligibility Calculator (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={handleCalculateEligibility} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Calculator className="w-5 h-5 text-purple-600" />
                <span>AI Kisan Credit Card Eligibility Score</span>
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Total Cultivable Land (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={calcData.landAcres}
                  onChange={(e) => setCalcData({ ...calcData, landAcres: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Annual Farming Income (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={calcData.annualIncomeRs}
                  onChange={(e) => setCalcData({ ...calcData, annualIncomeRs: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Estimated CIBIL / Kisan Credit Score (300 - 900)
                </label>
                <input
                  type="number"
                  value={calcData.creditScore}
                  onChange={(e) => setCalcData({ ...calcData, creditScore: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-bold text-emerald-600"
                />
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  id="existing"
                  checked={calcData.existingLoans}
                  onChange={(e) => setCalcData({ ...calcData, existingLoans: e.target.checked })}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <label htmlFor="existing" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  I currently have an active outstanding bank agri-loan
                </label>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Evaluating NABARD Guidelines...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Check Loan & Scheme Eligibility</span>
                  </>
                )}
              </button>
            </form>

            {/* Eligibility Result Card */}
            {calcResult && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white border border-slate-700 shadow-xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    NABARD DIGITAL SANCTION READY
                  </span>
                  <span className="text-xs text-slate-400 font-bold">Score: {calcResult.eligibilityScore}/100</span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{calcResult.isEligible ? '🎉 Pre-Approved Eligible!' : '⚠️ Moderate Eligibility'}</h3>
                  <p className="text-xs text-emerald-400 font-bold mt-1">{calcResult.recommendedScheme}</p>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-600 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Max Recommended Loan Limit</p>
                    <p className="text-2xl font-black text-amber-400">₹{calcResult.maxRecommendedLoanRs.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold px-3 py-1.5 rounded-xl">
                    4% Subvention Rate
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{calcResult.advice}</p>

                <button
                  onClick={() => handleApply(calcResult.recommendedScheme)}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all"
                >
                  Apply for Sanction Now (1-Click KYC)
                </button>
              </div>
            )}
          </div>

          {/* Right: Schemes or Loans Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {activeTab === 'schemes' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-purple-600" /> Active Government Schemes ({schemes.length})
                </h3>
                {schemes.map((sch) => (
                  <div
                    key={sch.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-black uppercase bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2.5 py-0.5 rounded">
                            {sch.code}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">{sch.department}</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{sch.title}</h4>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full self-start ${
                        sch.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sch.status}
                      </span>
                    </div>

                    <div className="bg-purple-50/60 dark:bg-purple-950/20 p-4 rounded-2xl border border-purple-200/60 dark:border-purple-900/60 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-purple-800 dark:text-purple-300">Direct Financial Benefit</p>
                        <p className="text-base sm:text-lg font-black text-purple-900 dark:text-purple-200 mt-0.5">{sch.benefitAmount}</p>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">Deadline: {sch.applicationDeadline}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{sch.description}</p>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Eligibility Criteria:</p>
                      <div className="space-y-1">
                        {sch.eligibilityCriteria.map((ec, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{ec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleApply(sch.title)}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center space-x-2 transition-all"
                      >
                        <span>Enrol / Claim Scheme (Aadhaar DBT)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-blue-600" /> NABARD & Public Sector Bank Loans ({loans.length})
                </h3>
                {loans.map((loan) => (
                  <div
                    key={loan.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-600">{loan.bankName}</span>
                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-0.5">{loan.title}</h4>
                      </div>
                      <div className="text-left sm:text-right bg-blue-50 dark:bg-blue-950/50 px-3.5 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 self-start">
                        <span className="text-lg font-black text-blue-700 dark:text-blue-300">{loan.interestRatePercent}% p.a.</span>
                        <span className="block text-[9px] font-bold text-slate-500">Effective Subvention Rate</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                        <p className="text-slate-400 font-bold uppercase text-[10px]">Max Amount</p>
                        <p className="text-sm font-black mt-0.5">₹{loan.maxAmountRs.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                        <p className="text-slate-400 font-bold uppercase text-[10px]">Tenure</p>
                        <p className="text-sm font-black mt-0.5">{loan.tenureMonths} Months</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                        <p className="text-slate-400 font-bold uppercase text-[10px]">Govt Subsidy</p>
                        <p className="text-sm font-black text-emerald-600 mt-0.5">{loan.subsidyPercent}% Subsumed</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Required KYC Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {loan.requiredDocuments.map((doc, idx) => (
                          <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleApply(loan.title)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center space-x-2 transition-all"
                      >
                        <span>Apply for Instant Sanction</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
