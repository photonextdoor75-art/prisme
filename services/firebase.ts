
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Security Note: API Keys should be loaded from environment variables.
// If missing, we enter a "Degraded/Mock" mode to prevent app crash.
const apiKey = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "prisme-1.firebaseapp.com",
  projectId: "prisme-1",
  storageBucket: "prisme-1.firebasestorage.app",
  messagingSenderId: "360224013094",
  appId: "1:360224013094:web:5b65b5924a231d98895fe7",
  measurementId: "G-JSZ4VJ9KL6"
};

let app = null;
let analytics = null;
let db: any = null;

// Initialize Firebase only if API Key is present
if (apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase API Key missing. App running in offline/demo mode (No DB).");
}

export { app, analytics, db };

// Function to test database connectivity
export const testFirebaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  if (!db) {
      return { success: false, message: "Mode Hors Ligne : Clé API Firebase manquante ou invalide." };
  }
  try {
    const docRef = await addDoc(collection(db, "system_diagnostics"), {
      test: "connection_check",
      timestamp: serverTimestamp(),
      platform: navigator.userAgent
    });
    return { success: true, message: `Succès! Document écrit avec ID: ${docRef.id}` };
  } catch (error: any) {
    console.error("Firebase Test Error:", error);
    return { success: false, message: error.message || "Erreur inconnue lors de l'écriture DB" };
  }
};
