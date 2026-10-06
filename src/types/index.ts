export type UserRole = 
  | 'Farmer' | 'farmer' 
  | 'Buyer' | 'buyer' 
  | 'Warehouse Owner' | 'warehouse_owner' 
  | 'Govt Officer' | 'government_officer' | 'Government Officer'
  | 'Bank Officer' | 'bank_officer' 
  | 'Insurance Company' | 'insurance_company' 
  | 'Logistics Company' | 'logistics_company' 
  | 'Super Admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  location: string;
  verified: boolean;
  farmSizeAcres?: number;
  companyName?: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfallMm: number;
  windSpeedKmh: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Humid';
  forecast7Day: {
    day: string;
    maxTemp: number;
    minTemp: number;
    rainProb: number;
    condition: string;
  }[];
  alerts: {
    id: string;
    type: 'WARNING' | 'ADVISORY' | 'INFO';
    title: string;
    message: string;
    affectedRegions: string[];
  }[];
}

export interface MandiPrice {
  id: string;
  mandiName: string;
  state: string;
  commodity: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  changePercent: number;
  lastUpdated: string;
  history: { date: string; price: number; aiForecast?: number }[];
  bestSellingTime: string;
  demandTrend: 'High' | 'Moderate' | 'Low';
}

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  cropName: string;
  variety: string;
  quantityMtons: number;
  pricePerQuintal: number;
  qualityGrade: 'Grade A+ (Export)' | 'Grade A (Standard)' | 'Grade B (Commercial)';
  isOrganic: boolean;
  harvestDate: string;
  imageUrl: string;
  status: 'available' | 'reserved' | 'sold';
}

export interface Warehouse {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  state: string;
  totalCapacityMtons: number;
  availableCapacityMtons: number;
  type: 'Cold Storage' | 'Grain Silo' | 'Standard Godown' | 'Automated Dry Facility';
  tempRange: string;
  pricePerMtonPerMonthRs: number;
  rating: number;
  verified: boolean;
  contactPhone: string;
  coordinates: { lat: number; lng: number };
}

export interface LogisticsRoute {
  id: string;
  providerName: string;
  source: string;
  destination: string;
  distanceKm: number;
  estimatedHours: number;
  vehicleType: 'Refrigerated Truck (10T)' | 'Heavy Trailer (25T)' | 'Mini Pickup (3T)' | 'Tractor Trolley';
  costPerKmRs: number;
  totalCostRs: number;
  trackingStatus: 'Available' | 'En Route' | 'Delivered' | 'Maintenance';
}

export interface GovtScheme {
  id: string;
  title: string;
  code: string;
  department: string;
  benefitAmount: string;
  eligibilityCriteria: string[];
  description: string;
  applicationDeadline: string;
  status: 'Active' | 'Closing Soon' | 'Under Review';
}

export interface LoanProduct {
  id: string;
  bankName: string;
  title: string;
  interestRatePercent: number;
  maxAmountRs: number;
  tenureMonths: number;
  subsidyPercent: number;
  processingFeePercent: number;
  requiredDocuments: string[];
}

export interface InsurancePolicy {
  id: string;
  providerName: string;
  policyName: string;
  cropCovered: string[];
  premiumPerAcreRs: number;
  maxCoveragePerAcreRs: number;
  riskScore: 'Low' | 'Medium' | 'High';
  features: string[];
}

export interface DiseaseDiagnosis {
  id: string;
  timestamp: string;
  cropName: string;
  diseaseName: string;
  confidenceScore: number;
  infectedRegionBoundingBox?: { x: number; y: number; width: number; height: number };
  severity: 'Low' | 'Moderate' | 'Severe' | 'Critical';
  symptoms: string[];
  treatmentChemical: string[];
  treatmentOrganic: string[];
  preventiveMeasures: string[];
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  language?: 'English' | 'Hindi' | 'Punjabi' | 'Marathi' | 'Telugu';
  audioUrl?: string;
  suggestedActions?: string[];
}
