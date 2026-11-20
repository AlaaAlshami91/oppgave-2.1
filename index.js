import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

let isSigningIn = false;

const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

onAuthStateChanged(auth, (currentuser) => {
    if (currentuser && !isSigningIn) {
        window.location.replace("home.html");
    }
});

submitBtn.addEventListener("click", async () => {
    if (!email.value.trim() || !username.value.trim() || !password.value) {
        message.innerText = "Please fill in all fields.";
        return;
    }

    isSigningIn = true;
    submitBtn.disabled = true;
    message.innerText = "";

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        const userRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userRef, {
            email: email.value.trim(),
            username: username.value.trim(),
            created_at: serverTimestamp(),
        });

        window.location.replace("home.html");
    } catch (error) {
        console.log(error);
        message.innerText = error.message;
        isSigningIn = false;
        submitBtn.disabled = false;
    }
});
