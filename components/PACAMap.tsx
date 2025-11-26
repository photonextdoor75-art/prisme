
import React, { useState } from 'react';
import { Truck, Package, Factory, MapPin, Info, Anchor, Ship, Recycle } from 'lucide-react';

// Données 100% Yachting / APER
const REGIONAL_DATA: Record<string, { name: string; pref: string; recycler?: string; transits: { material: string; tons: number; type: string }[] }> = {
  "13": { 
    name: "Bouches-du-Rhône", 
    pref: "Marseille",
    recycler: "La Tribu Maritime (Port-St-Louis)",
    transits: [
      { material: "Accastillage (Réemploi)", tons: 45, type: "tech" },
      { material: "Voiles & Cordages", tons: 12, type: "raw_material" },
      { material: "Inox 316L (Recyclage)", tons: 150, type: "industrial" }
    ]
  },
  "06": { 
    name: "Alpes-Maritimes", 
    pref: "Nice",
    recycler: "Groupe Sclavo (Fréjus/Mandelieu)",
    transits: [
      { material: "Teck & Bois Exotiques", tons: 85, type: "raw_material" },
      { material: "Superyachting (Composite)", tons: 310, type: "industrial" }
    ]
  },
  "83": { 
    name: "Var", 
    pref: "Toulon",
    recycler: "France Récupération Recyclage",
    transits: [
      { material: "Coques Polyester (CSR)", tons: 820, type: "industrial" },
      { material: "Moteurs & Lests (Fonte)", tons: 340, type: "industrial" },
      { material: "Déchets Dangereux (Pyrotechnie)", tons: 5, type: "tech" }
    ]
  },
  "84": { 
    name: "Vaucluse", 
    pref: "Avignon",
    transits: [
      { material: "Plaisance Fluviale (Coques)", tons: 60, type: "industrial" },
      { material: "Petits Équipements", tons: 15, type: "raw_material" }
    ]
  },
  "04": { 
    name: "Alpes-de-Hte-Provence", 
    pref: "Digne-les-Bains",
    transits: [
      { material: "Embarcations Lacustres", tons: 25, type: "raw_material" }
    ]
  },
  "05": { 
    name: "Hautes-Alpes", 
    pref: "Gap",
    transits: [
      { material: "Canoës/Kayaks HS", tons: 10, type: "raw_material" }
    ]
  }
};

