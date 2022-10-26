import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyCAZoxLc4Q-bOzuma-qiIxanO8haVznHCI",
    authDomain: "concord-v1.firebaseapp.com",
    projectId: "concord-v1",
    storageBucket: "concord-v1.appspot.com",
    messagingSenderId: "373783464860",
    appId: "1:373783464860:web:8dce1a8eb7fb8d66805659"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
