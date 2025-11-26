import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuCEbSIrU1-SqdHjM_n9YwgtUqWq8DXqs",
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