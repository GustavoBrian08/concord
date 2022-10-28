// IMPORTAÇÕES DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

// CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCAZoxLc4Q-bOzuma-qiIxanO8haVznHCI",
  authDomain: "concord-v1.firebaseapp.com",
  projectId: "concord-v1",
  storageBucket: "concord-v1.appspot.com",
  messagingSenderId: "373783464860",
  appId: "1:373783464860:web:8dce1a8eb7fb8d66805659"
};

// CONSTANTES PADRÕES
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// PEGANDO VAŔIOS ELEMENTOS PARA LOGIN E CADASTRO
const email_cadastro = document.getElementById('email-cadastro');
const password_cadastro = document.getElementById('password-cadastro');
const email_login = document.getElementById('email-login');
const password_login = document.getElementById('password-login');
const username = document.getElementById('username');
const cadastrarInput = document.getElementById('cadastrar-input');
const loginInput = document.getElementById('login-input');

const messages = document.getElementById('messages');
const text_field = document.getElementById('text-field');
const input_text = document.getElementById('input-text');
const container_message_sended = document.getElementsByClassName('container-message-sended');
const message_span = document.getElementsByClassName('message-span');
const username_field = document.getElementById('username-field');


var nome_usuario;
var mensagem;
var user_email;


if(cadastrarInput) cadastrarInput.onclick = cadastrarUsuario;
if(loginInput) loginInput.onclick = fazerLogin;
if(text_field){
  text_field.addEventListener("submit", function(e){
    e.preventDefault();
    enviarMensagem();
  })
}

onAuthStateChanged(auth,async (user) => {
  if (user) {

    const usuarios = query(collection(db, "Usuarios"), where("email", "==", user.email));
    const dados_usuarios = await getDocs(usuarios);
    
    dados_usuarios.forEach(async (usuario) => {
      const username = usuario.data().username;
      console.log(username);
      
      const conversas = query(collection(db, "Conversas"), where("usuarios", "array-contains", username));
      const dados_conversas = await getDocs(conversas);
      
      dados_conversas.forEach((doc) => {
        const data = doc.data().usuarios;
        data.forEach(async function(usuario_conversa){

          const mensagens = query(collection(db, "Mensagens"), where("usuario", "==", username));
          const dados_mensagens = await getDocs(mensagens);

          if (usuario_conversa != username){
            var outro_usuario = usuario_conversa;
            console.log(outro_usuario);



          } else {

            dados_mensagens.forEach((doc) => {
              const mensagem = doc.data().texto;
              console.log(mensagem);

            });
          }

        })
      });
    
    });
  } else {
    // User is signed out
    // ...
  }
});

async function cadastrarUsuario(){

  try {
    const docRef = await addDoc(collection(db, "Usuarios"), {
      username: username.value,
      email: email_cadastro.value,
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

//function carregarMensagemRecebida(){}

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
