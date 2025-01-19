function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alert-box");
    
 
    alertBox.textContent = message;
    alertBox.className = `alert-box ${type === "error" ? "alert-error" : type === "info" ? "alert-info" : ""}`;
    

    alertBox.classList.remove("hidden");
    

    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const noticiaImageFile = document.getElementById('imageNoiticia').files[0]
        const newtitleNoticia = document.getElementById('titleNoticia').value
        const newdescriptionNoticia = document.getElementById('descriptionNoticia').value

        if(!noticiaImageFile || !newtitleNoticia || !newdescriptionNoticia){
            showAlert("Preencha todos os campos","error")
            return
        }
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
                showAlert('Formulário enviado com sucesso!', 'success');
                form.reset()
            })
            .catch((error) => {
                showAlert('Erro no envio do formulario!','error')
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
