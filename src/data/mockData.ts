import { 
  User, WeatherData, MandiPrice, CropListing, Warehouse, 
  LogisticsRoute, GovtScheme, LoanProduct, InsurancePolicy, DiseaseDiagnosis 
} from '../types';

export const MOCK_USERS: Record<string, User> = {
  farmer: {
    id: 'usr-f101',
    name: 'Sardar Harpreet Singh',
    email: 'harpreet.singh@kisan-net.in',
    phone: '+91 98765-43210',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1595064085577-7c2ef98ec311?auto=format&fit=crop&q=80&w=250',
    location: 'Ludhiana, Punjab',
    verified: true,
    farmSizeAcres: 24,
    companyName: 'Khalsa Green Farms & Orchards'
  },
  buyer: {
    id: 'usr-b202',
    name: 'Vikramaditya Agarwal',
    email: 'v.agarwal@agri-traders.com',
    phone: '+91 98111-22334',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    location: 'Azadpur Mandi, New Delhi',
    verified: true,
    companyName: 'Agarwal Global Exports Pvt Ltd'
  },
  warehouse_owner: {
    id: 'usr-w303',
    name: 'Rameshwar Dayal Sharma',
    email: 'rd.sharma@sharmacoldstorage.in',
    phone: '+91 94220-55667',
    role: 'warehouse_owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    location: 'Indore, Madhya Pradesh',
    verified: true,
    companyName: 'Sharma Agro-Cold Chain & Warehousing'
  },
  government_officer: {
    id: 'usr-g404',
    name: 'Dr. Sunita Deshmukh',
    email: 's.deshmukh@agri.gov.in',
    phone: '+91 91122-33445',
    role: 'government_officer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    location: 'Krishi Bhawan, New Delhi',
    verified: true,
    companyName: 'Ministry of Agriculture & Farmers Welfare'
  },
  bank_officer: {
    id: 'usr-bk505',
    name: 'Anand Kulkarni',
    email: 'a.kulkarni@nabard-ruralbank.in',
    phone: '+91 93344-55667',
    role: 'bank_officer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    location: 'Pune, Maharashtra',
    verified: true,
    companyName: 'National Bank for Agriculture & Rural Development (NABARD)'
  },
  insurance_company: {
    id: 'usr-ins606',
    name: 'Meenakshi Sundaram',
    email: 'm.sundaram@aic-india.com',
    phone: '+91 98440-11223',
    role: 'insurance_company',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    location: 'Hyderabad, Telangana',
    verified: true,
    companyName: 'Agriculture Insurance Company of India (AIC)'
  },
  logistics_company: {
    id: 'usr-l707',
    name: 'Jaspal Singh Randhawa',
    email: 'jaspal@randhawalogistics.in',
    phone: '+91 98880-99000',
    role: 'logistics_company',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    location: 'Ambala, Haryana',
    verified: true,
    companyName: 'Randhawa Refrigerated Roadways & Freight'
  },
  super_admin: {
    id: 'usr-sa808',
    name: 'Arjun Verma (CTO)',
    email: 'arjun.verma@agrishield.ai',
    phone: '+91 99000-11000',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    location: 'Bangalore, Karnataka',
    verified: true,
    companyName: 'AgriShield AI Network HQ'
  }
};

export const getUserForRole = (role?: string): User => {
  if (!role) return MOCK_USERS['farmer'];
  const r = role.toLowerCase().trim();
  if (r === 'farmer' || r === 'kisan') return MOCK_USERS['farmer'];
  if (r === 'buyer' || r === 'trader') return MOCK_USERS['buyer'];
  if (r === 'warehouse owner' || r === 'warehouse_owner') return MOCK_USERS['warehouse_owner'];
  if (r === 'govt officer' || r === 'government officer' || r === 'government_officer') return MOCK_USERS['government_officer'];
  if (r === 'bank officer' || r === 'bank_officer') return MOCK_USERS['bank_officer'];
  if (r === 'insurance company' || r === 'insurance_company') return MOCK_USERS['insurance_company'];
  if (r === 'logistics company' || r === 'logistics provider' || r === 'logistics_company') return MOCK_USERS['logistics_company'];
  if (r === 'super admin' || r === 'super_admin' || r === 'superadmin') return MOCK_USERS['super_admin'];
  return MOCK_USERS['farmer'];
};

