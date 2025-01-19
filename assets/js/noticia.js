document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const noticiaImageFile = document.getElementById('imageNoiticia').files[0]
        const newtitleNoticia = document.getElementById('titleNoticia').value
        const newdescriptionNoticia = document.getElementById('descriptionNoticia').value


        const formData = new FormData();

        formData.append('tilleNoticia', newtitleNoticia)
        formData.append('descriptionNoticia', newdescriptionNoticia)

        if (noticiaImageFile) formData.append('noticiaImage', noticiaImageFile)

        fetch('http://localhost:3000/api/noticias', {
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
