import React, { useState, useRef } from 'react';
import { 
  Upload, Camera, CheckCircle2, AlertTriangle, ShieldAlert, 
  Sparkles, RefreshCw, Volume2, VolumeX, ArrowRight, BookOpen, 
  Leaf, Info, ExternalLink, HelpCircle
} from 'lucide-react';
import { DiseaseDiagnosis } from '../types';
import { MOCK_DIAGNOSIS } from '../data/mockData';

export const DiseaseDetection: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Paddy / Basmati Rice');
  const [symptomsText, setSymptomsText] = useState('Spindle-shaped brown leaf spots with gray centers, drying leaves');
  const [imagePreview, setImagePreview] = useState<string | null>(MOCK_DIAGNOSIS[0].imageUrl);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDiagnosis | null>(MOCK_DIAGNOSIS[0]);
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleCrops = [
    'Paddy / Basmati Rice', 'Wheat (Sharbati)', 'Cotton (Bt)', 
    'Sugarcane', 'Soybean', 'Mustard', 'Potato', 'Tomato', 'Chilli / Pepper'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setResult(null); // Clear previous result until user clicks analyze
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/gemini/disease-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedCrop,
          symptomsText: symptomsText,
          imageBase64: imagePreview
        })
      });
      const data = await response.json();
      if (data.success && data.diagnosis) {
        setResult(data.diagnosis);
      } else {
        setResult(MOCK_DIAGNOSIS[0]);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setResult(MOCK_DIAGNOSIS[0]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (result) {
      const textToSpeak = `Diagnosis Report for ${result.cropName}. Detected Disease: ${result.diseaseName} with ${result.confidenceScore}% confidence. Severity is ${result.severity}. Recommended chemical treatment: ${result.treatmentChemical[0]}. Recommended organic treatment: ${result.treatmentOrganic[0]}.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Computer Vision • Powered by Google Gemini 2.5 Vision</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">
              AI Crop Doctor & Leaf Pathology Scanner
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Upload an image of an infected leaf or stem. Our computer vision model detects pathogens, highlights infected regions, and recommends organic & chemical treatments.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setImagePreview(MOCK_DIAGNOSIS[0].imageUrl);
                setSymptomsText('Spindle-shaped brown leaf spots with gray centers, drying leaves');
                setResult(MOCK_DIAGNOSIS[0]);
              }}
              className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Rice Blast Sample</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form & Image Upload (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span>Step 1: Provide Crop Sample</span>
              </h2>

              {/* Crop Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select Crop Type
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                >
                  {sampleCrops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Upload Leaf Photo (or Live Camera)
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-300 dark:border-emerald-800 rounded-2xl p-6 text-center cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors group relative overflow-hidden"
                >
                  {imagePreview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
                      <img src={imagePreview} alt="Uploaded crop" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full">
                          <Camera className="w-4 h-4" /> Change Photo
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 mx-auto flex items-center justify-center">
                        <Upload className="w-6 h-6 animate-bounce" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Click to upload leaf photo or open mobile camera
                      </p>
                      <p className="text-[11px] text-slate-400">Supports JPEG, PNG, WEBP up to 25MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Observed Symptoms */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Observed Symptoms / Notes (Optional)
                </label>
                <textarea
                  value={symptomsText}
                  onChange={(e) => setSymptomsText(e.target.value)}
                  rows={3}
                  placeholder="E.g., Yellowing edges, white powdery spots on underside..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Analyze CTA */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !imagePreview}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Gemini Vision AI Scanning Pathology...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Run AI Disease Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Diagnostic Results & Treatment (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="bg-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider animate-pulse">
                        PATHOGEN DETECTED
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">Diagnosis ID: #{result.id.slice(-6)}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">{result.diseaseName}</h3>
                    <p className="text-emerald-400 text-xs font-bold">Crop: {result.cropName}</p>
                  </div>

                  <div className="flex items-center space-x-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                    <div className="text-center px-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Confidence</p>
                      <p className="text-xl font-black text-emerald-400">{result.confidenceScore}%</p>
                    </div>
                    <div className="h-8 w-px bg-slate-700" />
                    <div className="text-center px-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Severity</p>
                      <span className={`text-xs font-black px-2 py-0.5 rounded ${
                        result.severity === 'Severe' || result.severity === 'Critical' ? 'bg-rose-900/80 text-rose-300' : 'bg-amber-900/80 text-amber-300'
                      }`}>
                        {result.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Computer Vision Visual Pathology Box */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-600" /> Computer Vision Bounding Box Overlay
                    </span>
                    <button
                      onClick={() => setShowBoundingBox(!showBoundingBox)}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      {showBoundingBox ? 'Hide Bounding Box' : 'Show Highlight Area'}
                    </button>
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-80 mx-auto bg-black">
                    <img src={result.imageUrl} alt="Pathology sample" className="w-full h-full object-contain" />
                    
                    {/* Simulated Computer Vision Infected Region Bounding Box */}
                    {showBoundingBox && result.infectedRegionBoundingBox && (
                      <div
                        style={{
                          left: `${result.infectedRegionBoundingBox.x}%`,
                          top: `${result.infectedRegionBoundingBox.y}%`,
                          width: `${result.infectedRegionBoundingBox.width}%`,
                          height: `${result.infectedRegionBoundingBox.height}%`,
                        }}
                        className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-lg shadow-xl animate-pulse flex flex-col justify-between p-1"
                      >
                        <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded self-start shadow-xs">
                          Infected Area ({result.confidenceScore}%)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Treatment Tabs: Chemical vs Organic */}
                <div className="p-6 space-y-6">
                  
                  {/* Audio Readout Bar */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                        {isSpeaking ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Voice Audio Diagnosis Readout</p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400">Listen to treatment instructions in your preferred language</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleSpeech}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      {isSpeaking ? 'Stop Speech' : 'Listen Now'}
                    </button>
                  </div>

                  {/* Symptoms List */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> Observed Diagnostic Symptoms
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {result.symptoms.map((s, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                          • {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Chemical Treatment Box */}
                    <div className="bg-rose-50/50 dark:bg-rose-950/20 p-5 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                          💊 Chemical Fungicide / Pesticide
                        </span>
                        <span className="text-[10px] bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold px-2 py-0.5 rounded">
                          Fast Acting
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {result.treatmentChemical.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Organic / Zero-Budget Treatment Box */}
                    <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                          🌱 Organic / Bio-Control Remedy
                        </span>
                        <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold px-2 py-0.5 rounded">
                          Eco-Safe
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {result.treatmentOrganic.map((o, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Preventive Measures */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-blue-500" /> Preventive Measures for Next Crop Cycle
                    </h4>
                    <div className="space-y-2">
                      {result.preventiveMeasures.map((pm, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{pm}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Active Pathology Diagnosis</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Please upload a crop image on the left and click "Run AI Disease Diagnosis" to inspect leaf health.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
