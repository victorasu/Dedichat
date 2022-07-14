// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDOWSIX6APb8mKoifkro9MENlf2bi5-4b4",

  authDomain: "dedichat-18d18.firebaseapp.com",

  projectId: "dedichat-18d18",

  storageBucket: "dedichat-18d18.appspot.com",

  messagingSenderId: "6620205503",

  appId: "1:6620205503:web:f0c254ea814611c52b910a",

  measurementId: "G-650HSBBZ13"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const { user } = await signInWithPopup(auth, provider);
        return { uid: user.uid, displayname: user.displayName };
    }
    catch (error){
        if(error.code != 'auth/cancelled-popup-request'){
            console.error(error);
        }
        return null;
    }
}

export { loginWithGoogle };