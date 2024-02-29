// src/firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBm2-2fmRWO22W2PNCntq2yKVkpAiXUquA",
  authDomain: "mayday-sd-d56be.firebaseapp.com",
  projectId: "mayday-sd-d56be",
  storageBucket: "mayday-sd-d56be.appspot.com",
  messagingSenderId: "75531179633",
  appId: "1:75531179633:web:5e7f4849a28d556fe22dd0",
  measurementId: "G-3S2DS73FVL"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = firebaseApp.firestore();
