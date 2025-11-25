import React, { useState } from 'react';
import { analyzeAssets } from '../services/geminiService';
import { MetricResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2, Coins, Leaf, Users, RefreshCw, ArrowRight, Save, CheckCircle2 } from 'lucide-react';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ValuationEngine: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetricResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setSaveStatus('idle');
    
    try {
      const data = await analyzeAssets(input);
      setResult(data);
      
      // Auto-save to Firebase
      saveResultToFirebase(input, data);

    } catch (err) {
      setError("Erreur lors de l'analyse. Vérifiez votre clé API ou réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const saveResultToFirebase = async (assetDescription: string, metricResult: MetricResult) => {
    try {
        setSaveStatus('saving');
        await addDoc(collection(db, "valuations"), {
            assetDescription,
            metricResult,
            createdAt: serverTimestamp()
        });
        setSaveStatus('saved');
    } catch (e) {
        console.error("Error saving to Firestore:", e);
        // We don't block the UI flow for a save error, just log it
        setSaveStatus('idle'); 
    }
  };

  const chartData = result ? [
    { name: 'Finance', value: result.monetaryValue, color: '#10b981' }, // emerald-500
    { name: 'CO2 (kg)', value: result.co2SavedKg, color: '#0ea5e9' }, // sky-500
  ] : [];

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 p-6 animate-fade-in">
      {/* Input Section */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-900/10">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                <Coins size={24} />
            </span>
            Révélation de Valeur
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Décrivez vos actifs (ex: "2 tonnes de câbles cuivre", "50 PC portables HS").
            L'IA calculera leur potentiel caché.
          </p>
          
          <textarea
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none transition-all h-48"
            placeholder="Ex: 500 chaises de bureau, 300kg de chutes de textile..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !input}
            className={`mt-4 w-full py-3 px-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
              ${loading || !input 
                ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 hover:scale-[1.02]'
              }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Coins size={20} />}
            {loading ? 'Analyse en cours...' : 'Calculer la Valeur'}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {saveStatus === 'saved' && (
             <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
                <CheckCircle2 size={16} />
                Résultat sauvegardé dans Firebase.
             </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {result ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
             {/* Key Metrics Cards */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><Coins /></div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider">Valeur Financière</p>
                                <p className="text-2xl font-bold text-white">{result.monetaryValue.toLocaleString()} €</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-sky-500/20 rounded-lg text-sky-400"><Leaf /></div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider">CO2 Évité</p>
                                <p className="text-2xl font-bold text-white">{result.co2SavedKg.toLocaleString()} kg</p>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Users /></div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider">Impact Social</p>
                                <p className="text-2xl font-bold text-white">{result.jobsSupported} <span className="text-sm font-normal text-slate-400">heures/emplois</span></p>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><RefreshCw /></div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider">Potentiel Réemploi</p>
                                <p className="text-2xl font-bold text-white">{result.reusePotentialPercent}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualization & Reasoning */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc'}}
                                cursor={{fill: 'transparent'}}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex-1 overflow-y-auto">
                    <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                        <ArrowRight size={16} /> Analyse de l'IA
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {result.reasoning}
                    </p>
                </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center glass-panel rounded-2xl border-dashed border-2 border-slate-700">
             <div className="text-center text-slate-500 max-w-sm">
                <div className="bg-slate-800 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Coins size={40} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">En attente de données</h3>
                <p>Utilisez le formulaire pour transformer vos actifs en métriques décisionnelles.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValuationEngine;