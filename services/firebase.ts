import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Security Note: API Keys should be loaded from environment variables in a real deployment.
// For GitHub/Vercel, set 'FIREBASE_API_KEY' in your project settings.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "", // Securité: Clé retirée du code source
  authDomain: "prisme-1.firebaseapp.com",
  projectId: "prisme-1",
  storageBucket: "prisme-1.firebasestorage.app",
  messagingSenderId: "360224013094",
  appId: "1:360224013094:web:5b65b5924a231d98895fe7",
  measurementId: "G-JSZ4VJ9KL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Function to test database connectivity by writing a document
export const testFirebaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    if (!firebaseConfig.apiKey) {
        return { success: false, message: "Erreur: Clé API Firebase manquante dans les variables d'environnement." };
    }
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