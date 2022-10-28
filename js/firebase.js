import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
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
      username: username.value,
      conversas: {},

    });
    console.log("Document written with ID: ", docRef.id);
    setTimeout(function(){
      window.location.href = "chat.html"
    }, 2000);
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

if(cadastrarInput){
  cadastrarInput.onclick = cadastrarUsuario;
}
  
function fazerLogin(){
  signInWithEmailAndPassword(auth, email_login.value, password_login.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Usuario logado com sucesso!")
      setTimeout(function(){
        window.location.href = "chat.html"
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

if(loginInput){
  loginInput.onclick = fazerLogin;
}

const messages = document.getElementById('messages');
const text_field = document.getElementById('text-field');
const input_text = document.getElementById('input-text');
const username_field = document.getElementById('username-field');
//const container_message_sended = document.getElementsByClassName('container-message-sended');
//const message_span = document.getElementsByClassName('message-span');

function enviarMensagem(){
  const novo_container_mensagem = document.createElement('div');
  const novo_span_mensagem = document.createElement('span');
  const nova_mensagem = document.createElement('p');

  novo_container_mensagem.classList.add('container-message-sended');
  novo_span_mensagem.classList.add('message-span');
  nova_mensagem.classList.add('message-text');

  messages.appendChild(novo_container_mensagem);
  novo_container_mensagem.appendChild(novo_span_mensagem);
  novo_span_mensagem.appendChild(nova_mensagem);
  nova_mensagem.innerHTML = input_text.value;
  input_text.value = '';
}

if(text_field){
  text_field.addEventListener("submit", function(e){
    e.preventDefault();
    enviarMensagem();
  })
}

const q = query(collection(db, "Conversas"), where("usuarios", "array-contains", username_field ? username_field.innerHTML : ''));
const resultado = await getDocs(q);
                
resultado.forEach((doc) => {
    const data = doc.data();  
    console.log(data)
});