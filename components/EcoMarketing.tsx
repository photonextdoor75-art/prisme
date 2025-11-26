
import React from 'react';
import { Megaphone, Award, Users, BookOpen, TrendingUp, ShieldCheck, PlayCircle, ArrowRight } from 'lucide-react';

const TRAININGS = [
  {
    id: 1,
    title: "L'Argumentaire Écologique : Fondamentaux (1J)",
    desc: "Apprenez à transformer les contraintes RSE en leviers de vente. Comment parler de déconstruction et de recyclage à un client sans l'ennuyer.",
    level: "Débutant",
    icon: Megaphone,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    border: "border-emerald-500/30"
  },
  {
    id: 2,
    title: "Stop au Greenwashing : Communication Responsable",
    desc: "Maîtrisez le vocabulaire légal (Loi AGEC). Savoir ce qu'on peut dire ou ne pas dire pour éviter le bad buzz et rassurer les clients exigeants.",
    level: "Intermédiaire",
    icon: ShieldCheck,
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    border: "border-blue-500/30"
  },
  {
    id: 3,
    title: "Vendre la 'Fin de Vie' dès l'Achat",
    desc: "Intégrer le cycle de vie du bateau dans le pitch de vente d'un navire neuf. Présenter l'éco-contribution comme un service premium.",
    level: "Avancé",
    icon: TrendingUp,
    color: "text-purple-400",
    bg: "bg-purple-900/20",
    border: "border-purple-500/30"
  },
  {
    id: 4,
    title: "Storytelling de l'Économie Circulaire",
    desc: "Raconter l'histoire des matériaux. Comment une coque devient de l'énergie et une quille devient une voiture. Captiver l'audience.",
    level: "Tous niveaux",
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-900/20",
    border: "border-amber-500/30"
  },
  {
    id: 5,
    title: "Négociation & Valorisation RSE",
    desc: "Justifier la valeur d'une démarche vertueuse face à la concurrence low-cost. Les arguments chiffrés qui font mouche auprès des ports.",
    level: "Expert",
    icon: Award,
    color: "text-pink-400",
    bg: "bg-pink-900/20",
    border: "border-pink-500/30"
  },
  {
    id: 6,
    title: "Management d'Équipe : La Culture Verte",
    desc: "Former vos équipes techniques et commerciales pour qu'elles deviennent les premiers ambassadeurs de votre engagement écologique.",
    level: "Manager",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-900/20",
    border: "border-cyan-500/30"
  }
];

const EcoMarketing: React.FC = () => {
  return (
    <div className="h-full p-6 animate-fade-in overflow-y-auto custom-scrollbar bg-slate-950">
      
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                <Megaphone size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white">Outils Marketing <span className="text-emerald-400">Écologique</span></h1>
        </div>
        <p className="text-slate-400 max-w-3xl">
            La transition écologique ne se fait pas que dans les usines, elle se joue aussi dans les bureaux de vente.
            Formez vos équipes pour valoriser votre engagement auprès de vos clients.
        </p>
      </header>

      {/* Grid de Formations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRAININGS.map((training) => (
            <div key={training.id} className={`glass-panel p-6 rounded-2xl border ${training.border} hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 flex flex-col`}>
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${training.bg} ${training.color}`}>
                        <training.icon size={24} />
                    </div>
                    <span className="text-xs font-mono uppercase text-slate-500 border border-slate-700 px-2 py-1 rounded">
                        {training.level}
                    </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 h-14 line-clamp-2">
                    {training.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                    {training.desc}
                </p>

                <button className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700">
                    <PlayCircle size={16} /> Voir le programme
                </button>
            </div>
        ))}
      </div>

      {/* Section 'Pourquoi' */}
      <div className="mt-12 p-8 glass-panel rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">Pourquoi se former ?</h2>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        80% des plaisanciers se disent sensibles à la fin de vie de leur bateau.
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        L'argument écologique justifie une montée en gamme.
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Anticiper les futures obligations réglementaires européennes.
                    </li>
                </ul>
            </div>
            <div>
                <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 flex items-center gap-2 transition-transform hover:scale-105">
                    Accéder à l'espace E-Learning <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default EcoMarketing;