import React, { useState } from 'react';
import { AppView } from './types';
import ValuationEngine from './components/ValuationEngine';
import TerritorialMap from './components/TerritorialMap';
import CrossBorderBridge from './components/CrossBorderBridge';
import SystemDiagnostics from './components/SystemDiagnostics';
import PACAMap from './components/PACAMap';
import { LayoutDashboard, Coins, Map as MapIcon, Globe, ShieldCheck, Database, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case AppView.VALUATION:
        return <ValuationEngine />;
      case AppView.MAP:
        return <TerritorialMap />;
      case AppView.BRIDGE:
        return <CrossBorderBridge />;
      case AppView.REGION_SUD:
        return <PACAMap />;
      case AppView.DASHBOARD:
      default:
        return <DashboardHome onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-50">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-indigo-500 rounded-xl shadow-lg shadow-emerald-900/50 flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="ml-3 font-bold text-lg hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PRISME
            </span>
          </div>

          <nav className="mt-8 flex flex-col gap-2 px-2 lg:px-4">
             <NavItem 
                icon={<LayoutDashboard size={20} />} 
                label="Tableau de Bord" 
                active={currentView === AppView.DASHBOARD} 
                onClick={() => setCurrentView(AppView.DASHBOARD)} 
             />
             <div className="my-2 h-px bg-slate-800 mx-2"></div>
             <p className="hidden lg:block px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Piliers</p>
             <NavItem 
                icon={<Coins size={20} />} 
                label="Révélation Valeur" 
                active={currentView === AppView.VALUATION} 
                onClick={() => setCurrentView(AppView.VALUATION)} 
             />
             <NavItem 
                icon={<MapIcon size={20} />} 
                label="Carte Gisements" 
                active={currentView === AppView.MAP} 
                onClick={() => setCurrentView(AppView.MAP)} 
             />
             <NavItem 
                icon={<Globe size={20} />} 
                label="Pont Transfrontalier" 
                active={currentView === AppView.BRIDGE} 
                onClick={() => setCurrentView(AppView.BRIDGE)} 
             />
             
             <div className="my-2 h-px bg-slate-800 mx-2"></div>
             <p className="hidden lg:block px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Focus</p>
             <NavItem 
                icon={<MapPin size={20} />} 
                label="Région Sud (PACA)" 
                active={currentView === AppView.REGION_SUD} 
                onClick={() => setCurrentView(AppView.REGION_SUD)} 
             />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 justify-center lg:justify-start opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <ShieldCheck size={20} />
                <span className="hidden lg:block text-sm">Green Manager</span>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 h-full overflow-hidden">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group w-full justify-center lg:justify-start
      ${active 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }
    `}
  >
    {icon}
    <span className="hidden lg:block font-medium">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 hidden lg:block shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>}
  </button>
);

const DashboardHome: React.FC<{ onChangeView: (view: AppView) => void }> = ({ onChangeView }) => (
    <div className="h-full p-8 overflow-y-auto animate-fade-in">
        <header className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Bienvenue sur <span className="text-emerald-400">Prisme Circulaire</span></h1>
            <p className="text-slate-400 max-w-2xl">
                La Tour de Contrôle pour transformer vos déchets en profits. 
                Utilisez l'IA Gemini pour valoriser vos actifs, visualisez vos stocks sur le territoire et connectez-vous au marché européen.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard 
                title="Révélation de Valeur"
                desc="Le moteur financier et écologique."
                icon={<Coins className="text-emerald-400" size={32} />}
                stats="+24% de marge potentielle"
                onClick={() => onChangeView(AppView.VALUATION)}
                color="emerald"
            />
            <DashboardCard 
                title="Visibilité Territoriale"
                desc="Cartographie des mines urbaines."
                icon={<MapIcon className="text-blue-400" size={32} />}
                stats="6 Hubs identifiés"
                onClick={() => onChangeView(AppView.MAP)}
                color="blue"
            />
            <DashboardCard 
                title="Pont Transfrontalier"
                desc="Synergies France-Italie."
                icon={<Globe className="text-indigo-400" size={32} />}
                stats="1,240 T échangées"
                onClick={() => onChangeView(AppView.BRIDGE)}
                color="indigo"
            />
        </div>
        
        {/* System Diagnostics Panel */}
        <SystemDiagnostics />
    </div>
);

const DashboardCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; stats: string; onClick: () => void; color: string }> = ({ title, desc, icon, stats, onClick, color }) => {
    const colorClasses = {
        emerald: "hover:border-emerald-500/50 hover:shadow-emerald-900/20",
        blue: "hover:border-blue-500/50 hover:shadow-blue-900/20",
        indigo: "hover:border-indigo-500/50 hover:shadow-indigo-900/20",
    }[color] || "";

    return (
        <button onClick={onClick} className={`text-left group glass-panel p-8 rounded-2xl border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 ${colorClasses}`}>
            <div className="mb-6 bg-slate-900/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">{desc}</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                <span className="text-white font-mono font-semibold">{stats}</span>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <LayoutDashboard size={14} className="rotate-45" /> {/* Arrow icon substitute */}
                </div>
            </div>
        </button>
    )
}

export default App;