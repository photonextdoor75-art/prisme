import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRightLeft, Truck, Ship, MapPin, ArrowRight, Leaf, Anchor, Package, Factory, Flame, Recycle, Coins, ArrowUpRight, Zap, Wind } from 'lucide-react';

// Données étendues incluant la Suisse et le Nord
const EUROPEAN_FLOWS = [
  {
    id: 1,
    source: "PACA (Toulon)",
    target: "Italie (Cimenteries)",
    material: "CSR (Composites)",
    volume: 450,
    transport: "terrestrial",
    icon: Flame,
    color: "text-orange-500",
    desc: "Combustible solide pour fours de cimenterie."
  },
  {
    id: 2,
    source: "PACA (Nice)",
    target: "Suisse (Pyrolyse)",
    material: "Fibre de Verre",
    volume: 120,
    transport: "terrestrial",
    icon: Zap,
    color: "text-cyan-400",
    desc: "Innovation: Recyclage par pyrolyse (Composite Recycling)."
  },
  {
    id: 3,
    source: "France (Nord)",
    target: "Norvège/Suède",
    material: "CSR Haute Qualité",
    volume: 890,
    transport: "maritime",
    icon: Wind,
    color: "text-teal-300",
    desc: "Alimentation des réseaux de chaleur urbains (District Heating)."
  },
  {
    id: 4,
    source: "Corse",
    target: "Italie (Toscane)",
    material: "Biomasse",
    volume: 1200,
    transport: "maritime",
    icon: Leaf,
    color: "text-emerald-400",
    desc: "Valorisation énergétique biomasse."
  },
  {
    id: 5,
    source: "Marseille",
    target: "Turin (Fiat)",
    material: "Métaux",
    volume: 850,
    transport: "terrestrial",
    icon: Factory,
    color: "text-slate-300",
    desc: "Refonte Inox/Alu pour l'industrie auto."
  }
];

const CrossBorderBridge: React.FC = () => {
  return (
    <div className="h-full p-6 animate-fade-in flex flex-col gap-6 overflow-y-auto custom-scrollbar bg-slate-950">
       <div className="flex items-center justify-between shrink-0">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><ArrowUpRight /></span>
                    Réseau Européen
                </h2>
                <p className="text-slate-400 text-sm">Flux Circulaires Stratégiques (APER Extension)</p>
            </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            
            {/* Visualisation Graphique (Carte Abstraite) */}
            <div className="glass-panel p-8 rounded-2xl col-span-1 lg:col-span-2 relative flex items-center justify-center bg-slate-900/50 overflow-hidden">
                
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="relative w-full h-[500px]">
                    
                    {/* Node: NORDICS */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                        <TerritoryCard name="NORDICS" type="Energy Recovery" color="teal" icon={<Wind size={16}/>} />
                    </div>

                    {/* Node: SUISSE */}
                    <div className="absolute top-1/3 right-[20%] z-20">
                        <TerritoryCard name="SUISSE" type="High-Tech Recycling" color="cyan" icon={<Zap size={16}/>} />
                    </div>

                    {/* Node: PACA (Hub Central) */}
                    <div className="absolute bottom-1/3 left-[20%] z-20">
                        <TerritoryCard name="PACA (FR)" type="Hub Déconstruction" color="blue" icon={<Anchor size={16}/>} />
                    </div>

                    {/* Node: ITALIE */}
                    <div className="absolute bottom-1/3 right-[20%] z-20">
                        <TerritoryCard name="ITALIE" type="Industrie Lourde" color="orange" icon={<Factory size={16}/>} />
                    </div>
                    
                    {/* Node: CORSE */}
                    <div className="absolute bottom-0 left-[30%] z-20">
                        <TerritoryCard name="CORSE" type="Gisement" color="emerald" icon={<Leaf size={16}/>} />
                    </div>

                    {/* Connecteurs SVG animés */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80" viewBox="0 0 800 600">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                                <stop offset="100%" style={{stopColor:'#14b8a6', stopOpacity:1}} />
                            </linearGradient>
                            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" fill="#94a3b8">
                                <path d="M0,0 L0,6 L6,3 z" />
                            </marker>
                        </defs>
                        
                        {/* PACA -> Nordics (Longue distance) */}
                        <path className="animate-dash" d="M 250 350 Q 300 200 400 80" fill="none" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="10,5" markerEnd="url(#arrow)" />
                        
                        {/* PACA -> Suisse */}
                        <path className="animate-dash-slow" d="M 250 350 Q 400 300 600 220" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrow)" />

                        {/* PACA -> Italie */}
                        <path d="M 250 350 L 600 350" fill="none" stroke="#f97316" strokeWidth="4" markerEnd="url(#arrow)" />

                        {/* Corse -> Italie */}
                        <path d="M 300 550 Q 450 500 600 380" fill="none" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
                    </svg>
                </div>
            </div>

            {/* Panneau Latéral (Flux Détails) */}
            <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Transits Actifs</h3>
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                    {EUROPEAN_FLOWS.map((flow) => (
                        <div key={flow.id} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all group">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg bg-slate-900 ${flow.color}`}>
                                        <flow.icon size={14} />
                                    </div>
                                    <span className="font-bold text-slate-200 text-sm">{flow.material}</span>
                                </div>
                                <span className="text-xs font-mono text-slate-400">{flow.volume} T</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2">
                                <span>{flow.source}</span>
                                <div className="h-px bg-slate-600 flex-1"></div>
                                <span>{flow.target}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 italic">{flow.desc}</p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl">
                    <h4 className="text-emerald-400 font-bold text-sm mb-1">Innovation Suisse</h4>
                    <p className="text-xs text-emerald-200/70">
                        Le partenariat avec Composite Recycling permet de traiter 150T de fibre de verre par pyrolyse ce mois-ci.
                    </p>
                </div>
            </div>
       </div>
       
       <style>{`
         @keyframes dash {
           from { stroke-dashoffset: 100; }
           to { stroke-dashoffset: 0; }
         }
         .animate-dash {
           animation: dash 3s linear infinite;
         }
         .animate-dash-slow {
            animation: dash 5s linear infinite;
         }
       `}</style>
    </div>
  );
};

const TerritoryCard: React.FC<{ name: string; type: string; color: string; icon?: React.ReactNode }> = ({ name, type, color, icon }) => {
    const colors: any = {
        blue: "border-blue-500 text-blue-400 bg-blue-900/80 shadow-blue-500/20",
        orange: "border-orange-500 text-orange-400 bg-orange-900/80 shadow-orange-500/20",
        emerald: "border-emerald-500 text-emerald-400 bg-emerald-900/80 shadow-emerald-500/20",
        teal: "border-teal-500 text-teal-300 bg-teal-900/80 shadow-teal-500/20",
        cyan: "border-cyan-500 text-cyan-300 bg-cyan-900/80 shadow-cyan-500/20",
    };

    return (
        <div className={`px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg flex flex-col items-center gap-1 transform hover:scale-110 transition-transform cursor-default ${colors[color]}`}>
            {icon}
            <span className="font-bold text-sm tracking-wider whitespace-nowrap">{name}</span>
            <span className="text-[9px] uppercase opacity-80 font-semibold">{type}</span>
        </div>
    )
}

export default CrossBorderBridge;