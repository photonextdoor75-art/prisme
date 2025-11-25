import { Hub, CrossBorderFlow } from './types';

export const FRENCH_HUBS: Hub[] = [
  { id: 'h1', name: 'Paris (Île-de-France)', type: 'tech', lat: 25, lng: 50, stockLevel: 85, material: 'Électronique' },
  { id: 'h2', name: 'Lyon (Auvergne-Rhône-Alpes)', type: 'industrial', lat: 60, lng: 65, stockLevel: 60, material: 'Métaux' },
  { id: 'h3', name: 'Marseille (PACA)', type: 'raw_material', lat: 85, lng: 60, stockLevel: 45, material: 'Plastiques' },
  { id: 'h4', name: 'Lille (Hauts-de-France)', type: 'industrial', lat: 10, lng: 55, stockLevel: 70, material: 'Textile' },
  { id: 'h5', name: 'Bordeaux (Nouvelle-Aquitaine)', type: 'raw_material', lat: 65, lng: 30, stockLevel: 50, material: 'Bois' },
  { id: 'h6', name: 'Nantes (Pays de la Loire)', type: 'tech', lat: 45, lng: 25, stockLevel: 55, material: 'Composites' },
];

export const ITALIAN_HUBS: Hub[] = [
  { id: 'i1', name: 'Turin', type: 'industrial', lat: 60, lng: 85, stockLevel: 75, material: 'Automobile' },
  { id: 'i2', name: 'Milan', type: 'tech', lat: 50, lng: 90, stockLevel: 90, material: 'Mode & Design' },
];

export const FLOWS: CrossBorderFlow[] = [
  { source: 'Lyon', target: 'Turin', material: 'Aluminium Recyclé', volumeTons: 120, efficiency: 92 },
  { source: 'Marseille', target: 'Gênes', material: 'Plastiques PET', volumeTons: 85, efficiency: 88 },
  { source: 'Milan', target: 'Lyon', material: 'Textile Haut de Gamme', volumeTons: 40, efficiency: 95 },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];
