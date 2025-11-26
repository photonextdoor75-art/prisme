
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend 
} from 'recharts';
import { 
  TrendingUp, Activity, Anchor, Truck, Leaf, DollarSign, 
  ArrowUpRight, Clock, Ship, AlertCircle 
} from 'lucide-react';

// Données consolidées 2025 (Filière Nautique)
const DATA_2025 = {
  kpis: [
    { label: "Total Déconstruit", value: "12,840 T", sub: "Depuis Jan 2025", icon: Ship, color: "text-blue-400", bg: "bg-blue-900/20" },
    { label: "Chiffre d'Affaires", value: "4.2 M€", sub: "Revente Matières", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-900/20" },
    { label: "CO2 Économisé", value: "8,500 T", sub: "Vs Incinération", icon: Leaf, color: "text-green-400", bg: "bg-green-900/20" },
    { label: "Flux Actifs", value: "24", sub: "Transports en cours", icon: Activity, color: "text-orange-400", bg: "bg-orange-900/20" },
  ],
  materialDistribution: [
    { name: 'CSR (Composites)', value: 65, color: '#f97316' }, // Orange
    { name: 'Métaux (Fer/Inox)', value: 20, color: '#94a3b8' }, // Slate
    { name: 'Bois', value: 10, color: '#d97706' }, // Amber
    { name: 'D3E & Autres', value: 5, color: '#8b5cf6' }, // Violet
  ],
  territoryPerformance: [
    { name: 'PACA', boats: 450, tons: 1200 },
    { name: 'Italie', boats: 320, tons: 980 },
    { name: 'Corse', boats: 110, tons: 350 },
  ],
  liveFeed: [
    { time: "10:42", text: "Arrivée barge 'Cap Corse' à Toulon (45 épaves)", type: "logistics" },
    { time: "10:30", text: "Début broyage Lot #442 chez Sclavo (Fréjus)", type: "process" },
    { time: "09:15", text: "Vente lot Aluminium (12T) à Aciérie Dunkerque", type: "finance" },
    { time: "08:45", text: "Incident mineur: Retard camion CSR vers Italie", type: "alert" },
    { time: "Hier", text: "Validation financement Machine Greenlina (Bastia)", type: "success" },
  ]
};

const Dashboard: React.FC<{ onChangeView?: (view: any) => void }> = ({ onChangeView }) => {
  return (
    <div className="h-full p-6 animate-fade-in overflow-y-auto custom-scrollbar bg-slate-950 text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
                Tour de Contrôle <span className="text-slate-500 text-lg font-normal ml-2">| Live 2025</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 ml-7">Supervision globale de la filière nautique & économie circulaire.</p>
        </div>
        <div className="flex gap-3">
            <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm text-emerald-400 flex items-center gap-2">
                <Clock size={16} /> Temps Réel
            </div>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {DATA_2025.kpis.map((kpi, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-600 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
                        <kpi.icon size={24} />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-400 flex items-center gap-1">
                        <TrendingUp size={12} /> 2025
                    </span>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-white font-mono">{kpi.value}</h3>
                    <p className="text-sm text-slate-400 font-medium">{kpi.label}</p>
                    <p className="text-xs text-slate-500">{kpi.sub}</p>
                </div>
            </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 h-auto lg:h-96">
        
        {/* Chart 1: Repartition Matière */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 col-span-1 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Anchor size={18} className="text-blue-400"/> Composition du Gisement
            </h3>
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={DATA_2025.materialDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {DATA_2025.materialDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <RechartsTooltip 
                            contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff'}}
                            itemStyle={{color: '#fff'}}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Chart 2: Performance Territoire */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 col-span-1 lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Truck size={18} className="text-indigo-400"/> Performance par Territoire
            </h3>
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_2025.territoryPerformance} barSize={40}>
                        <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                        <RechartsTooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff'}}
                        />
                        <Bar dataKey="tons" name="Tonnes Traitées" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="boats" name="Bateaux (Unités)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity size={18} className="text-orange-400"/> Activité du Réseau
        </h3>
        <div className="space-y-0">
            {DATA_2025.liveFeed.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-slate-800/50 rounded-lg transition-colors border-b border-slate-800/50 last:border-0">
                    <span className="text-xs font-mono text-slate-500 min-w-[50px]">{item.time}</span>
                    <div className="p-2 rounded-full bg-slate-900 border border-slate-700">
                        {item.type === 'logistics' && <Truck size={14} className="text-blue-400" />}
                        {item.type === 'process' && <FactoryIcon size={14} className="text-orange-400" />}
                        {item.type === 'finance' && <DollarSign size={14} className="text-emerald-400" />}
                        {item.type === 'alert' && <AlertCircle size={14} className="text-red-400" />}
                        {item.type === 'success' && <ArrowUpRight size={14} className="text-purple-400" />}
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

// Icon helper
const FactoryIcon = ({ size, className }: { size: number, className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
)

export default Dashboard;
