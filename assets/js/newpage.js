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
    const noticiaImageFile = document.getElementById('imageNoiticia').files[0]
    const newtitleNoticia  = document.getElementById('titleNoticia').value
    const newdescriptionNoticia = document.getElementById('descriptionNoticia').value


    console.log(noticiaImageFile)
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    formData.append('secondText', newSecondText);
    formData.append('tilleNoticia',newtitleNoticia)
    formData.append('descriptionNoticia', newdescriptionNoticia)
    
    if (imageFile) formData.append('image', imageFile);
    if (logoFile) formData.append('logo', logoFile);
    if (secondImageFile) formData.append('secondImage', secondImageFile);
    if (noticiaImageFile) formData.append('noticiaImage', noticiaImageFile)


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
