import React from 'react';
import logo from './logo.svg';
import './App.css';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
