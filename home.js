import {
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const logout = document.getElementById("logout");
const username = document.getElementById("username");
const addPostBtn = document.getElementById("add-post");
const postText = document.getElementById("post");
const postsContainer = document.getElementById("posts");
const message = document.getElementById("message");

onAuthStateChanged(auth, async (currentuser) => {
    if (!currentuser) {
        window.location.replace("index.html");
        return;
    }

    try {
        const userRef = doc(db, "users", currentuser.uid);
        const user = await getDoc(userRef);

        if (user.exists()) {
            username.innerText = "Hello, " + user.data().username;
        } else {
            username.innerText = "Hello!";
        }

        await fetchAllPosts();
    } catch (error) {
        console.log(error);
        message.innerText = error.message;
    }
});

addPostBtn.addEventListener("click", async () => {
    const text = postText.value.trim();

    if (!text) {
        message.innerText = "Write something before adding a post.";
        return;
    }

    try {
        await addDoc(collection(db, "posts"), {
            text: text,
            created_at: serverTimestamp(),
        });

        postText.value = "";
        message.innerText = "Post added!";
        await fetchAllPosts();
    } catch (error) {
        console.log(error);
        message.innerText = error.message;
    }
});

logout.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.replace("index.html");
    } catch (error) {
        console.log(error);
        message.innerText = error.message;
    }
});

async function fetchAllPosts() {
    try {
        const allPosts = await getDocs(collection(db, "posts"));
        postsContainer.innerHTML = "";

        allPosts.forEach((postDoc) => {
            const postElement = document.createElement("p");
            postElement.textContent = postDoc.data().text;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.log(error);
        message.innerText = error.message;
    }
}
