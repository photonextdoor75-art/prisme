
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
  departmentCode?: string; // Link to specific department map
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
  BRIDGE = 'BRIDGE',
  REGION_SUD = 'REGION_SUD',
  ITALY_MAP = 'ITALY_MAP',
  CORSICA_MAP = 'CORSICA_MAP',
  GREENLINA_MACHINE = 'GREENLINA_MACHINE',
  ECO_MARKETING = 'ECO_MARKETING'
}