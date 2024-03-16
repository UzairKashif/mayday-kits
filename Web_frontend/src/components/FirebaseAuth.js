import React, { useEffect } from 'react';
import firebase from '../firebaseConfig'; // Import your Firebase config
import 'firebaseui/dist/firebaseui.css';

// Lazy load the FirebaseUI Auth component
const firebaseui = import('firebaseui');

const FirebaseAuth = () => {
  useEffect(() => {
    firebaseui.then((firebaseui) => {
      const uiConfig = {
        signInSuccessUrl: '/Dashboard', // Redirect after sign-in
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // Add other providers as needed
        ],
      };

      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    });
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuth;