export const MOCK_WEATHER: WeatherData = {
  temp: 29.5,
  humidity: 68,
  rainfallMm: 12.4,
  windSpeedKmh: 14.2,
  condition: 'Partly Cloudy',
  forecast7Day: [
    { day: 'Mon', maxTemp: 31, minTemp: 23, rainProb: 15, condition: 'Sunny' },
    { day: 'Tue', maxTemp: 32, minTemp: 24, rainProb: 20, condition: 'Partly Cloudy' },
    { day: 'Wed', maxTemp: 28, minTemp: 22, rainProb: 80, condition: 'Rainy' },
    { day: 'Thu', maxTemp: 27, minTemp: 21, rainProb: 90, condition: 'Thunderstorm' },
    { day: 'Fri', maxTemp: 29, minTemp: 22, rainProb: 40, condition: 'Humid' },
    { day: 'Sat', maxTemp: 30, minTemp: 23, rainProb: 10, condition: 'Sunny' },
    { day: 'Sun', maxTemp: 31, minTemp: 24, rainProb: 5, condition: 'Sunny' },
  ],
  alerts: [
    {
      id: 'alt-101',
      type: 'WARNING',
      title: 'Heavy Monsoon Downpour Alert (Orange)',
      message: 'Expected rainfall exceeding 60mm over next 48 hours in Punjab and Northern Haryana. Ensure drainage channels in wheat and paddy fields are cleared immediately.',
      affectedRegions: ['Punjab', 'Haryana', 'Western UP']
    },
    {
      id: 'alt-102',
      type: 'ADVISORY',
      title: 'High Humidity Pest Advisory',
      message: 'Elevated humidity (>70%) increases risk of Brown Plant Hopper and Blast disease in Paddy. Monitor leaf sheaths.',
      affectedRegions: ['All India']
    }
  ]
};

