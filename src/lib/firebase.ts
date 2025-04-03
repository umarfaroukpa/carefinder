import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBZ-WdpAMb_ReAg816WC1rEfS4LFU0JGHI",
    authDomain: "carefinder-817a8.firebaseapp.com",
    projectId: "carefinder-817a8",
    storageBucket: "carefinder-817a8.firebasestorage.app",
    messagingSenderId: "994012601987",
    appId: "1:994012601987:web:1f5b1ea2fe8454b25b85b6",
    measurementId: "G-N9LKPMVV3V"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage, firebaseConfig }; 