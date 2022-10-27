var ceu = document.getElementById('ceu');
var montanhasTras = document.getElementById('montanhas-tras');
var montanhaFrente = document.getElementById('montanha-frente');
var nav = document.querySelector('nav');

window.addEventListener('scroll', function(){
    var value = window.scrollY;
    ceu.style.left = value * 0.3 + 'px';
    montanhasTras.style.top = value * 0.5 + 'px';
    montanhaFrente.style.top = value * 0 + 'px';
    nav.style.top = value * 0.5 + 'px';
})