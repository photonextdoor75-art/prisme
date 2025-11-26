
import React from 'react';
import { ShoppingBag, Search, Filter, ArrowUpRight, MapPin, Briefcase, Coins, Factory } from 'lucide-react';

const LISTINGS = [
  {
    id: 1,
    type: 'sell',
    title: "500 T - CSR Haut PCI (Issue Nautisme)",
    location: "Toulon (FR)",
    price: "15 € / T",
    seller: "France Récupération",
    jobPotential: "High",
    tags: ["Énergie", "Cimenterie", "Certifié APER"]
  },
  {
    id: 2,
    type: 'buy',
    title: "Recherche Inox 316L (Accastillage)",
    location: "Turin (IT)",
    price: "Prix Marché + 5%",
    seller: "Fonderie SteelIt",
    jobPotential: "Med",
    tags: ["Métal", "Fonderie", "Premium"]
  },
  {
    id: 3,
    type: 'sell',
    title: "Lot Bois Teck (Ponts Bateaux)",
    location: "Bastia (Corse)",
    price: "Sur devis",
    seller: "Chantier Naval Costa",
    jobPotential: "High",
    tags: ["Design", "Menuiserie", "Mobilier"]
  },
  {
    id: 4,
    type: 'buy',
    title: "Fibre de verre propre (Pyrolyse)",
    location: "Lausanne (CH)",
    price: "Premium",
    seller: "Composite Recycling",
    jobPotential: "Very High",
    tags: ["R&D", "Innovation", "Thermoplastique"]
  }
];

const CircularMarketplace: React.FC = () => {
  return (
    <div className="h-full p-6 animate-fade-in overflow-y-auto custom-scrollbar bg-slate-950">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><ShoppingBag size={24}/></span>
                Bourse aux Matières <span className="text-slate-500 font-normal text-lg">| France - Italie</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Symbiose Industrielle : Transformez vos déchets en ressources pour autrui.</p>
        </div>
        <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 flex items-center gap-2 transition-transform hover:scale-105">
            <ArrowUpRight size={18} /> Publier une Offre
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input 
                type="text" 
                placeholder="Rechercher une matière (ex: Aluminium, CSR, Fibre...)" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
        </div>
        <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 flex items-center gap-2">
            <Filter size={18} /> Filtres
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {LISTINGS.map((item) => (
            <div key={item.id} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                {/* Type Badge */}
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-bl-xl ${item.type === 'sell' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {item.type === 'sell' ? 'Offre Vente' : 'Demande Achat'}
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1"><MapPin size={14}/> {item.location}</span>
                        <span className="flex items-center gap-1"><Factory size={14}/> {item.seller}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
                        <Coins size={18} className="text-amber-400"/> {item.price}
                    </div>
                    
                    {/* Indicateur Potentiel Emploi (Argument UE) */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-900/30 border border-indigo-500/30" title="Potentiel de création d'emplois locaux">
                        <Briefcase size={14} className="text-indigo-400" />
                        <span className="text-xs font-medium text-indigo-300">
                            Impact Emploi: <span className={item.jobPotential === 'Very High' ? 'text-emerald-400 font-bold' : 'text-white'}>{item.jobPotential}</span>
                        </span>
                    </div>
                </div>
            </div>
        ))}
      </div>
      
      {/* Start-up Incubator Callout */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 flex items-center justify-between">
        <div>
            <h4 className="text-lg font-bold text-white mb-1">Vous êtes une Start-up ?</h4>
            <p className="text-sm text-slate-300">Utilisez ces gisements pour lancer votre activité. Le programme EXTRAVERT soutient l'innovation.</p>
        </div>
        <button className="px-4 py-2 bg-slate-800 hover:bg-white hover:text-slate-900 text-white rounded-lg text-sm font-bold transition-colors">
            Accéder à l'Incubateur Virtuel
        </button>
      </div>

    </div>
  );
};

export default CircularMarketplace;