import React, { useState } from 'react';
import { Truck, Package, MapPin, Info } from 'lucide-react';
import ItalyMapPathsNorth from './ItalyMapPathsNorth';
import ItalyMapPathsCenter from './ItalyMapPathsCenter';
import ItalyMapPathsSouth from './ItalyMapPathsSouth';

// Données mockées pour les transits régionaux italiens
const REGIONAL_DATA: Record<string, { name: string; capital: string; transits: { material: string; tons: number; type: string }[] }> = {
  "IT-25": { 
    name: "Lombardia (Lombardie)", 
    capital: "Milano",
    transits: [
      { material: "Textile & Mode (Chutes)", tons: 1250, type: "industrial" },
      { material: "Déchets Métalliques", tons: 3400, type: "raw_material" },
      { material: "Design & Mobilier", tons: 450, type: "tech" }
    ]
  },
  "IT-21": { 
    name: "Piemonte (Piémont)", 
    capital: "Torino",
    transits: [
      { material: "Aluminium Automobile", tons: 2100, type: "industrial" },
      { material: "Composants Mécaniques", tons: 890, type: "tech" }
    ]
  },
  "IT-52": { 
    name: "Toscana (Toscane)", 
    capital: "Firenze",
    transits: [
      { material: "Cuir & Maroquinerie", tons: 620, type: "raw_material" },
      { material: "Biomasse Viticole", tons: 1500, type: "raw_material" }
    ]
  },
  "IT-34": { 
    name: "Veneto (Vénétie)", 
    capital: "Venezia",
    transits: [
      { material: "Verre Recyclable", tons: 980, type: "industrial" },
      { material: "Plastiques Industriels", tons: 1200, type: "raw_material" }
    ]
  },
  "IT-45": { 
    name: "Emilia-Romagna", 
    capital: "Bologna",
    transits: [
      { material: "Emballages Alimentaires", tons: 1800, type: "raw_material" },
      { material: "Céramiques & BTP", tons: 3500, type: "industrial" }
    ]
  },
  "IT-62": { 
    name: "Lazio (Latium)", 
    capital: "Roma",
    transits: [
      { material: "Déchets Électroniques (DEEE)", tons: 950, type: "tech" },
      { material: "Papier & Carton", tons: 2200, type: "raw_material" }
    ]
  },
  "IT-23": { name: "Valle d'Aosta", capital: "Aosta", transits: [] },
  "IT-32": { name: "Trentino-Alto Adige", capital: "Trento", transits: [] },
  "IT-36": { name: "Friuli-Venezia Giulia", capital: "Trieste", transits: [] },
  "IT-42": { name: "Liguria", capital: "Genova", transits: [] },
  "IT-55": { name: "Umbria", capital: "Perugia", transits: [] },
  "IT-57": { name: "Marche", capital: "Ancona", transits: [] },
  "IT-65": { name: "Abruzzo", capital: "L'Aquila", transits: [] },
  "IT-67": { name: "Molise", capital: "Campobasso", transits: [] },
  "IT-72": { name: "Campania", capital: "Napoli", transits: [] },
  "IT-75": { name: "Puglia", capital: "Bari", transits: [] },
  "IT-77": { name: "Basilicata", capital: "Potenza", transits: [] },
  "IT-78": { name: "Calabria", capital: "Catanzaro", transits: [] },
  "IT-82": { name: "Sicilia", capital: "Palermo", transits: [] },
  "IT-88": { name: "Sardegna", capital: "Cagliari", transits: [] }
};

const ItalyMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleClick = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const getPathClass = (regionId: string, isNeighbor: boolean = false) => {
    if (isNeighbor) return "fill-slate-800/30 stroke-slate-800 stroke-[0.5] pointer-events-none";

    const base = "transition-all duration-300 cursor-pointer stroke-slate-900 stroke-[1]";
    const isSelected = selectedRegion === regionId;
    const isHovered = hoveredRegion === regionId;

    if (isSelected) return `${base} fill-emerald-500 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] z-10`;
    if (isHovered) return `${base} fill-emerald-700/80`;
    return `${base} fill-slate-700`;
  };

  const currentData = selectedRegion ? REGIONAL_DATA[selectedRegion] : null;

  const mapProps = {
    getPathClass,
    onClick: handleClick,
    onMouseEnter: (id: string) => setHoveredRegion(id),
    onMouseLeave: () => setHoveredRegion(null)
  };

  return (
    <div className="h-full p-6 animate-fade-in flex flex-col lg:flex-row gap-6">
      
      {/* Map Container */}
      <div className="w-full lg:w-3/5 glass-panel rounded-2xl p-8 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-emerald-400" /> Italia
            </h2>
            <p className="text-slate-400 text-sm">Flux Transfrontaliers & Gisements</p>
        </div>

        <div className="w-full h-full flex items-center justify-center overflow-y-auto custom-scrollbar">
            {/* Full Italy Map Assembled from Components */}
            <svg 
                id="map" 
                viewBox="0 0 610.30981 792.58575" 
                className="h-full w-auto max-w-full drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxHeight: '80vh' }}
            >
                <ItalyMapPathsNorth {...mapProps} />
                <ItalyMapPathsCenter {...mapProps} />
                <ItalyMapPathsSouth {...mapProps} />
            </svg>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-2/5 flex flex-col gap-6">
        {currentData ? (
            <div className="flex-1 flex flex-col gap-4 animate-fade-in">
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500">
                    <h3 className="text-3xl font-bold text-white mb-1">{currentData.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={16} />
                        <span>Capitale : {currentData.capital}</span>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex-1">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Truck className="text-indigo-400" /> Gisements en Transit
                    </h4>
                    
                    <div className="space-y-4">
                        {currentData.transits.length > 0 ? currentData.transits.map((transit, idx) => (
                            <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-emerald-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-slate-200">{transit.material}</span>
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
                                        <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (transit.tons / 4000) * 100)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center p-8 text-slate-500 italic">
                                Aucune donnée de transit active pour cette région.
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-6 p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/20 flex gap-3 items-start">
                        <Info className="text-indigo-400 shrink-0 mt-1" size={20} />
                        <p className="text-sm text-indigo-200/80">
                            Données synchronisées avec le registre national italien des déchets et les partenaires logistiques transfrontaliers.
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="h-full glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center text-slate-500 border-2 border-dashed border-slate-700">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <MapPin size={32} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">Aucune région sélectionnée</h3>
                <p className="max-w-xs mx-auto">
                    Cliquez sur une région de la carte (Lombardie, Piémont, Toscane...) pour visualiser les opportunités.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ItalyMap;
