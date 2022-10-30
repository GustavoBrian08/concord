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

const botaoCadastro = function(){
    login_modal.style.display = 'none';
    cadastro_modal.style.display = 'flex';
}

const botaoLogin = function(){
    cadastro_modal.style.display = 'none';
    login_modal.style.display = 'flex';
}

change_theme_button.addEventListener('click', function(){
    conversation.classList.toggle('dark-conversation');
    conversation_nav.classList.toggle('dark-conversation-nav');
    chat.classList.toggle('dark-chat');
    messages.classList.toggle('dark-messages');
    user_container.classList.toggle('dark-user-container');
    if(icon_theme_button.classList.contains('fa-moon')){
        icon_theme_button.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon_theme_button.classList.replace('fa-sun', 'fa-moon');
    }
} )
