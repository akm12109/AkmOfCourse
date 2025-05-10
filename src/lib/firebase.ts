
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Add if auth is needed later

const firebaseConfig = {
  apiKey: "AIzaSyAygmT4i5n_VdPxXu1WnIruPPE5KT8Z-F0",
  authDomain: "btcminingakm.firebaseapp.com",
  projectId: "btcminingakm",
  storageBucket: "btcminingakm.firebasestorage.app",
  messagingSenderId: "220444082576",
  appId: "1:220444082576:web:196aadd6aaccf822ebb315",
  measurementId: "G-7PTCKQPL73"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const auth = getAuth(app); // Add if auth is needed later

export { db, app };
