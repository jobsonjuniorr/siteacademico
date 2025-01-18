async function loadArtigos() {
    try {

        const response = await fetch('http://localhost:3000/api/artigos');
        
        if (response.ok) {
            const artigos = await response.json();
            
       
            const artigosList = document.getElementById('artigos-list');
            
      
            artigosList.innerHTML = '';
         
            if (artigos.length > 0) {
            
                artigos.forEach(artigo => {
                    const artigoElement = document.createElement('div');
                    artigoElement.classList.add('artigo-item');
                    artigoElement.innerHTML = `
                        <h3>${artigo.titulo}</h3>
                        <p><strong>Autores:</strong> ${artigo.autores}</p>
                        <p><strong>Resumo:</strong> ${artigo.resumo}</p>
                        <!-- Link para visualizar o PDF -->
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


window.onload = loadArtigos;