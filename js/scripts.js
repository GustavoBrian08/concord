const botao = document.querySelector('#cadastro-button');
const login_modal = document.querySelector('#login-modal');
const cadastro_modal = document.getElementById('cadastro-modal');
const change_theme_button = document.getElementById('change-theme-button');

const botaoCadastro = function(){
    login_modal.style.display = 'none';
    cadastro_modal.style.display = 'flex';
}

const botaoLogin = function(){
    cadastro_modal.style.display = 'none';
    login_modal.style.display = 'flex';
}

change_theme_button.addEventListener('click', function(){
    document.body.classList.toggle('dark-theme');
} )