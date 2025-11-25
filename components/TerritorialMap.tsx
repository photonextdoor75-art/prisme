import React, { useState } from 'react';
import { FRENCH_HUBS } from '../constants';
import { Hub } from '../types';
import * as d3 from 'd3';

const TerritorialMap: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);

  // Simple coordinate projection for abstract France map (0-100 scale)
  // These roughly correspond to positions on a hexagon
  
  return (
    <div className="h-full p-6 animate-fade-in flex flex-col md:flex-row gap-6">
      {/* Map Visualization */}
      <div className="w-full md:w-2/3 glass-panel rounded-2xl relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute top-6 left-6 z-10">
             <h2 className="text-2xl font-bold text-white">Carte des Gisements</h2>
             <p className="text-emerald-400 text-sm">Visibilité Territoriale & Mine Urbaine</p>
        </div>

        {/* Abstract Hexagonal Map of France */}
        <div className="relative w-full max-w-lg aspect-[4/4]">
             {/* Background Abstract Shape */}
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl opacity-80">
                <path 
                    d="M 50 5 L 95 30 L 95 75 L 50 95 L 10 75 L 10 30 Z" 
                    fill="none" 
                    stroke="#334155" 
                    strokeWidth="0.5"
                />
                 {/* Internal decorative lines */}
                 <line x1="50" y1="5" x2="50" y2="95" stroke="#1e293b" strokeWidth="0.5" />
                 <line x1="10" y1="30" x2="95" y2="75" stroke="#1e293b" strokeWidth="0.5" />
                 <line x1="95" y1="30" x2="10" y2="75" stroke="#1e293b" strokeWidth="0.5" />
             </svg>

             {/* Hubs */}
             {FRENCH_HUBS.map((hub) => (
                 <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300
                        ${selectedHub?.id === hub.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'}
                    `}
                    style={{ left: `${hub.lng}%`, top: `${hub.lat}%` }}
                 >
                    {/* Ripple Effect */}
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${selectedHub?.id === hub.id ? 'bg-emerald-400' : 'bg-slate-400'}`}></div>
                    
                    {/* Circle */}
                    <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg backdrop-blur-sm
                        ${hub.type === 'tech' ? 'bg-indigo-900/80 border-indigo-400 text-indigo-400' : ''}
                        ${hub.type === 'industrial' ? 'bg-orange-900/80 border-orange-400 text-orange-400' : ''}
                        ${hub.type === 'raw_material' ? 'bg-emerald-900/80 border-emerald-400 text-emerald-400' : ''}
                        ${selectedHub?.id === hub.id ? 'ring-4 ring-white/10' : ''}
                    `}>
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                    </div>

                    {/* Label */}
                    <div className={`
                        absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold px-2 py-1 rounded bg-slate-900/80 border border-slate-700
                        transition-opacity duration-300
                        ${selectedHub?.id === hub.id ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-slate-300'}
                    `}>
                        {hub.name}
                    </div>
                 </button>
             ))}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 rounded-full bg-indigo-500"></span>Hub Tech</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 rounded-full bg-orange-500"></span>Hub Industriel</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 rounded-full bg-emerald-500"></span>Gisement Matière</div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="w-full md:w-1/3 glass-panel rounded-2xl p-6 flex flex-col">
        {selectedHub ? (
            <div className="animate-fade-in space-y-6">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{selectedHub.name}</h3>
                    <span className="inline-block px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 uppercase tracking-wider">{selectedHub.type}</span>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm mb-1">Stock Disponible</p>
                        <div className="flex items-end gap-2">
                             <span className="text-4xl font-bold text-emerald-400">{selectedHub.stockLevel}%</span>
                             <span className="text-sm text-emerald-600/80 mb-1">capacité</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${selectedHub.stockLevel}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm mb-1">Ressource Principale</p>
                        <p className="text-xl font-semibold text-white">{selectedHub.material}</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                    <button className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                        Connecter à ce Hub
                    </button>
                </div>
            </div>
        ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                <p className="mb-4 text-6xl">🗺️</p>
                <p>Sélectionnez un gisement sur la carte pour voir les détails du stock et les opportunités locales.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default TerritorialMap;