export const MOCK_MANDI_PRICES: MandiPrice[] = [
  {
    id: 'mandi-1',
    mandiName: 'Azadpur APMC Mandi',
    state: 'New Delhi',
    commodity: 'Basmati Rice (Pusa 1121)',
    minPrice: 8200,
    maxPrice: 9400,
    modalPrice: 8850,
    changePercent: 3.4,
    lastUpdated: '10 mins ago',
    bestSellingTime: 'Next 12 Days (Before Festival Peak)',
    demandTrend: 'High',
    history: [
      { date: 'Jul 20', price: 8400, aiForecast: 8420 },
      { date: 'Jul 21', price: 8550, aiForecast: 8500 },
      { date: 'Jul 22', price: 8500, aiForecast: 8600 },
      { date: 'Jul 23', price: 8700, aiForecast: 8750 },
      { date: 'Jul 24', price: 8650, aiForecast: 8800 },
      { date: 'Jul 25', price: 8800, aiForecast: 8850 },
      { date: 'Jul 26', price: 8850, aiForecast: 8900 },
      { date: 'Jul 27', price: 8950, aiForecast: 9050 },
      { date: 'Jul 28', price: 9100, aiForecast: 9200 },
      { date: 'Jul 29', price: 9250, aiForecast: 9350 }
    ]
  },
  {
    id: 'mandi-2',
    mandiName: 'Khanna Grain Market (Asia Largest)',
    state: 'Punjab',
    commodity: 'Wheat (Sharbati Premium)',
    minPrice: 2450,
    maxPrice: 2780,
    modalPrice: 2620,
    changePercent: 1.8,
    lastUpdated: '25 mins ago',
    bestSellingTime: 'Hold for 3 weeks (MSP Procurement surge)',
    demandTrend: 'Moderate',
    history: [
      { date: 'Jul 20', price: 2540, aiForecast: 2550 },
      { date: 'Jul 21', price: 2560, aiForecast: 2570 },
      { date: 'Jul 22', price: 2580, aiForecast: 2590 },
      { date: 'Jul 23', price: 2600, aiForecast: 2600 },
      { date: 'Jul 24', price: 2590, aiForecast: 2610 },
      { date: 'Jul 25', price: 2610, aiForecast: 2620 },
      { date: 'Jul 26', price: 2620, aiForecast: 2640 },
      { date: 'Jul 27', price: 2650, aiForecast: 2670 },
      { date: 'Jul 28', price: 2680, aiForecast: 2700 }
    ]
  },
  {
    id: 'mandi-3',
    mandiName: 'Indore Devi Ahilya Mandi',
    state: 'Madhya Pradesh',
    commodity: 'Yellow Soybean (JS 9560)',
    minPrice: 4800,
    maxPrice: 5350,
    modalPrice: 5120,
    changePercent: -1.2,
    lastUpdated: '1 hour ago',
    bestSellingTime: 'Sell Immediately (Global oilseed dip predicted)',
    demandTrend: 'Low',
    history: [
      { date: 'Jul 20', price: 5300, aiForecast: 5280 },
      { date: 'Jul 21', price: 5250, aiForecast: 5220 },
      { date: 'Jul 22', price: 5200, aiForecast: 5180 },
      { date: 'Jul 23', price: 5150, aiForecast: 5150 },
      { date: 'Jul 24', price: 5180, aiForecast: 5140 },
      { date: 'Jul 25', price: 5140, aiForecast: 5120 },
      { date: 'Jul 26', price: 5120, aiForecast: 5080 },
      { date: 'Jul 27', price: 5080, aiForecast: 5020 }
    ]
  },
  {
    id: 'mandi-4',
    mandiName: 'Vashi APMC Wholesale Market',
    state: 'Maharashtra',
    commodity: 'Alphonso Mango / Kesar Mango',
    minPrice: 12000,
    maxPrice: 18000,
    modalPrice: 15500,
    changePercent: 6.5,
    lastUpdated: '5 mins ago',
    bestSellingTime: 'Peak Export Demand Active Now!',
    demandTrend: 'High',
    history: [
      { date: 'Jul 20', price: 14200, aiForecast: 14400 },
      { date: 'Jul 21', price: 14600, aiForecast: 14700 },
      { date: 'Jul 22', price: 14800, aiForecast: 14900 },
      { date: 'Jul 23', price: 15000, aiForecast: 15100 },
      { date: 'Jul 24', price: 15200, aiForecast: 15300 },
      { date: 'Jul 25', price: 15400, aiForecast: 15500 },
      { date: 'Jul 26', price: 15500, aiForecast: 15800 }
    ]
  },
  {
    id: 'mandi-5',
    mandiName: 'Unjha Spice Mandi (World Largest)',
    state: 'Gujarat',
    commodity: 'Cumin Seed (Jeera Grade 1)',
    minPrice: 28000,
    maxPrice: 34500,
    modalPrice: 31200,
    changePercent: 4.2,
    lastUpdated: '30 mins ago',
    bestSellingTime: 'Next 7 Days (Middle East Ramadan Procurement)',
    demandTrend: 'High',
    history: [
      { date: 'Jul 20', price: 29500, aiForecast: 29700 },
      { date: 'Jul 21', price: 29800, aiForecast: 30100 },
      { date: 'Jul 22', price: 30200, aiForecast: 30500 },
      { date: 'Jul 23', price: 30600, aiForecast: 30800 },
      { date: 'Jul 24', price: 30900, aiForecast: 31100 },
      { date: 'Jul 25', price: 31100, aiForecast: 31200 },
      { date: 'Jul 26', price: 31200, aiForecast: 31600 }
    ]
  }
];