const PACAMap: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const handleClick = (deptCode: string) => {
    setSelectedDept(deptCode);
  };

  const getPathClass = (deptCode: string) => {
    const base = "transition-all duration-300 cursor-pointer stroke-slate-900 stroke-[1]";
    const isSelected = selectedDept === deptCode;
    const isHovered = hoveredDept === deptCode;

    if (isSelected) return `${base} fill-emerald-500 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] z-10`;
    if (isHovered) return `${base} fill-emerald-700/80`;
    return `${base} fill-slate-700`;
  };

  const currentData = selectedDept ? REGIONAL_DATA[selectedDept] : null;

  return (
    <div className="h-full p-6 animate-fade-in flex flex-col lg:flex-row gap-6">
      
      {/* Map Container */}
      <div className="w-full lg:w-3/5 glass-panel rounded-2xl p-8 flex flex-col items-center relative overflow-hidden bg-slate-900">
        <div className="absolute top-6 left-6 z-20">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Anchor className="text-blue-400" /> Région Sud (PACA)
            </h2>
            <p className="text-slate-400 text-sm">Filière APER & Recycleurs Agréés</p>
        </div>

        {/* Légende Recycleurs */}
        <div className="absolute bottom-6 right-6 z-20 bg-slate-900/80 p-3 rounded-lg border border-slate-700 text-xs">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-slate-300">Centre de Déconstruction Agréé</span>
            </div>
        </div>

        <div className="w-full h-full flex items-center justify-center max-w-2xl relative">
            <svg 
                id="map" 
                viewBox="350 335 145 125" 
                className="w-full h-full drop-shadow-2xl overflow-visible relative z-10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="paca-region">
                    {/* 13: Bouches-du-Rhône */}
                    <path 
                        onMouseEnter={() => setHoveredDept("13")} onMouseLeave={() => setHoveredDept(null)} onClick={() => handleClick("13")} className={getPathClass("13")} 
                        d="M371.71875,405.90625 L366.25,409.03125 L364.84375,419.53125 L359.0625,418.71875 L357.40625,423.125 L358.78125,425.0625 L352.4375,428.9375 L350.6875,433 L356.875,433.28125 L365.09375,433.875 L366.65625,435.4375 L363.71875,435.4375 L361.78125,438.75 L370.15625,440.5 L376.8125,439.34375 L373.28125,436 L375.625,434.0625 L379.34375,435.625 L381.09375,439.34375 L392.25,439.53125 L395.15625,438.34375 L395.75,440.125 L392.625,442.84375 L396.9375,443.03125 L396.15625,445 L394.96875,446.375 L404.53125,446.375 L409.21875,447.9375 L409.6875,448.5625 L409.875,444.6875 L411.28125,443.09375 L413.0625,442.03125 L412.875,440.96875 L411.46875,439.5625 L410.0625,439.5625 L409.15625,438.5 L410.75,437.0625 L410.75,436.53125 L409,435.65625 L409,434.25 L412.875,434.4375 L413.78125,433.71875 L410.40625,430.53125 L410.59375,426.8125 L408.46875,425.0625 L410.21875,421.53125 L414.46875,418.6875 L411.28125,416.5625 L409,418.34375 L403.6875,419.5625 L399.4375,419.03125 L391.84375,415.875 L387.25,416.03125 L383.375,414.28125 L381.9375,412.3125 L378.9375,408.96875 L371.875,405.96875 L371.71875,405.90625 L371.71875,405.90625 L371.71875,405.90625 L371.71875,405.90625 Z"
                    />
                    
                    {/* 84: Vaucluse */}
                    <path 
                        onMouseEnter={() => setHoveredDept("84")} onMouseLeave={() => setHoveredDept(null)} onClick={() => handleClick("84")} className={getPathClass("84")}
                        d="M379,377.34375 L376.25,377.5625 L374.125,380.875 L374.6875,384.375 L378,384.78125 L377.4375,386.34375 L374.875,386.53125 L371.96875,389.46875 L371.1875,388.5 L371.75,384.59375 L370.59375,383.21875 L365.3125,384 L364.28125,386.09375 L364.84375,386.40625 L368.15625,391.90625 L368.15625,396.34375 L373.96875,402.125 L373.96875,404.625 L371.71875,405.90625 L371.875,405.96875 L378.9375,408.96875 L381.9375,412.3125 L383.375,414.28125 L387.25,416.03125 L391.84375,415.875 L399.4375,419.03125 L403.6875,419.5625 L409,418.34375 L411.1875,416.625 L411.46875,415.15625 L407.40625,410.5625 L402.96875,410.5625 L402.96875,408.96875 L404.5625,407.1875 L404.5625,405.25 L401.03125,403.5 L400.6875,400.65625 L402.625,399.78125 L402.625,397.3125 L400.5,396.9375 L400.34375,394.28125 L400.3125,394.09375 L398.53125,393.96875 L395.59375,391.8125 L394.8125,389.28125 L389.34375,388.875 L385.25,388.5 L384.84375,386.15625 L386.21875,383.21875 L383.6875,385.375 L379.78125,384.96875 L379,383.59375 L381.71875,379.90625 L379,377.34375 L379,377.34375 L379,377.34375 L379,377.34375 Z M379,377.34375"
                    />
                    
                    {/* 83: Var */}
                    <path 
                        onMouseEnter={() => setHoveredDept("83")} onMouseLeave={() => setHoveredDept(null)} onClick={() => handleClick("83")} className={getPathClass("83")}
                        d="M449.78125,409.1875 L446.8125,409.3125 L445.40625,410.75 L440.09375,410.5625 L435.5,413.90625 L432.34375,411.78125 L427.375,413.375 L426.5,415.15625 L422.96875,417.8125 L416.59375,413.5625 L411.4375,415.25 L411.1875,416.625 L411.28125,416.5625 L414.46875,418.6875 L410.21875,421.53125 L408.46875,425.0625 L410.59375,426.8125 L410.40625,430.53125 L413.78125,433.71875 L412.875,434.4375 L409,434.25 L409,435.65625 L410.75,436.53125 L410.75,437.0625 L409.15625,438.5 L410.0625,439.5625 L411.46875,439.5625 L412.875,440.96875 L413.0625,442.03125 L411.28125,443.09375 L409.875,444.6875 L409.6875,448.5625 L410.21875,449.28125 L413.71875,450.84375 L414.6875,454.75 L416.84375,455.15625 L418.8125,453.78125 L422.3125,451.625 L428.375,452.21875 L428.1875,453.78125 L426.21875,454.75 L430.90625,454.96875 L429.75,453.78125 L429.34375,451.25 L431.875,449.5 L434.8125,450.46875 L436,450.84375 L436.96875,452.03125 L438.34375,451.0625 L438.71875,448.5 L440.28125,447.15625 L444.375,447.15625 L445.5625,445.375 L448.28125,446.15625 L451.40625,444.8125 L451.40625,439.71875 L447.3125,439.90625 L450.4375,437.96875 L452,435.8125 L452.40625,432.6875 L458.0625,431.90625 L461.21875,428.375 L459.03125,426.125 L459.03125,424.875 L457.96875,423.8125 L459.375,422.59375 L459.03125,420.625 L456.71875,419.75 L455.5,419.75 L453.375,417.625 L453,413.90625 L450.71875,412.84375 L448.40625,412.6875 L447.53125,410.5625 L449.78125,409.1875 L449.78125,409.1875 L449.78125,409.1875 L449.78125,409.1875 Z"
                    />
                    
                    {/* 04: Alpes-de-Haute-Provence */}
                    <path 
                        onMouseEnter={() => setHoveredDept("04")} onMouseLeave={() => setHoveredDept(null)} onClick={() => handleClick("04")} className={getPathClass("04")}
                        d="M455.84375,360.34375 L453.71875,363.53125 L450.71875,365.3125 L449.65625,367.4375 L447,367.59375 L447,369.53125 L446.28125,370.59375 L445.21875,373.25 L438.875,373.09375 L435.875,371.5 L433.90625,372.90625 L430.21875,372.71875 L429.3125,373.96875 L430.21875,373.96875 L430.75,377.3125 L429.84375,377.6875 L426.5,375.5625 L426.5,374.3125 L424.5625,372.71875 L423.5,372.71875 L423.5,374.5 L421.90625,374.84375 L418.53125,376.78125 L416.40625,380.34375 L415.875,382.09375 L417.125,382.4375 L417.3125,385.28125 L416.0625,385.28125 L414.125,383.5 L413.0625,383.6875 L413.59375,385.28125 L416.59375,388.625 L414.65625,389.34375 L413.25,388.46875 L409.6875,388.46875 L406.6875,391.28125 L406.65625,391.25 L406.53125,392.40625 L405.375,391.03125 L403.8125,389.65625 L402.8125,392.59375 L401.0625,394.15625 L400.3125,394.09375 L400.34375,394.28125 L400.5,396.9375 L402.625,397.3125 L402.625,399.78125 L400.6875,400.65625 L401.03125,403.5 L404.5625,405.25 L404.5625,407.1875 L402.96875,408.96875 L402.96875,410.5625 L407.40625,410.5625 L411.46875,415.15625 L411.4375,415.25 L416.59375,413.5625 L422.96875,417.8125 L426.5,415.15625 L427.375,413.375 L432.34375,411.78125 L435.5,413.90625 L440.09375,410.5625 L445.40625,410.75 L446.8125,409.3125 L449.78125,409.1875 L449.84375,409.15625 L449.125,407.375 L450,406.3125 L449.65625,404.90625 L452.46875,404.90625 L453.1875,404.03125 L455.84375,402.59375 L457.96875,404.03125 L459.375,403.125 L456.03125,400.125 L452.46875,396.78125 L451.25,396.40625 L451.0625,393.75 L448.9375,390.59375 L449.65625,386 L450.71875,383.5 L452.65625,381.90625 L452.84375,379.4375 L455.5,378.03125 L455.90625,377.875 L455.90625,374.09375 L458.65625,373.71875 L457.09375,372.34375 L455.125,371.75 L454.15625,369.21875 L454.9375,367.46875 L458.4375,363.75 L457.875,361 L458.375,360.46875 L455.84375,360.34375 L455.84375,360.34375 L455.84375,360.34375 L455.84375,360.34375 Z"
                    />
                    
                    {/* 06: Alpes-Maritimes */}
                    <path 
                        onMouseEnter={() => setHoveredDept("06")} onMouseLeave={() => setHoveredDept(null)} onClick={() => handleClick("06")} className={getPathClass("06")}
                        d="M455.90625,377.875 L455.5,378.03125 L452.84375,379.4375 L452.65625,381.90625 L450.71875,383.5 L449.65625,386 L448.9375,390.59375 L451.0625,393.75 L451.25,396.40625 L452.46875,396.78125 L456.03125,400.125 L459.375,403.125 L457.96875,404.03125 L455.84375,402.59375 L453.1875,404.03125 L452.46875,404.90625 L449.65625,404.90625 L450,406.3125 L449.125,407.375 L449.84375,409.15625 L447.53125,410.5625 L448.40625,412.6875 L450.71875,412.84375 L453,413.90625 L453.375,417.625 L455.5,419.75 L456.71875,419.75 L459.03125,420.625 L459.375,422.59375 L457.96875,423.8125 L459.03125,424.875 L459.03125,426.125 L461.21875,428.375 L461.375,428.1875 L461.5625,423.71875 L465.46875,424.5 L466.84375,422.71875 L468.8125,423.125 L469,417.0625 L473.5,416.6875 L477.40625,413.15625 L480.90625,413.15625 L481.09375,411 L484.625,408.875 L482.65625,404.375 L485.59375,401.84375 L485,398.90625 L489.3125,397.53125 L490.46875,393.25 L489.90625,390.3125 L488.90625,388.5625 L488.125,386 L485.21875,386.21875 L476.03125,389.53125 L473.09375,389.53125 L468.03125,385.4375 L462.9375,384.0625 L460,384.0625 L460,380.53125 L455.90625,378 L455.90625,377.875 L455.90625,377.875 L455.90625,377.875 L455.90625,377.875 Z"
                    />
                    
                    {/* 05: Hautes-Alpes */}
                    <path 
                        onMouseEnter={() => setHoveredDept("05")} onMouseLeave={() => setHoveredDept(null)} onClick={() => handleClick("05")} className={getPathClass("05")}
                        d="M439.34375,335.15625 L437.59375,335.9375 L437.1875,338.875 L433.6875,339.28125 L433.09375,336.53125 L431.9375,335.375 L428.40625,335.75 L427.03125,336.9375 L426.25,341.03125 L426.84375,342 L430.9375,342.40625 L431.71875,344.9375 L433.28125,345.71875 L433.28125,350 L429.5625,349.8125 L428,351.5625 L423.53125,350.78125 L421,352.9375 L419.21875,352.15625 L416.6875,354.125 L417.65625,355.875 L416.09375,357.4375 L411.21875,357.4375 L411.21875,359.78125 L412.78125,360.5625 L412.1875,361.9375 L408.875,363.28125 L404.78125,363.6875 L403.59375,367.40625 L403.40625,369.75 L405.5625,371.5 L403.40625,374.03125 L400.6875,372.65625 L397.5625,372.46875 L397.15625,374.21875 L399.125,375.59375 L396.75,377.15625 L397.5625,380.46875 L404.1875,382.25 L405.375,384.78125 L407.3125,385.15625 L406.65625,391.25 L406.6875,391.28125 L409.6875,388.46875 L413.25,388.46875 L414.65625,389.34375 L416.59375,388.625 L413.59375,385.28125 L413.0625,383.6875 L414.125,383.5 L416.0625,385.28125 L417.3125,385.28125 L417.125,382.4375 L415.875,382.09375 L416.40625,380.34375 L418.53125,376.78125 L421.90625,374.84375 L423.5,374.5 L423.5,372.71875 L424.5625,372.71875 L426.5,374.3125 L426.5,375.5625 L429.84375,377.6875 L430.75,377.3125 L430.21875,373.96875 L429.3125,373.96875 L430.21875,372.71875 L433.90625,372.90625 L435.875,371.5 L438.875,373.09375 L445.21875,373.25 L446.28125,370.59375 L447,369.53125 L447,367.59375 L449.65625,367.4375 L450.71875,365.3125 L453.71875,363.53125 L455.84375,360.34375 L458.375,360.46875 L460.21875,358.46875 L462.34375,358.65625 L462.34375,356.90625 L459.625,355.53125 L459.03125,349.875 L456.875,349.09375 L454.15625,349.5 L449.0625,346.9375 L448.28125,341.09375 L445.375,340.125 L444.375,338.15625 L443.09375,335.34375 L439.34375,335.15625 L439.34375,335.15625 L439.34375,335.15625 L439.34375,335.15625 Z M439.34375,335.15625" />
                </g>
                
                {/* Recycleurs (Points Bleus Statiques) */}
                {/* Port-Saint-Louis (La Tribu Maritime) - Approx near Marseille */}
                <g className="cursor-pointer group" onClick={() => handleClick("13")}>
                    <circle cx="375" cy="435" r="3" className="fill-blue-500" />
                </g>

                {/* Toulon (France Récupération Recyclage) */}
                <g className="cursor-pointer group" onClick={() => handleClick("83")}>
                    <circle cx="430" cy="445" r="3" className="fill-blue-500" />
                </g>

                {/* Fréjus (Groupe Sclavo) */}
                <g className="cursor-pointer group" onClick={() => handleClick("06")}>
                    <circle cx="450" cy="435" r="3" className="fill-blue-500" />
                </g>

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
                        <span>Préfecture : {currentData.pref}</span>
                    </div>
                    {currentData.recycler && (
                        <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-2">
                            <Recycle size={18} className="text-blue-400" />
                            <div>
                                <p className="text-xs text-blue-300 uppercase font-bold">Centre Agréé APER</p>
                                <p className="text-white font-medium">{currentData.recycler}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="glass-panel p-6 rounded-2xl flex-1">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Ship className="text-indigo-400" /> Filière Nautique
                    </h4>
                    
                    <div className="space-y-4">
                        {currentData.transits.map((transit, idx) => (
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
                                        <span className="text-2xl font-bold text-white">{transit.tons} <span className="text-sm font-normal text-slate-500">T</span></span>
                                    </div>
                                    <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (transit.tons / 1000) * 100)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/20 flex gap-3 items-start">
                        <Info className="text-indigo-400 shrink-0 mt-1" size={20} />
                        <p className="text-sm text-indigo-200/80">
                            Données officielles APER 2024. Les points bleus indiquent les centres de déconstruction agréés actifs.
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="h-full glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center text-slate-500 border-2 border-dashed border-slate-700">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <MapPin size={32} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">Aucun département sélectionné</h3>
                <p className="max-w-xs mx-auto">
                    Cliquez sur un département ou un point bleu (Centre de Recyclage) pour voir les détails de la filière.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PACAMap;
