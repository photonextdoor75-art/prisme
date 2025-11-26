import React, { useState } from 'react';
import { Truck, Package, MapPin, Info, Anchor, Leaf, Wine } from 'lucide-react';

// Données mockées pour la Corse (Spécificités insulaires)
const CORSICA_DATA: Record<string, { name: string; pref: string; desc: string; transits: { material: string; tons: number; type: string; icon: any }[] }> = {
  "2A": { 
    name: "Corse-du-Sud", 
    pref: "Ajaccio",
    desc: "Hub portuaire et touristique majeur.",
    transits: [
      { material: "Déchets Nautiques (Plaisance)", tons: 230, type: "industrial", icon: Anchor },
      { material: "Verre (Hôtellerie & Restauration)", tons: 850, type: "raw_material", icon: Wine },
      { material: "Cartons Compactés (Import)", tons: 450, type: "raw_material", icon: Package }
    ]
  },
  "2B": { 
    name: "Haute-Corse", 
    pref: "Bastia",
    desc: "Zone agricole et interface logistique nord.",
    transits: [
      { material: "Biomasse Agricole (Clémentines/Vigne)", tons: 1200, type: "raw_material", icon: Leaf },
      { material: "Ferrailles Portuaires", tons: 680, type: "industrial", icon: Truck },
      { material: "Plastiques Agricoles", tons: 320, type: "raw_material", icon: Package }
    ]
  }
};

