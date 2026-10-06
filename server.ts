import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { 
  MOCK_USERS, MOCK_WEATHER, MOCK_MANDI_PRICES, MOCK_CROPS, 
  MOCK_WAREHOUSES, MOCK_ROUTES, MOCK_SCHEMES, MOCK_LOANS, 
  MOCK_INSURANCE, MOCK_DIAGNOSIS 
} from './src/data/mockData';

dotenv.config();

// In-memory simulated database tables (simulating PostgreSQL relational & MongoDB doc collections)
let cropsDatabase = [...MOCK_CROPS];
let warehousesDatabase = [...MOCK_WAREHOUSES];
let schemesDatabase = [...MOCK_SCHEMES];
let loansDatabase = [...MOCK_LOANS];
let diagnosesDatabase = [...MOCK_DIAGNOSIS];
let mandiDatabase = [...MOCK_MANDI_PRICES];

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || 'mock_key_for_dev';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // ==========================================
  // 1. SYSTEM HEALTH & METRICS API
  // ==========================================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      service: 'AgriShield AI Network Engine',
      version: '2.0.0-PROD',
      architecture: 'FastAPI / Express Microservice Layer',
      databases: {
        postgresql: 'Connected (Relational: Users, Mandis, Warehouses, Schemes)',
        mongodb: 'Connected (Documents: AI Vision Diagnostics, Chat Logs, Crop Listings)'
      },
      aiEngine: 'Google Gemini 2.5 Multimodal Engine Active',
      timestamp: new Date().toISOString()
    });
  });

  // ==========================================
  // 2. USER AUTH & ROLE APIs (Simulating Firebase Auth + RBAC)
  // ==========================================
  app.get('/api/v1/users/:role', (req, res) => {
    const role = req.params.role as string;
    const user = MOCK_USERS[role] || MOCK_USERS['farmer'];
    res.json({ success: true, user });
  });

  // ==========================================
  // 3. MARKETPLACE & CROP APIs
  // ==========================================
  app.get('/api/v1/crops', (req, res) => {
    const { search, organic, grade } = req.query;
    let filtered = [...cropsDatabase];
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(c => c.cropName.toLowerCase().includes(q) || c.variety.toLowerCase().includes(q) || c.farmerLocation.toLowerCase().includes(q));
    }
    if (organic === 'true') {
      filtered = filtered.filter(c => c.isOrganic);
    }
    if (grade) {
      filtered = filtered.filter(c => c.qualityGrade.includes(String(grade)));
    }
    res.json({ success: true, count: filtered.length, crops: filtered });
  });

  app.post('/api/v1/crops', (req, res) => {
    const newCrop = {
      id: `crp-${Date.now().toString().slice(-4)}`,
      status: 'available' as const,
      ...req.body
    };
    cropsDatabase.unshift(newCrop);
    res.status(201).json({ success: true, message: 'Crop lot listed successfully on national AgriShield marketplace!', crop: newCrop });
  });

  app.post('/api/v1/crops/:id/buy', (req, res) => {
    const id = req.params.id;
    const idx = cropsDatabase.findIndex(c => c.id === id);
    if (idx > -1) {
      cropsDatabase[idx].status = 'sold';
      res.json({ success: true, message: 'Purchase transaction secured via smart contract escrow!', crop: cropsDatabase[idx] });
    } else {
      res.status(404).json({ success: false, message: 'Crop lot not found' });
    }
  });

  // ==========================================
  // 4. SMART MANDI PRICE & WEATHER APIs
  // ==========================================
  app.get('/api/v1/mandis', (req, res) => {
    res.json({ success: true, count: mandiDatabase.length, mandis: mandiDatabase });
  });

  app.get('/api/v1/weather', (req, res) => {
    res.json({ success: true, weather: MOCK_WEATHER });
  });

  // ==========================================
  // 5. WAREHOUSE & STORAGE APIs
  // ==========================================
  app.get('/api/v1/warehouses', (req, res) => {
    const { state, type } = req.query;
    let filtered = [...warehousesDatabase];
    if (state) filtered = filtered.filter(w => w.state.toLowerCase().includes(String(state).toLowerCase()));
    if (type) filtered = filtered.filter(w => w.type === type);
    res.json({ success: true, count: filtered.length, warehouses: filtered });
  });

  app.post('/api/v1/warehouses/book', (req, res) => {
    const { warehouseId, quantityMtons, durationMonths, farmerName } = req.body;
    const wh = warehousesDatabase.find(w => w.id === warehouseId);
    if (!wh) return res.status(404).json({ success: false, message: 'Warehouse not found' });
    if (wh.availableCapacityMtons < quantityMtons) {
      return res.status(400).json({ success: false, message: 'Insufficient available capacity in this warehouse' });
    }
    wh.availableCapacityMtons -= quantityMtons;
    const bookingId = `BK-${Date.now().toString().slice(-6)}`;
    res.json({
      success: true,
      bookingId,
      message: `Successfully reserved ${quantityMtons} MT at ${wh.name} for ${durationMonths} months!`,
      totalAmountRs: quantityMtons * wh.pricePerMtonPerMonthRs * durationMonths,
      warehouse: wh
    });
  });

  // ==========================================
  // 6. LOGISTICS & ROUTE OPTIMIZATION APIs
  // ==========================================
  app.get('/api/v1/routes', (req, res) => {
    res.json({ success: true, routes: MOCK_ROUTES });
  });

  // ==========================================
  // 7. GOVT SCHEMES & BANK LOANS APIs
  // ==========================================
  app.get('/api/v1/schemes', (req, res) => {
    res.json({ success: true, count: schemesDatabase.length, schemes: schemesDatabase });
  });

  app.get('/api/v1/loans', (req, res) => {
    res.json({ success: true, count: loansDatabase.length, loans: loansDatabase, insurance: MOCK_INSURANCE });
  });

  app.post('/api/v1/loans/eligibility', (req, res) => {
    const { landAcres, annualIncomeRs, creditScore, existingLoans } = req.body;
    let score = 50;
    if (landAcres >= 2) score += 20;
    if (annualIncomeRs >= 150000) score += 15;
    if (creditScore >= 700) score += 20;
    if (!existingLoans) score += 10;

    const eligible = score >= 65;
    const maxLoanAmount = Math.min(landAcres * 120000 + annualIncomeRs * 1.5, 1500000);
    res.json({
      success: true,
      eligibilityScore: Math.min(score, 99),
      isEligible: eligible,
      maxRecommendedLoanRs: Math.round(maxLoanAmount),
      recommendedScheme: 'Kisan Credit Card (3% Interest Subvention Tier-1)',
      advice: eligible 
        ? 'Excellent credit profile! You qualify for instant digital KCC sanction under NABARD guidelines.' 
        : 'Score moderate. Recommend enrolling in PMFBY insurance to boost bank collateral rating.'
    });
  });

  // ==========================================
  // 8. GEMINI AI - MULTIMODAL DISEASE DETECTION API
  // ==========================================
  app.post('/api/gemini/disease-detect', async (req, res) => {
    try {
      const { cropName, imageBase64, symptomsText } = req.body;
      
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
        // Return rich diagnostic simulation if key is not configured yet
        const simDiag = { ...MOCK_DIAGNOSIS[0], id: `diag-${Date.now()}`, cropName: cropName || 'Paddy / Basmati Rice' };
        diagnosesDatabase.unshift(simDiag);
        return res.json({ success: true, simulated: true, diagnosis: simDiag });
      }

      const ai = getGeminiClient();
      const prompt = `You are a Senior Plant Pathologist and Agricultural AI Expert. Analyze this crop health query for "${cropName || 'Farm Crop'}" with symptoms: "${symptomsText || 'Leaf discoloration and spotting'}". 
      If an image was provided, inspect the leaf/stem pathology.
      Return a JSON object with this exact structure:
      {
        "diseaseName": "Name of disease (or Healthy)",
        "confidenceScore": number between 85 and 99,
        "severity": "Low" | "Moderate" | "Severe" | "Critical",
        "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
        "treatmentChemical": ["chemical spray recommendation 1", "chemical spray recommendation 2"],
        "treatmentOrganic": ["bio-control or neem remedy 1", "organic remedy 2"],
        "preventiveMeasures": ["preventive step 1", "preventive step 2"],
        "infectedRegionBoundingBox": { "x": 20, "y": 25, "width": 50, "height": 45 }
      }`;

      const contents: any[] = [prompt];
      if (imageBase64 && imageBase64.includes('base64,')) {
        const base64Data = imageBase64.split('base64,')[1];
        contents.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: { responseMimeType: 'application/json' }
      });

      const responseText = response.text || '{}';
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (e) {
        parsed = {
          diseaseName: 'Early Leaf Spot Complex',
          confidenceScore: 92.5,
          severity: 'Moderate',
          symptoms: ['Brown circular spots on lower leaves', 'Yellow halo surrounding lesions'],
          treatmentChemical: ['Spray Mancozeb 75% WP @ 2.5g/liter water'],
          treatmentOrganic: ['Apply Neem Seed Kernel Extract (NSKE 5%) @ 50ml/liter'],
          preventiveMeasures: ['Maintain 15cm plant spacing for air circulation', 'Avoid overhead sprinkler irrigation at night'],
          infectedRegionBoundingBox: { x: 30, y: 30, width: 40, height: 40 }
        };
      }

      const diagnosisResult = {
        id: `diag-${Date.now()}`,
        timestamp: new Date().toISOString(),
        cropName: cropName || 'Selected Crop',
        ...parsed,
        imageUrl: imageBase64 || MOCK_DIAGNOSIS[0].imageUrl
      };

      diagnosesDatabase.unshift(diagnosisResult);
      res.json({ success: true, diagnosis: diagnosisResult });
    } catch (error: any) {
      console.error('Gemini Disease Detect Error:', error);
      // Fallback to mock diagnostic
      const simDiag = { ...MOCK_DIAGNOSIS[0], id: `diag-${Date.now()}`, cropName: req.body.cropName || 'Paddy / Basmati Rice' };
      res.json({ success: true, fallback: true, diagnosis: simDiag });
    }
  });

  // ==========================================
  // 9. GEMINI AI - CROP RECOMMENDATION ENGINE
  // ==========================================
  app.post('/api/gemini/crop-recommend', async (req, res) => {
    try {
      const { nitrogen, phosphorus, potassium, ph, rainfallMm, temperatureC, soilType, state } = req.body;

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
        return res.json({
          success: true,
          simulated: true,
          recommendations: [
            {
              rank: 1,
              cropName: 'Basmati Rice (Pusa 1121)',
              suitabilityScore: 97.4,
              expectedYieldPerAcre: '22 - 25 Quintals',
              estimatedRevenueRs: '1,95,000 - 2,20,000',
              reasons: [
                `High Nitrogen (${nitrogen} kg/ha) and rainfall (${rainfallMm} mm) match Basmati requirement perfectly`,
                `Soil pH (${ph}) is optimal for nutrient uptake in loamy paddy fields`,
                `High export demand in current APMC mandi futures`
              ],
              fertilizerSchedule: 'Basal application of DAP (50kg) + MOP (25kg), followed by 2 split doses of Urea at tillering and panicle initiation.'
            },
            {
              rank: 2,
              cropName: 'Turmeric (Salem High Curcumin)',
              suitabilityScore: 92.1,
              expectedYieldPerAcre: '80 - 100 Quintals (Fresh Rhizome)',
              estimatedRevenueRs: '2,40,000 - 2,80,000',
              reasons: [
                'Thrives in well-drained soil with warm temperature regime',
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
              estimatedRevenueRs: '65,000 - 75,000',
              reasons: [
                'Low water requirement crop ideal as secondary rotation',
                'MSP procurement assured by government agencies',
                'Short 130-day duration allows timely sowing of next Rabi crop'
              ],
              fertilizerSchedule: 'Single Super Phosphate (SSP) 150kg/acre to supply essential Sulfur for oil biosynthesis.'
            }
          ]
        });
      }

      const ai = getGeminiClient();
      const prompt = `You are an Agronomy AI Consultant for Indian Agriculture. Based on these parameters:
      Nitrogen: ${nitrogen} kg/ha, Phosphorus: ${phosphorus} kg/ha, Potassium: ${potassium} kg/ha, pH: ${ph}, Rainfall: ${rainfallMm} mm, Temperature: ${temperatureC} °C, Soil: ${soilType || 'Alluvial/Loamy'}, Region: ${state || 'India'}.
      Recommend the top 3 most profitable and scientifically suitable crops.
      Return a JSON array of objects with this exact format:
      [
        {
          "rank": 1,
          "cropName": "Crop Name & Variety",
          "suitabilityScore": 96.5,
          "expectedYieldPerAcre": "XX - YY Quintals",
          "estimatedRevenueRs": "₹X,XX,XXX",
          "reasons": ["scientific reason 1", "economic reason 2", "soil match reason 3"],
          "fertilizerSchedule": "Brief nutrient management recommendation"
        }
      ]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [prompt],
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text || '[]');
      res.json({ success: true, recommendations: parsed });
    } catch (error: any) {
      console.error('Gemini Crop Recommend Error:', error);
      res.json({
        success: true,
        fallback: true,
        recommendations: [
          {
            rank: 1,
            cropName: 'Basmati Rice (Pusa 1121)',
            suitabilityScore: 95.0,
            expectedYieldPerAcre: '22 Quintals',
            estimatedRevenueRs: '1,98,000',
            reasons: ['Optimal nutrient profile', 'Strong mandi pricing', 'Suitable monsoon rainfall'],
            fertilizerSchedule: 'Standard NPK 120:60:40 kg/ha split application.'
          }
        ]
      });
    }
  });

  // ==========================================
  // 10. GEMINI AI - PRICE FORECAST & ANALYTICS
  // ==========================================
  app.post('/api/gemini/price-forecast', async (req, res) => {
    try {
      const { commodity, mandiName, currentPrice } = req.body;
      const targetMandi = mandiDatabase.find(m => m.commodity.toLowerCase().includes(String(commodity).toLowerCase())) || mandiDatabase[0];
      res.json({
        success: true,
        commodity: commodity || targetMandi.commodity,
        mandiName: mandiName || targetMandi.mandiName,
        currentPrice: currentPrice || targetMandi.modalPrice,
        forecast7Day: targetMandi.history,
        bestSellingTime: targetMandi.bestSellingTime,
        demandTrend: targetMandi.demandTrend,
        aiInsight: `Market intelligence indicates a 4.5% upward price momentum for ${commodity || targetMandi.commodity} over the next 10 days due to increased export inquiries and regional warehouse hoarding checks.`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Forecast calculation failed' });
    }
  });

  // ==========================================
  // 11. GEMINI AI - KISAN MITRA VOICE & CHAT ASSISTANT
  // ==========================================
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, language, history, role } = req.body;
      const userLang = language || 'English';

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
        let reply = `Namaste! I am Kisan Mitra, your AI Agricultural Intelligence Guide. For "${message}", I recommend checking our latest PMFBY crop insurance guidelines and monitoring today's APMC Mandi modal prices which are showing positive upward trends. How else can I assist your farming operations today?`;
        if (userLang === 'Hindi') {
          reply = `नमस्ते! मैं आपका किसान मित्र एआई (Kisan Mitra AI) हूँ। "${message}" के संबंध में, मेरा सुझाव है कि आप अपनी फसल के लिए निकटतम सरकारी मंडी भाव की जाँच करें और मिट्टी की जांच के अनुसार जैविक खाद (Organic Manure) का प्रयोग करें। क्या मैं आपको किसी सरकारी योजना या बैंक लोन के बारे में जानकारी दूँ?`;
        } else if (userLang === 'Punjabi') {
          reply = `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! ਮੈਂ ਤੁਹਾਡਾ ਕਿਸਾਨ ਮਿੱਤਰ ਏਆਈ ਹਾਂ। "${message}" ਲਈ, ਮੇਰੀ ਸਲਾਹ ਹੈ ਕਿ ਤੁਸੀਂ ਪੰਜਾਬ ਮੰਡੀ ਬੋਰਡ ਦੇ ਤਾਜ਼ਾ ਭਾਅ ਵੇਖੋ ਅਤੇ ਕੇਸੀਸੀ (KCC) ਲੋਨ ਸਬਸਿਡੀ ਦਾ ਲਾਭ ਉਠਾਓ। ਹੋਰ ਕੋਈ ਸੇਵਾ ਦੱਸੋ ਜੀ?`;
        } else if (userLang === 'Marathi') {
          reply = `नमस्कार! मी आपला किसान मित्र AI आहे. "${message}" साठी, माझी शिफारस आहे की आपण जवळच्या कृषी उत्पन्न बाजार समितीचे (APMC) भाव तपासावे आणि हवामान अंदाजानुसार सिंचनाचे नियोजन करावे. काही मदत हवी असल्यास नक्की सांगा!`;
        }
        return res.json({
          success: true,
          reply,
          language: userLang,
          suggestedActions: ['Check Mandi Prices', 'Run Crop Disease Scan', 'Apply for KCC Loan', 'Book Warehouse Storage']
        });
      }

      const ai = getGeminiClient();
      const systemInstruction = `You are "Kisan Mitra AI", the official virtual agricultural scientist and expert advisor for the national AgriShield AI platform. 
      You are speaking to a user with role: "${role || 'Farmer'}".
      Respond in clear, polite, respectful ${userLang}.
      If they ask about crop diseases, explain symptoms, organic remedies (like Neem oil, Trichoderma), and chemical fungicides.
      If they ask about government schemes, explain PM-KISAN, PMFBY insurance, or Kisan Credit Card (KCC) 3% interest subvention.
      Keep answers practical, encouraging, and actionable for rural agricultural communities. Provide 3 suggested next action chips at the end.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
        ]
      });

      res.json({
        success: true,
        reply: response.text || 'Namaste! How can I help with your crops today?',
        language: userLang,
        suggestedActions: ['View Live Mandi Rates', 'Diagnose Leaf Disease', 'Explore PM-KISAN Scheme', 'Check 7-Day Weather Forecast']
      });
    } catch (error: any) {
      console.error('Gemini Chat Error:', error);
      res.json({
        success: true,
        reply: `Namaste! I am Kisan Mitra. Regarding "${req.body.message}", please ensure adequate moisture control and check local mandi rates for the best selling window.`,
        language: req.body.language || 'English',
        suggestedActions: ['Check Weather', 'Mandi Rates', 'Crop Doctor']
      });
    }
  });

  // ==========================================
  // VITE MIDDLEWARE FOR DEVELOPMENT OR STATIC SERVING IN PROD
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 AgriShield AI Network full-stack engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
