// src/firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

export const messaging = firebase.messaging.isSupported() ? firebaseApp.messaging() : null;

if (messaging) {
  // Request permission and get token...
  messaging.getToken({ vapidKey: 'BAO1aOOYAwRnQf0arlOX6Q0HRsQ8pSnc8R6-WTUcaIxTcDcMe6ZQHTTpnw-WKujHDURBaU3m2dr0N-YR0JtWSm4' }).then((currentToken) => {
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      // You might want to send this token to your server for future use.
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // Here you can specify how you want to handle foreground messages
    alert(`Notification: ${payload.notification.title}`); // Example: showing an alert
  });
  
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = firebaseApp.firestore();

export default firebase;