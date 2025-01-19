function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alert-box");
    
 
    alertBox.textContent = message;
    alertBox.className = `alert-box ${type === "error" ? "alert-error" : type === "info" ? "alert-info" : ""}`;
    

    alertBox.classList.remove("hidden");
    

    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 3000);
}


document.getElementById('articleForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const formData = new FormData();
    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const summary = document.getElementById('summary').value;
    const pdfFile = document.getElementById('pdfFile').files[0];

    if(!title || !authors ||  !summary || !pdfFile){
        showAlert('Preencha todos os campos','error')
        return
    }

    formData.append('title', title);
    formData.append('authors', authors);
    formData.append('summary', summary);
    formData.append('pdfFile', pdfFile);

    try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:3000/api/artigos', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showAlert('Artigo enviado com sucesso!','success');
            document.getElementById('articleForm').reset();

        } else {
          showAlert('Erro ao enviar artigo', 'error');
            document.getElementById('articleForm').reset();

        }
    } catch (error) {
        alert('Erro ao enviar artigo: ' + error.message);
        console.error(error);
    }
});


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
