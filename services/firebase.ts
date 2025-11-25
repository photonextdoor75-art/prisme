import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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