
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/formulario');
    const data = await response.json();

    if (data.length === 0) {
      document.getElementById('content-list').innerHTML = '<p>Nenhum conteúdo encontrado.</p>';
    } else {
      const content = data[data.length - 1]
      if (content.title) {
        document.querySelector('.init-title').textContent = content.title;
      }

      if (content.description) {
        document.querySelector('.init-paragraf').textContent = content.description;
      }

      if (content.second_text) {
        document.querySelector('.about-paragraf').textContent = content.second_text;
      }

      if (content.image_path) {
        document.querySelector('.init-img').src = `http://localhost:3000/${content.image_path.replace(/\\/g, '/')}`;
      }

      if (content.logo_path) {
        document.querySelector('.logo-site').src = `http://localhost:3000/${content.logo_path.replace(/\\/g, '/')}`;
      }

      if (content.second_image_path) {
        document.querySelector('.about-img').src = `http://localhost:3000/${content.second_image_path.replace(/\\/g, '/')}`;
      }
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    document.getElementById('content-list').innerHTML = '<p>Erro ao carregar os dados.</p>';
  }
});

