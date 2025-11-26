import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-200 font-sans">
          <div className="bg-slate-800 p-8 rounded-2xl border border-red-500/30 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-full text-red-500">
                <AlertTriangle size={32} />
              </div>
              <h1 className="text-2xl font-bold text-white">Erreur Critique Système</h1>
            </div>
            
            <p className="text-slate-400 mb-4">
              L'application a rencontré une erreur inattendue et a dû s'arrêter pour protéger les données.
            </p>

            <div className="bg-black/50 p-4 rounded-lg border border-slate-700 font-mono text-sm text-red-300 overflow-x-auto mb-6">
              {this.state.error && this.state.error.toString()}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors"
            >
              Redémarrer l'application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;