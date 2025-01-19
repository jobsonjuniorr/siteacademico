document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('updateForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

  
    const newTitle = document.getElementById('title').value;
    const newDescription = document.getElementById('description').value;
    const newSecondText = document.getElementById('secondText').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const logoFile = document.getElementById('imageLogo').files[0];
    const secondImageFile = document.getElementById('secondImage').files[0];    
  


  
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    formData.append('secondText', newSecondText);


    
    if (imageFile) formData.append('image', imageFile);
    if (logoFile) formData.append('logo', logoFile);
    if (secondImageFile) formData.append('secondImage', secondImageFile);
   
    fetch('http://localhost:3000/api/formulario', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao enviar o formulário.');
            }
            return response.json();
        })
        .then((data) => {
            alert('Formulário enviado com sucesso!');
            form.reset()
        })
        .catch((error) => {
            console.error('Erro:', error);
            form.reset()
        });
});
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

window.onload = function () {
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:3000/api/login/admin', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status === 401) {
                window.location.href = 'login.html';
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados do formulário recebidos:', data);
        })
        .catch(error => {
            console.error(error);
            window.location.href = 'login.html';
        });
};
