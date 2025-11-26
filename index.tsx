import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// --- VERBOSE DEBUGGING SETUP ---
// Ce script capture les erreurs qui surviennent avant le montage de React (ex: SyntaxError)
// et les affiche sur l'écran gris pour que vous puissiez comprendre ce qui se passe.
window.addEventListener('error', (event) => {
  const errorMsg = `[Erreur Critique] ${event.message} \nFichier: ${event.filename} \nLigne: ${event.lineno}`;
  
  // Création d'une UI d'urgence si elle n'existe pas
  let errorContainer = document.getElementById('crash-overlay');
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'crash-overlay';
    errorContainer.style.position = 'fixed';
    errorContainer.style.top = '0';
    errorContainer.style.left = '0';
    errorContainer.style.width = '100vw';
    errorContainer.style.height = '100vh';
    errorContainer.style.backgroundColor = '#0f172a'; // Dark slate
    errorContainer.style.color = '#ef4444'; // Red
    errorContainer.style.padding = '40px';
    errorContainer.style.fontFamily = 'monospace';
    errorContainer.style.zIndex = '99999';
    errorContainer.style.overflow = 'auto';
    document.body.appendChild(errorContainer);
    
    const title = document.createElement('h1');
    title.innerText = "L'application n'a pas pu démarrer";
    title.style.fontSize = '24px';
    title.style.marginBottom = '20px';
    title.style.color = 'white';
    errorContainer.appendChild(title);
  }
  
  const msg = document.createElement('pre');
  msg.style.border = '1px solid #ef4444';
  msg.style.padding = '15px';
  msg.style.borderRadius = '8px';
  msg.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
  msg.innerText = errorMsg;
  errorContainer.appendChild(msg);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);