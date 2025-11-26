
import React, { useState } from 'react';
import { ShieldCheck, FileText, ArrowRightLeft, CheckCircle2, AlertTriangle, Scale, Lock, Globe } from 'lucide-react';

const RegulatoryBridge: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="h-full p-6 animate-fade-in overflow-y-auto custom-scrollbar bg-slate-950">
      
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 border border-blue-500/30">
                <Scale size={32} />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-white">Conformité Transfrontalière <span className="text-blue-500">UE</span></h1>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                    <Globe size={12} /> RÈGLEMENT (CE) N° 1013/2006 • ANNEXE VII
                </div>
            </div>
        </div>
        <p className="text-slate-400 max-w-3xl">
            Outil d'harmonisation juridique pour le transfert de déchets ("Mines Urbaines") entre la France, l'Italie et la Corse.
            Sécurisez vos flux logistiques en générant les documents de notification obligatoires.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form / Process */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText size={20} className="text-emerald-400"/> Assistant de Transfert
                </h3>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-3 h-3 rounded-full ${step >= i ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {/* Simulation des étapes */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Expéditeur (France)</label>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold">FR</div>
                            <div>
                                <p className="text-white font-medium">France Récup. Recyclage</p>
                                <p className="text-xs text-slate-400">Toulon (83000)</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Destinataire (Italie)</label>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center text-xs font-bold text-green-100">IT</div>
                            <div>
                                <p className="text-white font-medium">Cimenterie Buzzi Unicem</p>
                                <p className="text-xs text-slate-400">Barletta (76121)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                    <label className="text-xs text-slate-500 uppercase font-bold mb-4 block">Caractérisation du Déchet (Code CED)</label>
                    
                    <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg border border-slate-600 mb-4">
                        <div className="p-2 bg-orange-500/20 rounded text-orange-400 font-mono font-bold">17 02 03</div>
                        <div className="flex-1">
                            <p className="text-white text-sm font-medium">Matières plastiques (Coques composite broyées / CSR)</p>
                            <p className="text-xs text-slate-400">Non dangereux • Liste Verte (Procédure d'information)</p>
                        </div>
                        <CheckCircle2 className="text-emerald-500" />
                    </div>

                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 text-sm text-blue-200 flex gap-3">
                        <ShieldCheck className="shrink-0" />
                        <p>
                            <strong>Verdict Juridique :</strong> Ce flux est éligible à la procédure simplifiée (Article 18).
                            Pas de notification préalable écrite requise, mais le document "Annexe VII" doit accompagner le transport.
                        </p>
                    </div>
                </div>

                <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                    <FileText size={20} /> Générer le Document Annexe VII (PDF)
                </button>
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Lock size={18} className="text-amber-400" /> Points de Vigilance
                </h3>
                <ul className="space-y-4">
                    <li className="text-sm text-slate-300 flex gap-3">
                        <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>La valorisation R1 (Énergétique) est préférée par l'Italie pour le CSR nautique.</span>
                    </li>
                    <li className="text-sm text-slate-300 flex gap-3">
                        <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>Le contrat B2B entre l'expéditeur et le destinataire doit être effectif avant le départ du camion.</span>
                    </li>
                </ul>
            </div>

            <div className="p-6 rounded-2xl border border-blue-900/50 bg-blue-950/30">
                <div className="flex items-center gap-3 mb-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" alt="EU" className="w-8 h-auto" />
                    <span className="text-blue-300 font-bold text-sm uppercase tracking-wider">Interreg Marittimo</span>
                </div>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                    Ce module a été développé dans le cadre du projet <strong>EXTRAVERT</strong> pour faciliter la symbiose industrielle transfrontalière et lever les freins administratifs.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RegulatoryBridge;