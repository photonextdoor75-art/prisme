import React from 'react';
import { FLOWS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRightLeft, TrendingUp, Truck } from 'lucide-react';

const CrossBorderBridge: React.FC = () => {
  // Mock data for the chart
  const flowHistory = [
    { day: 'Lun', fr: 120, it: 90 },
    { day: 'Mar', fr: 132, it: 110 },
    { day: 'Mer', fr: 101, it: 130 },
    { day: 'Jeu', fr: 134, it: 150 },
    { day: 'Ven', fr: 190, it: 170 },
    { day: 'Sam', fr: 150, it: 120 },
    { day: 'Dim', fr: 110, it: 90 },
  ];

  return (
    <div className="h-full p-6 animate-fade-in flex flex-col gap-6">
       <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ArrowRightLeft className="text-indigo-400" />
                    Pont Transfrontalier (France - Italie)
                </h2>
                <p className="text-slate-400">Optimisation des échanges de matières premières secondaires.</p>
            </div>
            <div className="flex gap-4">
                <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase">Flux Export (FR)</p>
                    <p className="text-xl font-bold text-indigo-400">1,240 T</p>
                </div>
                <div className="w-px bg-slate-700"></div>
                 <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase">Flux Import (IT)</p>
                    <p className="text-xl font-bold text-orange-400">980 T</p>
                </div>
            </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Active Flows List */}
            <div className="glass-panel p-6 rounded-2xl col-span-1 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Truck size={18} className="text-slate-400"/>
                    Transits Actifs
                </h3>
                <div className="space-y-4 overflow-y-auto pr-2">
                    {FLOWS.map((flow, idx) => (
                        <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-700 text-slate-300">{flow.material}</span>
                                <span className="text-xs text-emerald-400 font-mono">Eff: {flow.efficiency}%</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-300 text-sm">
                                <span>{flow.source}</span>
                                <ArrowRightLeft size={14} className="text-slate-500" />
                                <span>{flow.target}</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-500">Volume: {flow.volumeTons} Tonnes</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Flow Chart */}
            <div className="glass-panel p-6 rounded-2xl col-span-2 flex flex-col">
                 <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-slate-400"/>
                    Analyse des Flux (7 jours)
                </h3>
                <div className="flex-1 min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={flowHistory}>
                            <defs>
                                <linearGradient id="colorFr" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorIt" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc'}}
                            />
                            <Area type="monotone" dataKey="fr" stroke="#818cf8" fillOpacity={1} fill="url(#colorFr)" name="France" />
                            <Area type="monotone" dataKey="it" stroke="#fb923c" fillOpacity={1} fill="url(#colorIt)" name="Italie" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl text-indigo-200 text-sm">
                    💡 <strong>Insight :</strong> Le flux d'Aluminium recyclé Lyon-Turin a augmenté de 15% cette semaine grâce à la nouvelle régulation transfrontalière.
                </div>
            </div>
       </div>
    </div>
  );
};

export default CrossBorderBridge;