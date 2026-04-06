// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWB0N6lgHGi-_oDxs0Pgf3wZMFcPfqwZo",
  authDomain: "career-compass-2.firebaseapp.com",
  databaseURL: "https://career-compass-2-default-rtdb.firebaseio.com",
  projectId: "career-compass-2",
  storageBucket: "career-compass-2.firebasestorage.app",
  messagingSenderId: "75086796441",
  appId: "1:75086796441:web:9a790a759011674b740a08"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
