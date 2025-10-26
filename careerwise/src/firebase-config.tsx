//Adding npm configuration from firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCynwWasKOj9sjEZSedCdbCpl6zoIlImSI",
  authDomain: "careerwise-c810c.firebaseapp.com",
  projectId: "careerwise-c810c",
  storageBucket: "careerwise-c810c.firebasestorage.app",
  messagingSenderId: "323308697777",
  appId: "1:323308697777:web:f20f5991e715034ea1ca90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);