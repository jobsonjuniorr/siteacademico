
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('updatedContent'));

  if (savedData) {
 
    if (savedData.title) {
      document.querySelector('.init-title').textContent = savedData.title;
    }

 
    if (savedData.description) {
      document.querySelector('.init-paragraf').textContent = savedData.description;
    }

 
    if (savedData.image) {
      document.querySelector('.init-img').src = savedData.image;
    }

  
    if (savedData.logo) {
      document.querySelector('.logo-site').src = savedData.logo;
    }

   
    if (savedData.secondImage) {
      document.querySelector('.about-img').src = savedData.secondImage;
    }


    if (savedData.secondText) {
      document.querySelector('.about-paragraf').textContent = savedData.secondText;
    }
  }
});
