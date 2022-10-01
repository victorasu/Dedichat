import {
    initializeApp
} from "firebase/app";

import {
    getAnalytics
} from "firebase/analytics";

import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth
} from 'firebase/auth';

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getFirestore(app);

const analytics = getAnalytics(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const {
            user
        } = await signInWithPopup(auth, provider);
        return {
            uid: user.uid,
            displayName: user.displayName
        };
    } catch (error) {
        if (error.code != 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chatrooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

async function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chatrooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}

export {
    loginWithGoogle,
    sendMessage,
    getMessages
};