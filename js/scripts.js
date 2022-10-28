const botao = document.querySelector('#cadastro-button');
const login_modal = document.querySelector('.login-modal');
const cadastro_modal = document.getElementById('cadastro-modal');

const botaoCadastro = function(){
    login_modal.style.display = 'none';
    cadastro_modal.style.display = 'flex';
}