const CorsicaMap: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const handleClick = (deptCode: string) => {
    setSelectedDept(deptCode);
  };

  const getPathClass = (deptCode: string) => {
    const base = "transition-all duration-300 cursor-pointer stroke-slate-900 stroke-[0.5]";
    const isSelected = selectedDept === deptCode;
    const isHovered = hoveredDept === deptCode;

    if (isSelected) return `${base} fill-emerald-500 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] z-10`;
    if (isHovered) return `${base} fill-emerald-700/80`;
    return `${base} fill-slate-700`;
  };

  const currentData = selectedDept ? CORSICA_DATA[selectedDept] : null;

  return (
    <div className="h-full p-6 animate-fade-in flex flex-col lg:flex-row gap-6">
      
      {/* Map Container */}
      <div className="w-full lg:w-1/2 glass-panel rounded-2xl p-8 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-emerald-400" /> Corse (Corsica)
            </h2>
            <p className="text-slate-400 text-sm">Gestion des flux insulaires</p>
        </div>

        {/* Carte centrée */}
        <div className="w-full h-full flex items-center justify-center">
            <svg 
                id="map" 
                viewBox="435 440 50 105" 
                className="h-[80%] w-auto drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="corsica-group">
                    {/* 2A: Corse-du-Sud */}
                    <path 
                        data-num="2A" 
                        className={getPathClass("2A")}
                        onClick={() => handleClick("2A")}
                        onMouseEnter={() => setHoveredDept("2A")}
                        onMouseLeave={() => setHoveredDept(null)}
                        d="M437.33847,484.9562 L437.33847,487.11245 L439.30722,488.48745 L442.61972,490.42495 L442.83847,491.98745 L440.86972,492.5812 L437.74472,493.17495 L437.74472,494.5187 L438.90097,495.7062 L439.11972,499.61245 L443.40097,500.98745 L444.96347,501.36245 L446.33847,503.5187 L445.36972,504.8937 L443.80722,505.4562 L442.61972,507.61245 L441.46347,508.98745 L442.02597,512.48745 L444.96347,512.29995 L445.74472,512.8937 L448.49472,511.5187 L449.27597,512.29995 L447.90097,515.23745 L449.27597,516.61245 L446.93222,518.36245 L445.36972,521.86245 L449.65097,522.86245 L455.71347,523.42495 L453.18222,526.36245 C453.18222,526.36245 451.99289,525.90364 451.46347,526.1437 C451.44782,526.15141 451.41536,526.16589 451.40097,526.17495 C451.39647,526.17828 451.37406,526.20271 451.36972,526.2062 C451.36553,526.20986 451.34249,526.23363 451.33847,526.23745 C451.33478,526.24161 451.31073,526.26437 451.30722,526.2687 C451.30054,526.27771 451.28192,526.29022 451.27597,526.29995 C451.27319,526.30499 451.27856,526.32597 451.27597,526.3312 C451.27118,526.34203 451.24871,526.38211 451.24472,526.3937 C451.24293,526.39969 451.2463,526.41876 451.24472,526.42495 C451.24199,526.43772 451.21532,526.47387 451.21347,526.48745 C451.21207,526.50144 451.21394,526.53512 451.21347,526.54995 C451.21348,527.52651 449.86972,529.8937 449.86972,529.8937 L451.80722,532.0187 L455.33847,534.17495 L461.96347,535.92495 L463.90097,536.7062 L465.68222,537.48745 L464.49472,539.6437 L467.61972,539.4562 L468.21347,540.8312 L471.33847,540.8312 L472.11972,537.11245 L470.15097,536.7062 L472.90097,533.79995 L471.93222,532.79995 L472.11972,531.04995 L475.65097,529.11245 L475.83847,526.9562 L473.49472,526.7687 L471.93222,528.11245 L471.93222,526.17495 L475.05722,525.98745 L476.02597,523.6437 L476.80722,516.79995 L476.21347,513.86245 L476.15097,511.04995 L472.74472,513.29995 L468.68222,513.4562 L468.33847,510.6437 L468.86972,509.92495 L467.61972,509.04995 L467.27597,504.2687 L466.74472,503.3937 L464.61972,503.3937 L463.55722,502.5187 L463.55722,499.1437 L462.15097,498.2687 L461.08847,497.73745 L458.96347,495.0812 L459.11972,493.48745 L456.49472,493.48745 L455.58847,490.8312 L451.86972,490.8312 L449.93222,488.17495 L450.46347,487.29995 L449.24472,486.5812 L446.40097,487.11245 L445.33847,486.42495 L441.46347,486.42495 L441.08847,485.36245 L438.90097,484.9562 L437.33847,484.9562 L437.33847,484.9562 L437.33847,484.9562 L437.33847,484.9562 Z"
                    />
                    {/* 2B: Haute-Corse */}
                    <path 
                        data-num="2B" 
                        className={getPathClass("2B")}
                        onClick={() => handleClick("2B")}
                        onMouseEnter={() => setHoveredDept("2B")}
                        onMouseLeave={() => setHoveredDept(null)}
                        d="M469.96347,445.8937 L467.02597,447.86245 L467.43222,449.79995 L468.99472,451.7687 L467.24472,453.11245 L468.02597,454.67495 L466.83847,456.04995 L466.83847,457.79995 L468.80722,459.5812 L468.80722,462.29995 L467.61972,464.8312 L466.27597,465.42495 L464.71347,463.2687 L461.96347,463.48745 L461.36972,463.0812 L459.02597,463.0812 L456.90097,465.04995 L456.08847,468.36245 L451.02597,469.3312 L447.11972,472.6437 L446.33847,474.79995 L444.40097,474.61245 L443.40097,473.42495 L442.83847,476.7687 L441.46347,477.3312 L441.05722,480.4562 L441.65097,481.8312 L439.49472,483.3937 L438.90097,484.9562 L441.08847,485.36245 L441.46347,486.42495 L445.33847,486.42495 L446.40097,487.11245 L449.24472,486.5812 L450.46347,487.29995 L449.93222,488.17495 L451.86972,490.8312 L455.58847,490.8312 L456.49472,493.48745 L459.11972,493.48745 L458.96347,495.0812 L461.08847,497.73745 L462.15097,498.2687 L463.55722,499.1437 L463.55722,502.5187 L464.61972,503.3937 L466.74472,503.3937 L467.27597,504.2687 L467.61972,509.04995 L468.86972,509.92495 L468.33847,510.6437 L468.68222,513.4562 L472.74472,513.29995 L476.15097,511.04995 L476.02597,505.2687 L480.71347,498.6437 L480.71347,487.7062 L478.77597,483.98745 L478.18222,472.2687 L476.80722,470.11245 L474.27597,468.17495 L473.86972,460.92495 L475.05722,457.61245 L473.49472,452.3312 L472.52597,448.04995 L471.71347,446.86245 L469.96347,445.8937 L469.96347,445.8937 L469.96347,445.8937 L469.96347,445.8937 Z"
                    />
                </g>
            </svg>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {currentData ? (
            <div className="flex-1 flex flex-col gap-4 animate-fade-in">
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500">
                    <h3 className="text-3xl font-bold text-white mb-1">{currentData.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                        <MapPin size={16} />
                        <span>Préfecture : {currentData.pref}</span>
                    </div>
                    <p className="text-slate-300 italic text-sm border-t border-slate-700 pt-3">
                        "{currentData.desc}"
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex-1">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Truck className="text-indigo-400" /> Gisements & Flux Insulaires
                    </h4>
                    
                    <div className="space-y-4">
                        {currentData.transits.map((transit, idx) => {
                            const Icon = transit.icon;
                            return (
                                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-emerald-500/30 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-slate-200 flex items-center gap-2">
                                            <Icon size={16} className="text-emerald-400" />
                                            {transit.material}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded uppercase font-bold tracking-wider 
                                            ${transit.type === 'industrial' ? 'bg-orange-900/50 text-orange-400' : 
                                              transit.type === 'tech' ? 'bg-indigo-900/50 text-indigo-400' : 
                                              'bg-emerald-900/50 text-emerald-400'}`}>
                                            {transit.type === 'raw_material' ? 'Matière' : transit.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Package size={16} className="text-slate-500" />
                                            <span className="text-2xl font-bold text-white">{transit.tons} <span className="text-sm font-normal text-slate-500">Tonnes</span></span>
                                        </div>
                                        <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (transit.tons / 1500) * 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-6 p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/20 flex gap-3 items-start">
                        <Info className="text-indigo-400 shrink-0 mt-1" size={20} />
                        <p className="text-sm text-indigo-200/80">
                            Les données incluent les flux maritimes vers le continent (Marseille/Toulon) et l'Italie (Sardaigne/Toscane).
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="h-full glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center text-slate-500 border-2 border-dashed border-slate-700">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <MapPin size={32} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">Sélectionnez un département</h3>
                <p className="max-w-xs mx-auto">
                    Cliquez sur la Haute-Corse (Nord) ou la Corse-du-Sud pour visualiser les spécificités locales.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default CorsicaMap;