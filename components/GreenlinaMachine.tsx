
import React from 'react';
import { Zap, Truck, Box, ArrowRight, Euro, Factory, ShieldCheck, BarChart3 } from 'lucide-react';

const GreenlinaMachine: React.FC = () => {
  return (
    <div className="h-full p-6 animate-fade-in overflow-y-auto custom-scrollbar bg-slate-950">
      
      {/* Header */}
      <header className="mb-8 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
            <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                <Zap size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white">Solution Pyrolyse Mobile <span className="text-cyan-400">Greenlina</span></h1>
        </div>
        <p className="text-slate-400 max-w-3xl">
            La technologie suisse de valorisation des composites in-situ. 
            Transformez le coût du transport des épaves en revenu énergétique directement sur votre zone portuaire.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Concept Card */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Process Visualization */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Factory size={200} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                    <Box size={20} className="text-cyan-400"/> Le Processus Greenlina
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                    {/* Step 1 */}
                    <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 mb-3 shadow-lg">
                            <span className="text-2xl">🛥️</span>
                        </div>
                        <p className="text-white font-bold">Coque Composite</p>
                        <p className="text-xs text-slate-500">Déchet entrant</p>
                    </div>

                    <ArrowRight className="text-slate-600 hidden md:block" />

                    {/* Step 2 (The Machine) */}
                    <div className="text-center flex-1">
                        <div className="w-24 h-24 mx-auto bg-cyan-900/30 rounded-2xl flex items-center justify-center border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-3">
                            <Zap size={40} className="text-cyan-400 animate-pulse" />
                        </div>
                        <p className="text-cyan-400 font-bold uppercase">Unité Pyrolyse</p>
                        <p className="text-xs text-cyan-200/70">Traitement sans oxygène</p>
                    </div>

                    <ArrowRight className="text-slate-600 hidden md:block" />

                    {/* Step 3 (Outputs) */}
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-lg border border-slate-700">
                            <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400"><span className="text-lg">🛢️</span></div>
                            <div className="text-left">
                                <p className="text-white text-sm font-bold">Huile de Pyrolyse</p>
                                <p className="text-[10px] text-slate-400">Valorisation Énergétique</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-lg border border-slate-700">
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white"><span className="text-lg">🧶</span></div>
                            <div className="text-left">
                                <p className="text-white text-sm font-bold">Fibre de Verre</p>
                                <p className="text-[10px] text-slate-400">Recyclage Matière (95% pure)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Economic Argument */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-red-500 bg-slate-900/50">
                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><Truck size={18}/> Le Problème Actuel</h4>
                    <p className="text-slate-300 text-sm mb-4">
                        Transporter des épaves de Corse ou de petits ports isolés vers les grands centres de broyage coûte une fortune et génère du CO2.
                    </p>
                    <div className="text-2xl font-mono text-white">~1500€ <span className="text-xs text-slate-500">/ transport camion</span></div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-900/10">
                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Factory size={18}/> La Solution Greenlina</h4>
                    <p className="text-slate-300 text-sm mb-4">
                        Installation d'une unité compacte (format container) directement sur la zone technique du port.
                    </p>
                    <div className="text-2xl font-mono text-white">0€ <span className="text-xs text-slate-500">de transport externe</span></div>
                </div>
            </div>

        </div>

        {/* Sidebar / CTA */}
        <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-700">
                <h3 className="text-white font-bold mb-4">Cible & Eligibilité</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircleIcon className="text-cyan-400 shrink-0 mt-0.5" size={16} />
                        <span>Groupements de Ports de Plaisance</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircleIcon className="text-cyan-400 shrink-0 mt-0.5" size={16} />
                        <span>Collectivités Territoriales (Corse, Outre-mer)</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircleIcon className="text-cyan-400 shrink-0 mt-0.5" size={16} />
                        <span>Chantiers Navals de Déconstruction</span>
                    </li>
                </ul>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-indigo-900/20">
                <h3 className="text-indigo-300 font-bold mb-2">Modèle Économique</h3>
                <p className="text-xs text-indigo-200/70 mb-4">
                    Achat ou Location longue durée de la machine. Rentabilité assurée par la revente de l'huile et l'économie logistique.
                </p>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-300 border-b border-indigo-500/20 pb-1">
                        <span>Investissement</span>
                        <span className="font-mono">Sur devis</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-300 border-b border-indigo-500/20 pb-1">
                        <span>ROI estimé</span>
                        <span className="font-mono">3-5 ans</span>
                    </div>
                </div>
                <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Euro size={18} /> Demander une Étude
                </button>
            </div>

            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 italic">
                    <span className="font-bold text-slate-300">Note:</span> Pour les particuliers, Greenlina n'est pas un interlocuteur direct. Continuez de passer par l'APER et <span className="text-cyan-400">recyclermonbateau.fr</span>.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

const CheckCircleIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default GreenlinaMachine;
