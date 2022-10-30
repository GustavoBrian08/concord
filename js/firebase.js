// IMPORTAÇÕES DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
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
const span_channel_user = document.getElementsByClassName('span-channel-user');
const username_field = document.getElementById('username-field');
const username_direct_message = document.getElementsByClassName('username-direct-message');
const direct_messages = document.getElementById('direct-messages');

if(cadastrarInput) cadastrarInput.onclick = cadastrarUsuario;
if(loginInput) loginInput.onclick = fazerLogin;

onAuthStateChanged(auth,async (user) => {
  if (user) {

    const outro_usuarios = query(collection(db, "Usuarios"), where("email", "!=", user.email));
    const dados_outros_usuarios = await getDocs(outro_usuarios);
    dados_outros_usuarios.forEach((doc) => {
      var usuario = doc.data().username;
      carregarUsuarios(usuario);
    });

    const usuarios = query(collection(db, "Usuarios"), where("email", "==", user.email));
    const dados_usuarios = await getDocs(usuarios);
    
    dados_usuarios.forEach(async (usuario) => {
      const username = usuario.data().username;
      console.log(username);

      username_field.innerHTML = username;
      
      const conversas = query(collection(db, "Conversas"), where("usuarios", "array-contains", username));
      
      const dados_conversas = onSnapshot(conversas, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const lista_conversa_usuarios = change.doc.data().usuarios;
            const conversa_id = change.doc.id;
            lista_conversa_usuarios.forEach(async function(usuario_conversa){

              text_field.addEventListener("submit", function(e){
                e.preventDefault();
                if(input_text.value.length != 0 && input_text.value != ' ') {
                  enviarMensagem(input_text.value, conversa_id, username);
                }
              })
            
              const mensagens = query(collection(db, "Mensagens"), orderBy('criadoEm'));

              const dados_mensagens = onSnapshot(mensagens, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                  if (change.type === "added") {
                    const mensagem = change.doc.data().texto;
                    const mensagem_conversa = change.doc.data().conversa;
                    const autor_mensagem = change.doc.data().usuario;
                              
                    if (usuario_conversa != username){
                      var outro_usuario = usuario_conversa;
                      
                      
                      for(var i = 0; i < username_direct_message.length; i++){
                        username_direct_message[i].innerHTML = outro_usuario;
                      }
                      
                      if(conversa_id == mensagem_conversa){

                        if(autor_mensagem == outro_usuario){
                          //console.log(`outro usuario: ${conversa_id}`)
                          //console.log(`outro usuario: ${mensagem_conversa}`)
                          carregarMensagemRecebida(outro_usuario, mensagem);
                          abrirConversa(mensagem, autor_mensagem, outro_usuario);
                          
                        } else if(autor_mensagem == username){  
                          //console.log(`este usuario: ${conversa_id}`)
                          //console.log(`este usuario: ${mensagem_conversa}`)
                          carregarMensagemEnviada(mensagem);
                          //console.log(mensagem)
                          abrirConversa(mensagem, autor_mensagem, outro_usuario);
                        }               
                      }
                    }
                  }
                });
              });
            })
          }
        });
      });
    });
  } else {
    // User is signed out
    console.log("Usuário deslogado!")
  }
});

async function cadastrarUsuario(){

  try {
    const docRef = await addDoc(collection(db, "Usuarios"), {
      username: username.value,
      email: email_cadastro.value,
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

function carregarMensagemRecebida(user, text){
  const novo_container_mensagem = document.createElement('div');
  const novo_span_mensagem = document.createElement('span');
  const novo_usuario_nome = document.createElement('h5');
  const nova_mensagem = document.createElement('p');
  
  novo_container_mensagem.classList.add('container-message-received');
  novo_span_mensagem.classList.add('message-span');
  nova_mensagem.classList.add('message-text');

  messages.appendChild(novo_container_mensagem);
  novo_container_mensagem.appendChild(novo_span_mensagem);
  novo_span_mensagem.appendChild(novo_usuario_nome);
  novo_span_mensagem.appendChild(nova_mensagem);

  novo_usuario_nome.innerHTML = user;
  nova_mensagem.innerHTML = text;
  messages.scroll(0,100);
  var audio = new Audio('./sound/mensagem_recebida.mp3');
  audio.addEventListener('canplaythrough', function() {
    audio.play();
  });
}

function carregarMensagemEnviada(text){
  const novo_container_mensagem = document.createElement('div');
  const novo_span_mensagem = document.createElement('span');
  const nova_mensagem = document.createElement('p');

  novo_container_mensagem.classList.add('container-message-sended');
  novo_span_mensagem.classList.add('message-span');
  nova_mensagem.classList.add('message-text');

  messages.appendChild(novo_container_mensagem);
  novo_container_mensagem.appendChild(novo_span_mensagem);
  novo_span_mensagem.appendChild(nova_mensagem);
  nova_mensagem.innerHTML = text;
  messages.scroll(0,100);
}

async function enviarMensagem(text, conversa_id, username){
  input_text.value = '';
  try {
    const docRef = await addDoc(collection(db, "Mensagens"), {
      conversa: conversa_id,
      texto: text,
      usuario: username,
      criadoEm: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function carregarUsuarios(username){
  const novo_container_usuario = document.createElement('span');
  const nova_imagem_usuario = document.createElement('img');
  const novo_nome_usuario = document.createElement('h3');
  
  novo_container_usuario.classList.add('span-channel-user');

  direct_messages.appendChild(novo_container_usuario);
  novo_container_usuario.appendChild(nova_imagem_usuario);
  novo_container_usuario.appendChild(novo_nome_usuario);

  nova_imagem_usuario.src = 'img/favicon.png';
  nova_imagem_usuario.alt = username;
  novo_nome_usuario.innerHTML = username;
}

function abrirConversa(text, autor, other_user){
  for(var i = 0; i < span_channel_user.length; i++){
    span_channel_user[i].addEventListener('click', function(){
      messages.innerHTML = ''
      if(autor == other_user){
        setTimeout(() => carregarMensagemRecebida(other_user, text), 100);
      } else {
        setTimeout(() => carregarMensagemEnviada(text), 100);
      }
    })
  }
}
