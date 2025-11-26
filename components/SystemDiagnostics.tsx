import React, { useState } from 'react';
import { testFirebaseConnection } from '../services/firebase';
import { testGeminiConnection } from '../services/geminiService';
import { Activity, Database, Cpu, CheckCircle2, XCircle, Loader2, AlertTriangle } from 'lucide-react';

const SystemDiagnostics: React.FC = () => {
  const [firebaseStatus, setFirebaseStatus] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message: string; hint?: string }>({ status: 'idle', message: '' });
  const [geminiStatus, setGeminiStatus] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ status: 'idle', message: '' });

  const runFirebaseTest = async () => {
    setFirebaseStatus({ status: 'loading', message: 'Tentative d\'écriture dans Firestore...' });
    const result = await testFirebaseConnection();
    
    let hint = undefined;
    if (!result.success && result.message.includes('permission-denied')) {
        hint = "🔴 ACCÈS REFUSÉ : Allez dans la Console Firebase > Firestore Database > Règles (Rules) et mettez 'allow read, write: if true;'";
    } else if (!result.success && result.message.includes('not-found')) {
        hint = "🟠 BASE INTROUVABLE : Avez-vous cliqué sur 'Créer une base de données' dans la section Firestore de la console Firebase ?";
    }

    setFirebaseStatus({ 
      status: result.success ? 'success' : 'error', 
      message: result.message,
      hint
    });
  };

  const runGeminiTest = async () => {
    setGeminiStatus({ status: 'loading', message: 'Connexion à l\'API Gemini...' });
    const result = await testGeminiConnection();
    setGeminiStatus({ 
      status: result.success ? 'success' : 'error', 
      message: result.message 
    });
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-700 mt-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Activity className="text-emerald-400" /> 
        Diagnostic Système
      </h3>
      <p className="text-slate-400 mb-6 text-sm">
        Utilisez ces outils pour vérifier que votre déploiement est correctement connecté aux services externes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Firebase Tester */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Database size={18} className="text-orange-400" />
              Base de Données
            </div>
            <StatusBadge status={firebaseStatus.status} />
          </div>
          
          <button 
            onClick={runFirebaseTest}
            disabled={firebaseStatus.status === 'loading'}
            className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors mb-3 flex items-center justify-center gap-2 relative z-10"
          >
            {firebaseStatus.status === 'loading' && <Loader2 size={14} className="animate-spin" />}
            Tester l'écriture DB
          </button>
          
          <div className="bg-black/40 p-3 rounded font-mono text-xs text-slate-400 min-h-[60px] break-words relative z-10">
             <span className="text-slate-500">$ test_db_write</span><br/>
             {firebaseStatus.message || "En attente du test..."}
             {firebaseStatus.hint && (
                 <div className="mt-2 pt-2 border-t border-slate-700 text-amber-400 font-bold flex gap-2">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>{firebaseStatus.hint}</span>
                 </div>
             )}
          </div>
        </div>

        {/* Gemini Tester */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Cpu size={18} className="text-blue-400" />
              Intelligence Artificielle
            </div>
            <StatusBadge status={geminiStatus.status} />
          </div>

          <button 
            onClick={runGeminiTest}
            disabled={geminiStatus.status === 'loading'}
            className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors mb-3 flex items-center justify-center gap-2"
          >
            {geminiStatus.status === 'loading' && <Loader2 size={14} className="animate-spin" />}
            Tester la connexion IA
          </button>

          <div className="bg-black/40 p-3 rounded font-mono text-xs text-slate-400 min-h-[60px] break-words">
             <span className="text-slate-500">$ ping_gemini_api</span><br/>
             {geminiStatus.message || "En attente du test..."}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: 'idle' | 'loading' | 'success' | 'error' }> = ({ status }) => {
  if (status === 'loading') return <span className="text-slate-500 text-xs">Test en cours...</span>;
  if (status === 'success') return <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle2 size={14} /> OK</span>;
  if (status === 'error') return <span className="flex items-center gap-1 text-red-400 text-xs font-bold"><XCircle size={14} /> ERREUR</span>;
  return <span className="text-slate-600 text-xs">Prêt</span>;
};

export default SystemDiagnostics;