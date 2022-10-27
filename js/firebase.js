import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

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
const auth = getAuth(app);

const email_cadastro = document.getElementById('email-cadastro');
const password_cadastro = document.getElementById('password-cadastro');
const email_login = document.getElementById('email-login');
const password_login = document.getElementById('password-login');
const username = document.getElementById('username');
const cadastrarInput = document.getElementById('cadastrar-input');
const loginInput = document.getElementById('login-input');


async function cadastrarUsuario(){

  try {
    const docRef = await addDoc(collection(db, "Usuarios"), {
      Username: username.value,
    });
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "chat.html"
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
  createUserWithEmailAndPassword(auth, email_cadastro.value, password_cadastro.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Usuario cadastrado com sucesso!")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
      // ..
    });
  }

cadastrarInput.onclick = cadastrarUsuario;
  
function fazerLogin(){
  signInWithEmailAndPassword(auth, email_login.value, password_login.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Usuario logado com sucesso!")
      window.location.href = "chat.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  
loginInput.onclick = fazerLogin;