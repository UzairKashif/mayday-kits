// SignOut.js
import React from 'react';
import firebase from '../../firebaseConfig';


import { auth } from '../../firebaseConfig';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Using `auth` directly
      // Redirect to the login page or handle the signed-out state
      window.location.assign('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOut;
