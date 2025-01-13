// Selecionar os elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Adicionar evento de clique ao botão de menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
