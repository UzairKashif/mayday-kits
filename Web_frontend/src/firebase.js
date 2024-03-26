// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWI_IdKnNKkPi8oAYlxnOVG1gq0b7vOHY",
  authDomain: "mayday-kits.firebaseapp.com",
  projectId: "mayday-kits",
  storageBucket: "mayday-kits.appspot.com",
  messagingSenderId: "150571378871",
  appId: "1:150571378871:web:5e8bbd27b5acc1ac0f4532"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)