
import React, { useState } from 'react';
import FranceMap, { DeptStatus } from './FranceMap';
import { Anchor, Flame, Factory, Ship, RefreshCw, AlertTriangle, Info, MapPin, CheckCircle } from 'lucide-react';

// Données Métier APER (Nettoyées Yachting Only)
const APER_DATA = {
  kpis: [
    { label: 'Bateaux Traités', value: '7,742', sub: '+12% this month', icon: Ship, color: 'text-blue-400' },
    { label: 'Taux Valorisation', value: '78.4%', sub: 'Objectif 2025: 85%', icon: RefreshCw, color: 'text-emerald-400' },
    { label: 'CSR Produit', value: '12,400 T', sub: 'Vers Cimenteries', icon: Flame, color: 'text-orange-400' }
  ],
  departments: {
    // Hubs Portuaires (Gisements)
    "13": { name: "Bouches-du-Rhône", role: "hub_port", boats_waiting: 45, tonnage: 120, status: "port", desc: "Grand Port Maritime. Stockage tampon avant démantèlement.", recycler: "La Tribu Maritime (Port-St-Louis)" },
    "83": { name: "Var", role: "hub_port", boats_waiting: 82, tonnage: 210, status: "port", desc: "Base Navale. Centre de tri primaire des composites.", recycler: "France Récupération Recyclage" },
    "06": { name: "Alpes-Maritimes", role: "hub_port", boats_waiting: 30, tonnage: 90, status: "port", desc: "Plaisance de luxe. Gisement riche en matériaux nobles (Teck/Inox).", recycler: "Groupe Sclavo (Fréjus)" },
    "66": { name: "Pyrénées-Orientales", role: "hub_port", boats_waiting: 12, tonnage: 40, status: "port", desc: "Port de plaisance. Collecte active.", recycler: "Réseau Sud" },
    "34": { name: "Hérault", role: "hub_port", boats_waiting: 28, tonnage: 75, status: "port", desc: "Grande Motte. Forte densité de coques polyester.", recycler: "Réseau Occitanie" },
    "2A": { name: "Corse-du-Sud", role: "hub_port", boats_waiting: 15, tonnage: 50, status: "port", desc: "Transit maritime vers le continent nécessaire.", recycler: "Centre Agréé Corse" },
    "2B": { name: "Haute-Corse", role: "hub_port", boats_waiting: 10, tonnage: 35, status: "port", desc: "Transit vers Livourne (Italie)." },
    
    // Hubs Industriels (Transformation) - STRICTEMENT NAUTIQUE
    "38": { name: "Isère", role: "cement_plant", capacity: "High", status: "energy", desc: "Cimenterie Vicat. Brûle le CSR (coques de bateaux broyées) pour ses fours." },
    "59": { name: "Nord", role: "steel_mill", capacity: "Medium", status: "steel", desc: "Aciérie de Dunkerque. Récupération des quilles en fonte et inox marin." },
    "05": { name: "Hautes-Alpes", role: "wood_energy", capacity: "Low", status: "factory", desc: "Chaufferie Biomasse. Valorisation des bois de pont (Teck)." }
  } as Record<string, any>
};

