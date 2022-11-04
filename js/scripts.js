const botao = document.querySelector('#cadastro-button');
const login_modal = document.querySelector('#login-modal');
const cadastro_modal = document.getElementById('cadastro-modal');
const conversation = document.getElementById('conversation');
const conversation_nav = document.getElementById('conversation-nav');
const title_container = document.querySelectorAll('.title-container');
const user_container = document.getElementById('user-container');
const change_theme_button = document.getElementById('change-theme-button');
const icon_theme_button = document.getElementById('icon-theme-button');
const chat = document.getElementById('chat');
const messages = document.getElementById('messages');
const header_index = document.getElementById('header-index');
const body_index = document.getElementById('body-index');
const background_modal = document.getElementById('background-modal');

// FUNÇÃO PARA IR PARA CADASTRO
const botaoCadastro = function(){
    login_modal.style.display = 'none';
    cadastro_modal.style.display = 'flex';
}

// FUNÇÃO PARA IR PARA LOGIN
const botaoLogin = function(){
    cadastro_modal.style.display = 'none';
    login_modal.style.display = 'flex';
}

const mudarTemaIndex = function(){
    if(icon_theme_button.classList.contains('fa-moon')){
        icon_theme_button.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon_theme_button.classList.replace('fa-sun', 'fa-moon');
    }
    header_index.classList.toggle('dark-header-index');
    body_index.classList.toggle('dark-body-index');
    background_modal.classList.toggle('dark-background-modal');
}

const mudarTemaChat = function(){
    if(icon_theme_button.classList.contains('fa-moon')){
        icon_theme_button.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon_theme_button.classList.replace('fa-sun', 'fa-moon');
    }
    conversation.classList.toggle('dark-conversation');
    conversation_nav.classList.toggle('dark-conversation-nav');
    chat.classList.toggle('dark-chat');
    messages.classList.toggle('dark-messages');
    user_container.classList.toggle('dark-user-container');
}

const fecharAviso = function(){
    background_modal.style.display = 'none';
}