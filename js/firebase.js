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

// PEGANDO VAŔIOS ELEMENTOS DO INDEX E DO CHAT
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
const username_field = document.getElementById('username-field');
const direct_messages = document.getElementById('direct-messages');

// EXECUTANDO AS FUNÇÕES DE LOGIN E CADASTRO
if (cadastrarInput) cadastrarInput.onclick = cadastrarUsuario;
if (loginInput) loginInput.onclick = fazerLogin;

// VERIFICANDO SE O USUÁRIO CONTINUA CONECTADO E ASSIM, PEGANDO DADOS DO MESMO
onAuthStateChanged(auth, async (user) => {
  if (user) {

    // FAZENDO UMA REQUISIÇÃO DA COLEÇÃO USUARIOS, PARA CARREGAR TODOS OS OUTROS USUÁRIOS
    const outro_usuarios = query(collection(db, "Usuarios"), where("email", "!=", user.email));
    const dados_outros_usuarios = await getDocs(outro_usuarios);
    dados_outros_usuarios.forEach((doc) => {
      var usuario = doc.data().username;
      carregarUsuarios(usuario);
    });

    // FAZENDO OUTRA REQUISIÇÃO PARA PEGAR O NOME DE USUÁRIO
    const usuarios = query(collection(db, "Usuarios"), where("email", "==", user.email));
    const dados_usuarios = await getDocs(usuarios);
    dados_usuarios.forEach(async (usuario) => {
      const username = usuario.data().username;
      username_field.innerHTML = username; // Atribuindo o nome de usuário no campo do usuário logado
      console.log(`${username} está logado!`);

      // QUANDO TIVER UM SUBMIT, ENVIAR A MENSAGEM
      text_field.addEventListener("submit", function (e) {
        e.preventDefault(); // Impedindo que a página atualize
        if (input_text.value.length != 0 && input_text.value != ' ') {
          enviarMensagem(input_text.value, username);
        }
      })

      // PEGANDO TODAS AS MENSAGENS EM TEMPO REAL
      const mensagens = query(collection(db, "Mensagens"), orderBy('criadoEm'));
      onSnapshot(mensagens, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const mensagem = change.doc.data().texto;
            const autor_mensagem = change.doc.data().usuario;

            if (autor_mensagem != username) {
              carregarMensagemRecebida(autor_mensagem, mensagem);
            } else {
              carregarMensagemEnviada(mensagem);
            }
          }
        });
      });
    });
  } else {
    console.log("Usuário deslogado!");
  }
});

async function cadastrarUsuario() {

  try {
    const docRef = await addDoc(collection(db, "Usuarios"), {
      username: username.value,
      email: email_cadastro.value,
    });
    console.log("Document written with ID: ", docRef.id);
    setTimeout(function () {
      signInWithEmailAndPassword(auth, email_cadastro.value, password_cadastro.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario logado com sucesso!")
          setTimeout(function () {
            window.location.href = "chat.html"
          }, 100);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }, 500);
  } catch (e) {
    console.error("Erro! Dados do usuário não cadastrados: ", e);
  }

  try {
    const docRef = await addDoc(collection(db, "Mensagens"), {
      texto: `${username.value} entrou no grupo.`,
      usuario: username.value,
      criadoEm: serverTimestamp()
    });
  } catch (e) {
    console.error("Erro! Mensagem vazia não criada: ", e);
  }

  createUserWithEmailAndPassword(auth, email_cadastro.value, password_cadastro.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario cadastrado com sucesso!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Falha ao cadastrar usuário: ${errorMessage}`);
      console.log(errorCode);
    });
}

function fazerLogin() {
  signInWithEmailAndPassword(auth, email_login.value, password_login.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario logado com sucesso!")
      setTimeout(function () {
        window.location.href = "chat.html"
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Falha ao fazer login: ${errorMessage}`);
      console.log(errorCode);
    });
}

function carregarMensagemRecebida(user, text) {
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
  messages.scroll(0, 100); // Atualizando o scroll da página

  // CARREGANDO E REPRODUZINDO O ÁUDIO DE MENSAGEM RECEBIDA
  var audio = new Audio('./sound/mensagem_recebida.mp3');
  audio.addEventListener('canplaythrough', function () {
    audio.play();
  });
}

function carregarMensagemEnviada(text) {
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
  messages.scroll(0, 100);
}

async function enviarMensagem(text, username) {
  input_text.value = '';
  try {
    const docRef = await addDoc(collection(db, "Mensagens"), {
      texto: text,
      usuario: username,
      criadoEm: serverTimestamp()
    });
  } catch (e) {
    console.error("Erro! Mensagem não enviada: ", e);
  }
}

function carregarUsuarios(username) {
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