export const MOCK_CROPS: CropListing[] = [
  {
    id: 'crp-01',
    farmerId: 'usr-f101',
    farmerName: 'Sardar Harpreet Singh',
    farmerLocation: 'Ludhiana, Punjab',
    cropName: 'Basmati Rice',
    variety: 'Pusa 1121 Organic Long Grain',
    quantityMtons: 45,
    pricePerQuintal: 8900,
    qualityGrade: 'Grade A+ (Export)',
    isOrganic: true,
    harvestDate: '2026-07-22',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    status: 'available'
  },
  {
    id: 'crp-02',
    farmerId: 'usr-f102',
    farmerName: 'Balram Godara',
    farmerLocation: 'Sri Ganganagar, Rajasthan',
    cropName: 'Mustard Seeds',
    variety: 'RH-725 High Oil Content (42%)',
    quantityMtons: 80,
    pricePerQuintal: 5650,
    qualityGrade: 'Grade A (Standard)',
    isOrganic: false,
    harvestDate: '2026-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
    status: 'available'
  },
  {
    id: 'crp-03',
    farmerId: 'usr-f103',
    farmerName: 'Prakashrao Patil',
    farmerLocation: 'Kolhapur, Maharashtra',
    cropName: 'Sugarcane Jaggery (Gur)',
    variety: 'Chemical-Free Golden Cubes',
    quantityMtons: 25,
    pricePerQuintal: 4800,
    qualityGrade: 'Grade A+ (Export)',
    isOrganic: true,
    harvestDate: '2026-07-24',
    imageUrl: 'https://images.unsplash.com/photo-1621460241802-98e3b3334237?auto=format&fit=crop&q=80&w=600',
    status: 'available'
  },
  {
    id: 'crp-04',
    farmerId: 'usr-f104',
    farmerName: 'Gurpreet Kaur',
    farmerLocation: 'Amritsar, Punjab',
    cropName: 'Premium Wheat',
    variety: 'Sharbati HD-2967',
    quantityMtons: 120,
    pricePerQuintal: 2650,
    qualityGrade: 'Grade A (Standard)',
    isOrganic: false,
    harvestDate: '2026-07-18',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600',
    status: 'available'
  },
  {
    id: 'crp-05',
    farmerId: 'usr-f105',
    farmerName: 'Appa Rao Naidu',
    farmerLocation: 'Guntur, Andhra Pradesh',
    cropName: 'Red Chilli (Mirchi)',
    variety: 'Teja Sannalu Export Quality',
    quantityMtons: 15,
    pricePerQuintal: 21000,
    qualityGrade: 'Grade A+ (Export)',
    isOrganic: true,
    harvestDate: '2026-07-20',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&q=80&w=600',
    status: 'available'
  }
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  {
    id: 'wh-101',
    name: 'Khalsa State Cold Storage & Agri Silos',
    ownerName: 'Rameshwar Dayal Sharma',
    location: 'GT Road, Khanna, Punjab',
    state: 'Punjab',
    totalCapacityMtons: 5000,
    availableCapacityMtons: 1420,
    type: 'Cold Storage',
    tempRange: '-2°C to 8°C (Humidity Controlled)',
    pricePerMtonPerMonthRs: 450,
    rating: 4.9,
    verified: true,
    contactPhone: '+91 94220-55667',
    coordinates: { lat: 30.7046, lng: 76.2238 }
  },
  {
    id: 'wh-102',
    name: 'National Grain Silo Terminal (FCI Approved)',
    ownerName: 'Adani Logistics & Warehousing',
    location: 'Moga Highway, Ludhiana, Punjab',
    state: 'Punjab',
    totalCapacityMtons: 12000,
    availableCapacityMtons: 4800,
    type: 'Grain Silo',
    tempRange: 'Ambient Aerated Dry Facility (Moisture < 10%)',
    pricePerMtonPerMonthRs: 320,
    rating: 4.8,
    verified: true,
    contactPhone: '+91 98111-00222',
    coordinates: { lat: 30.9010, lng: 75.8573 }
  },
  {
    id: 'wh-103',
    name: 'Devi Ahilya Automated Agri-Park',
    ownerName: 'Suresh Kumar Jain',
    location: 'Sanwer Road Industrial Area, Indore, MP',
    state: 'Madhya Pradesh',
    totalCapacityMtons: 8500,
    availableCapacityMtons: 2100,
    type: 'Automated Dry Facility',
    tempRange: '15°C to 25°C (Dehumidified)',
    pricePerMtonPerMonthRs: 380,
    rating: 4.7,
    verified: true,
    contactPhone: '+91 93000-44555',
    coordinates: { lat: 22.7196, lng: 75.8577 }
  },
  {
    id: 'wh-104',
    name: 'Konkan Fruit & Spice Cold Chain Hub',
    ownerName: 'Ajay Shirke',
    location: 'Navi Mumbai APMC Zone, Maharashtra',
    state: 'Maharashtra',
    totalCapacityMtons: 3500,
    availableCapacityMtons: 650,
    type: 'Cold Storage',
    tempRange: '0°C to 4°C (Ethylene Scrubber Active)',
    pricePerMtonPerMonthRs: 600,
    rating: 4.9,
    verified: true,
    contactPhone: '+91 98200-77889',
    coordinates: { lat: 19.0330, lng: 73.0297 }
  }
];

