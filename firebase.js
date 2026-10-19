
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDB5oJiJJDNZzVYwjwNkiH2ZjjIrgT0InI",
    authDomain: "teacher-site-d5fc5.firebaseapp.com",
    projectId: "teacher-site-d5fc5",
    storageBucket: "teacher-site-d5fc5.firebasestorage.app",
    messagingSenderId: "1092568240239",
    appId: "1:1092568240239:web:af5625ff317d1586d43d9a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
};
