
async function loadArtigos() {
    const token = localStorage.getItem('authToken'); 

    try {
        const response = await fetch('http://localhost:3000/api/artigos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });

        if (response.ok) {
            const artigos = await response.json();
         
            const artigosList = document.getElementById('artigos-list');
            artigosList.innerHTML = '';  

            if (artigos.length > 0) {
                artigos.forEach(artigo => {
                    const artigoElement = document.createElement('div');
                    artigoElement.classList.add('artigo-item');
                    artigoElement.innerHTML = `
                        <h3><strong>Título:</strong> ${artigo.titulo}</h3>
                        <h4><strong>Autores:</strong> ${artigo.autores}</h4>
                        <p><strong>Resumo:</strong> ${artigo.resumo}</p>
                        <a href="http://localhost:3000/api/artigos/${artigo.id}/pdf" target="_blank">Visualizar PDF</a>
                    `;
                    artigosList.appendChild(artigoElement);
                });
            } else {
                artigosList.innerHTML = '<p>Nenhum artigo encontrado.</p>';
            }
        } else {
            console.error('Erro ao recuperar os artigos');
            alert('Erro ao recuperar os artigos.');
        }
    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        alert('Erro ao buscar artigos.');
    }
}


window.onload = function() {
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
        console.log('Dados recebidos:', data);  
    })
    .catch(error => {
        console.error(error);
        window.location.href = 'login.html';  
    });

    loadArtigos();
};


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