const TerritorialMap: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Générer le mapping de status pour la carte
  const deptStatusMap: Record<string, DeptStatus> = {};
  Object.keys(APER_DATA.departments).forEach(key => {
    deptStatusMap[key] = APER_DATA.departments[key].status as DeptStatus;
  });

  const currentInfo = selectedDept ? APER_DATA.departments[selectedDept] : null;

  return (
    <div className="h-full p-6 flex flex-col gap-6 overflow-hidden animate-fade-in bg-slate-950">
      
      {/* KPI Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        {APER_DATA.kpis.map((kpi, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-4 shadow-lg shadow-black/40">
                <div className={`p-3 rounded-xl bg-slate-900/80 ${kpi.color}`}>
                    <kpi.icon size={28} />
                </div>
                <div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{kpi.label}</p>
                    <p className="text-2xl font-bold text-white font-mono">{kpi.value}</p>
                    <p className="text-xs text-emerald-500/80">{kpi.sub}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* Carte Interactive (War Room Display) */}
        <div className="w-full lg:w-2/3 relative glass-panel rounded-2xl border border-slate-800 p-8 flex items-center justify-center overflow-hidden">
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             {/* Title Overlay */}
             <div className="absolute top-6 left-6 z-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    APER CONTROL CENTER
                </h2>
                <p className="text-slate-400 text-sm font-mono mt-1">LIVE TRACKING • FILIÈRE NAUTIQUE</p>
             </div>

             {/* Legend */}
             <div className="absolute bottom-6 left-6 z-10 bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-slate-700 flex flex-col gap-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div> Gisement (Port/Épaves)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-600 animate-pulse"></div> Exutoire (Cimenterie)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-500"></div> Recyclage (Métal)</div>
             </div>

             <div className="w-full h-full max-w-3xl relative z-0 transform scale-110 lg:scale-100 transition-transform">
                <FranceMap 
                    departmentStatus={deptStatusMap} 
                    selectedDept={selectedDept}
                    onDepartmentClick={setSelectedDept}
                />
             </div>
        </div>

        {/* Tactical Panel */}
        <div className="w-full lg:w-1/3 glass-panel rounded-2xl border-l-4 border-l-blue-500 bg-slate-900/90 flex flex-col overflow-hidden">
            {currentInfo ? (
                <div className="p-6 flex-1 flex flex-col animate-slide-in-right">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-1">{currentInfo.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded uppercase font-bold tracking-wider ${currentInfo.status === 'port' ? 'bg-blue-900 text-blue-400' : 'bg-orange-900 text-orange-400'}`}>
                                {currentInfo.status === 'port' ? 'Zone de Collecte' : 'Site Industriel'}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold text-white font-mono">{currentInfo.status === 'port' ? currentInfo.boats_waiting : 'ACTIF'}</p>
                            {currentInfo.status === 'port' && <p className="text-xs text-slate-500 uppercase">Bateaux en attente</p>}
                        </div>
                    </div>

                    {currentInfo.recycler && (
                        <div className="mb-4 p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-lg flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-500 rounded-full"><CheckCircle size={12} className="text-white" /></div>
                            <div>
                                <p className="text-[10px] text-emerald-400 uppercase font-bold">Centre Agréé APER</p>
                                <p className="text-sm text-white font-medium">{currentInfo.recycler}</p>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 mb-6">
                        <p className="text-slate-300 text-sm leading-relaxed italic">
                            <Info className="inline w-4 h-4 mr-2 text-blue-400" />
                            {currentInfo.desc}
                        </p>
                    </div>

                    {/* Detailed Breakdown / Action Plan */}
                    <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                        
                        {currentInfo.status === 'port' ? (
                            <>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><Anchor size={14}/> Composition du Stock</h4>
                                    <div className="space-y-3">
                                        <MaterialBar label="Composites (Coques)" value={60} color="bg-orange-500" sub="-> CSR Cimenterie" />
                                        <MaterialBar label="Métaux (Inox/Fonte)" value={25} color="bg-slate-400" sub="-> Fonderie" />
                                        <MaterialBar label="Bois & Accastillage" value={15} color="bg-amber-600" sub="-> Réemploi/Énergie" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-800">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><Ship size={14}/> Aide Transport 2025</h4>
                                    <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/30 mb-4">
                                        <p className="text-xs text-blue-200">
                                            <span className="font-bold">NOUVEAU :</span> Le transport vers {currentInfo.recycler || "le centre"} est désormais pris en charge forfaitairement.
                                        </p>
                                    </div>
                                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 mb-2">
                                        <Ship size={18} /> Lancer Ordre de Déconstruction
                                    </button>
                                </div>
                            </>
                        ) : (
                             <>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><Factory size={14}/> Capacité de Traitement</h4>
                                    <div className="flex items-center justify-center p-6">
                                        <div className="relative w-32 h-32 flex items-center justify-center">
                                            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-t-orange-500 border-r-orange-500 rounded-full rotate-45"></div>
                                            <div className="text-center">
                                                <span className="text-2xl font-bold text-white">85%</span>
                                                <p className="text-[10px] text-slate-500 uppercase">Charge</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-slate-400">Alimentation four CSR en continu</p>
                                </div>
                             </>
                        )}

                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 animate-pulse">
                        <AlertTriangle size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300 mb-2">En attente de signal</h3>
                    <p className="text-sm">Sélectionnez un Hub stratégique sur la carte pour initialiser le lien de commandement.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

const MaterialBar: React.FC<{ label: string; value: number; color: string; sub: string }> = ({ label, value, color, sub }) => (
    <div>
        <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium">{label}</span>
            <span className="text-slate-500">{sub}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
            <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

export default TerritorialMap;
