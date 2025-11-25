export interface MetricResult {
  monetaryValue: number;
  currency: string;
  co2SavedKg: number;
  jobsSupported: number;
  reusePotentialPercent: number;
  reasoning: string;
}

export interface Hub {
  id: string;
  name: string;
  type: 'industrial' | 'tech' | 'raw_material';
  lat: number;
  lng: number; // Relative coordinates for visualization
  stockLevel: number; // 0-100
  material: string;
}

export interface CrossBorderFlow {
  source: string;
  target: string;
  material: string;
  volumeTons: number;
  efficiency: number; // %
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  VALUATION = 'VALUATION',
  MAP = 'MAP',
  BRIDGE = 'BRIDGE'
}