export const MOCK_ROUTES: LogisticsRoute[] = [
  {
    id: 'rt-1',
    providerName: 'Randhawa Refrigerated Roadways',
    source: 'Ludhiana Farms (Punjab)',
    destination: 'Azadpur APMC Mandi (New Delhi)',
    distanceKm: 312,
    estimatedHours: 6.5,
    vehicleType: 'Refrigerated Truck (10T)',
    costPerKmRs: 42,
    totalCostRs: 13104,
    trackingStatus: 'Available'
  },
  {
    id: 'rt-2',
    providerName: 'Kisan Express Freight Carriers',
    source: 'Khanna Grain Market (Punjab)',
    destination: 'Kandla Export Port (Gujarat)',
    distanceKm: 1150,
    estimatedHours: 22,
    vehicleType: 'Heavy Trailer (25T)',
    costPerKmRs: 65,
    totalCostRs: 74750,
    trackingStatus: 'En Route'
  },
  {
    id: 'rt-3',
    providerName: 'GreenLine Rural Logistics',
    source: 'Indore Soybelt Farms (MP)',
    destination: 'Devi Ahilya Automated Agri-Park',
    distanceKm: 45,
    estimatedHours: 1.2,
    vehicleType: 'Tractor Trolley',
    costPerKmRs: 28,
    totalCostRs: 1260,
    trackingStatus: 'Available'
  }
];

export const MOCK_SCHEMES: GovtScheme[] = [
  {
    id: 'sch-1',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    code: 'GOV-PMK-2026',
    department: 'Ministry of Agriculture & Farmers Welfare',
    benefitAmount: '₹6,000 / Year (in 3 equal installments of ₹2,000)',
    eligibilityCriteria: [
      'Small and marginal farmer families with cultivable land up to 2 hectares',
      'Valid Aadhaar Card linked to Bank Account',
      'Land ownership deed registered in state revenue portal'
    ],
    description: 'Direct income support scheme providing financial aid to landholding farmers across India to procure agricultural inputs and ensure livelihood security.',
    applicationDeadline: 'Open Year-Round (Next installment cutoff: Aug 15, 2026)',
    status: 'Active'
  },
  {
    id: 'sch-2',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    code: 'GOV-PMFBY-2026',
    department: 'Ministry of Agriculture - Insurance Division',
    benefitAmount: 'Up to 100% Crop Loss Reimbursement (Farmer premium just 1.5% for Rabi, 2% for Kharif)',
    eligibilityCriteria: [
      'All farmers growing notified crops in notified areas',
      'Sharecroppers and tenant farmers are also eligible',
      'Optional for non-loanee farmers; auto-enrolled for KCC loanee farmers'
    ],
    description: 'Comprehensive yield-based crop insurance scheme covering unpreventable natural risks from sowing to post-harvest storage.',
    applicationDeadline: 'July 31, 2026 (Kharif Season Closing Soon)',
    status: 'Closing Soon'
  },
  {
    id: 'sch-3',
    title: 'Paramparagat Krishi Vikas Yojana (PKVY) - Organic Subsidy',
    code: 'GOV-PKVY-ORG',
    department: 'National Mission on Sustainable Agriculture',
    benefitAmount: '₹50,000 per Hectare for 3 Years (₹31,000 as direct incentive for organic inputs)',
    eligibilityCriteria: [
      'Farmer groups or clusters of minimum 20 farmers with 50 acres land',
      'Commitment to transition from chemical fertilizers to zero-budget natural farming',
      'Participation in PGS-India organic certification program'
    ],
    description: 'Promotes commercial organic farming through cluster approach, participatory guarantee system certification, and brand building.',
    applicationDeadline: 'September 30, 2026',
    status: 'Active'
  },
  {
    id: 'sch-4',
    title: 'Agriculture Infrastructure Fund (AIF) - 3% Interest Subvention',
    code: 'GOV-AIF-INFRA',
    department: 'Department of Agriculture & Farmers Welfare',
    benefitAmount: '3% Interest Subvention on loans up to ₹2 Crore for 7 years + CGTMSE credit guarantee',
    eligibilityCriteria: [
      'Farmers, FPOs, Agri-Entrepreneurs, and Primary Agricultural Credit Societies (PACS)',
      'Project for post-harvest management infrastructure or community farming assets',
      'Approved detailed project report (DPR)'
    ],
    description: 'Medium to long term debt financing facility for investment in viable projects for post-harvest management infrastructure like warehouses, cold storage, grading units.',
    applicationDeadline: 'Ongoing until 2032-33',
    status: 'Active'
  }
];

