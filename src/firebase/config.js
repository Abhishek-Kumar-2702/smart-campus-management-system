// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyy5FWoHweCMjuAUF0fcCcogCycQ2PI98",
  authDomain: "smart-campus-bba3c.firebaseapp.com",
  projectId: "smart-campus-bba3c",
  storageBucket: "smart-campus-bba3c.firebasestorage.app",
  messagingSenderId: "912040687085",
  appId: "1:912040687085:web:32f989339ebc8a2d7d63e4",
  measurementId: "G-N4C4PRHDKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);