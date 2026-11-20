import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA85sfGPYmu_28G8ZfQhVy7y7R0kAEFE7Y",
    authDomain: "oppgave2-be269.firebaseapp.com",
    projectId: "oppgave2-be269",
    storageBucket: "oppgave2-be269.firebasestorage.app",
    messagingSenderId: "130710374615",
    appId: "1:130710374615:web:7e991c4db3d4678bb28892"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