export const MOCK_LOANS: LoanProduct[] = [
  {
    id: 'loan-1',
    bankName: 'NABARD / State Bank of India',
    title: 'Kisan Credit Card (KCC) - Instant Crop Loan',
    interestRatePercent: 4.0, // After 3% prompt repayment subsidy on 7% base
    maxAmountRs: 300000,
    tenureMonths: 12,
    subsidyPercent: 3.0,
    processingFeePercent: 0.0,
    requiredDocuments: [
      'Aadhaar & PAN Card',
      'Land revenue records (7/12 extract or Khatauni)',
      'Passport size photograph',
      'Crop cultivation affidavit'
    ]
  },
  {
    id: 'loan-2',
    bankName: 'Bank of Baroda Agri-Banking',
    title: 'Smart Farm Mechanization & Drone Loan',
    interestRatePercent: 8.25,
    maxAmountRs: 1500000,
    tenureMonths: 60,
    subsidyPercent: 40.0, // Subsumed under Sub-Mission on Agricultural Mechanization (SMAM)
    processingFeePercent: 0.5,
    requiredDocuments: [
      'Quotation of agricultural drone / harvester / tractor',
      'Last 2 years IT returns or KCC bank statements',
      'Land ownership proof (min 5 acres for heavy machinery)'
    ]
  },
  {
    id: 'loan-3',
    bankName: 'HDFC Bank Rural Agri-Finance',
    title: 'Warehouse Receipt Financing (Pledge Loan)',
    interestRatePercent: 8.9,
    maxAmountRs: 5000000,
    tenureMonths: 9,
    subsidyPercent: 0.0,
    processingFeePercent: 0.25,
    requiredDocuments: [
      'Electronic Negotiable Warehouse Receipt (e-NWR) from WDRA approved cold storage/silo',
      'KYC documents of farmer/trader',
      'Commodity quality inspection certificate'
    ]
  }
];

export const MOCK_INSURANCE: InsurancePolicy[] = [
  {
    id: 'ins-1',
    providerName: 'AIC India (Agriculture Insurance Company)',
    policyName: 'PMFBY Comprehensive Weather & Pest Shield',
    cropCovered: ['Paddy (Rice)', 'Wheat', 'Cotton', 'Sugarcane', 'Soybean'],
    premiumPerAcreRs: 650, // Farmer share
    maxCoveragePerAcreRs: 48000,
    riskScore: 'Low',
    features: [
      'Satellite NDVI & AI Drone automated claim settlement within 72 hours',
      'Covers unseasonal rain, hailstorm, drought, flood, and localized pest epidemics',
      'No cap on government premium subsidy contribution'
    ]
  },
  {
    id: 'ins-2',
    providerName: 'ICICI Lombard Rural General Insurance',
    policyName: 'Parametric Weather Shield (Rainfall Index Cover)',
    cropCovered: ['Mustard', 'Cumin (Jeera)', 'Chilli', 'Turmeric'],
    premiumPerAcreRs: 890,
    maxCoveragePerAcreRs: 65000,
    riskScore: 'Medium',
    features: [
      'Zero physical inspection needed! Automated payout triggered by IMD weather station rainfall deficit/excess data',
      'Covers heatwave temperature spikes above 42°C during flowering stage',
      'Instant direct bank transfer (DBT) claim credit'
    ]
  }
];

export const MOCK_DIAGNOSIS: DiseaseDiagnosis[] = [
  {
    id: 'diag-101',
    timestamp: '2026-07-26T04:15:00Z',
    cropName: 'Paddy / Basmati Rice',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    confidenceScore: 96.8,
    infectedRegionBoundingBox: { x: 25, y: 30, width: 45, height: 40 },
    severity: 'Severe',
    symptoms: [
      'Spindle-shaped spots on leaves with greyish center and brownish-red margin',
      'Lesions enlarge and coalesce, causing entire leaves to wither and dry out',
      'Neck rot symptoms causing empty panicles (whiteheads)'
    ],
    treatmentChemical: [
      'Spray Tricyclazole 75% WP @ 120g per acre in 200 liters of water immediately',
      'Alternative: Isoprothiolane 40% EC @ 300 ml per acre',
      'Repeat spray after 10 days if weather remains humid (>80%)'
    ],
    treatmentOrganic: [
      'Spray Pseudomonas fluorescens biocontrol formulation @ 10g per liter of water',
      'Apply Neem oil (10,000 ppm) @ 3 ml/liter mixed with sticky agent',
      'Bio-enhancement with Trichoderma harzianum root dipping during transplanting'
    ],
    preventiveMeasures: [
      'Avoid excessive application of Nitrogen fertilizers; apply potassium in split doses',
      'Destroy weed hosts and infected stubble after harvest by deep summer plowing',
      'Grow resistant varieties like Pusa Basmati 1637 or PR 126'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=500'
  }
];
