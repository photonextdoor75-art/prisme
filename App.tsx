
import React, { useState } from 'react';
import { AppView } from './types';
import CrossBorderBridge from './components/CrossBorderBridge';
import SystemDiagnostics from './components/SystemDiagnostics';
import PACAMap from './components/PACAMap';
import ItalyMap from './components/ItalyMap';
import CorsicaMap from './components/CorsicaMap';
import GreenlinaMachine from './components/GreenlinaMachine';
import EcoMarketing from './components/EcoMarketing';
import RegulatoryBridge from './components/RegulatoryBridge';
import CircularMarketplace from './components/CircularMarketplace';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, Globe, ShieldCheck, MapPin, Zap, Megaphone, Scale, ShoppingBag, Flag } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case AppView.BRIDGE:
        return <CrossBorderBridge />;
      case AppView.REGION_SUD:
        return <PACAMap />;
      case AppView.ITALY_MAP:
        return <ItalyMap />;
      case AppView.CORSICA_MAP:
        return <CorsicaMap />;
      case AppView.GREENLINA_MACHINE:
        return <GreenlinaMachine />;
      case AppView.ECO_MARKETING:
        return <EcoMarketing />;
      case AppView.REGULATORY:
        return <RegulatoryBridge />;
      case AppView.MARKETPLACE:
        return <CircularMarketplace />;
      case AppView.DASHBOARD:
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-50">
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-indigo-500 rounded-xl shadow-lg shadow-emerald-900/50 flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="ml-3 font-bold text-lg hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PRISME
            </span>
          </div>

          <nav className="mt-6 flex flex-col gap-2 px-2 lg:px-4 flex-1">
             <NavItem 
                icon={<LayoutDashboard size={20} />} 
                label="Tour de Contrôle" 
                active={currentView === AppView.DASHBOARD} 
                onClick={() => setCurrentView(AppView.DASHBOARD)} 
             />
             
             {/* Section Coopération UE */}
             <div className="my-2 h-px bg-slate-800 mx-2"></div>
             <p className="hidden lg:block px-4 text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                 <Flag size={10} /> Interreg / Extravert
             </p>
             <NavItem 
                icon={<Scale size={20} />} 
                label="Visa Juridique" 
                active={currentView === AppView.REGULATORY} 
                onClick={() => setCurrentView(AppView.REGULATORY)} 
             />
             <NavItem 
                icon={<ShoppingBag size={20} />} 
                label="Bourse Matières" 
                active={currentView === AppView.MARKETPLACE} 
                onClick={() => setCurrentView(AppView.MARKETPLACE)} 
             />

             <div className="my-2 h-px bg-slate-800 mx-2"></div>
             <p className="hidden lg:block px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Piliers Techniques</p>
             <NavItem 
                icon={<Globe size={20} />} 
                label="Pont Transfrontalier" 
                active={currentView === AppView.BRIDGE} 
                onClick={() => setCurrentView(AppView.BRIDGE)} 
             />
             
             <div className="my-2 h-px bg-slate-800 mx-2"></div>
             <p className="hidden lg:block px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Innovation</p>
             <NavItem 
                icon={<Zap size={20} />} 
                label="Financement Machine" 
                active={currentView === AppView.GREENLINA_MACHINE} 
                onClick={() => setCurrentView(AppView.GREENLINA_MACHINE)} 
             />
             <NavItem 
                icon={<Megaphone size={20} />} 
                label="Marketing Écologique" 
                active={currentView === AppView.ECO_MARKETING} 
                onClick={() => setCurrentView(AppView.ECO_MARKETING)} 
             />

             <div className="my-2 h-px bg-slate-800 mx-2"></div>
             <p className="hidden lg:block px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Territoires</p>
             <NavItem 
                icon={<MapPin size={20} />} 
                label="Région Sud (PACA)" 
                active={currentView === AppView.REGION_SUD} 
                onClick={() => setCurrentView(AppView.REGION_SUD)} 
             />
             <NavItem 
                icon={<MapPin size={20} />} 
                label="Corse (Corsica)" 
                active={currentView === AppView.CORSICA_MAP} 
                onClick={() => setCurrentView(AppView.CORSICA_MAP)} 
             />
             <NavItem 
                icon={<MapPin size={20} />} 
                label="Italie (Italia)" 
                active={currentView === AppView.ITALY_MAP} 
                onClick={() => setCurrentView(AppView.ITALY_MAP)} 
             />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
            <div className="mb-4 p-3 rounded-xl bg-blue-900/20 border border-blue-800/50 hidden lg:flex flex-col gap-2">
                <div className="flex items-center gap-2">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="EU Flag" className="w-6 h-auto" />
                     <span className="text-xs font-bold text-blue-200">Interreg Marittimo</span>
                </div>
                <p className="text-[10px] text-blue-300/70 leading-tight">Projet candidat EXTRAVERT<br/>Coopération FR-IT</p>
            </div>

            {/* Mini Diagnostics in Sidebar */}
            <SystemDiagnostics isSidebar={true} />
            
            <div className="flex items-center gap-3 justify-center lg:justify-start opacity-60 hover:opacity-100 transition-opacity cursor-pointer mt-4">
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

export default App;
