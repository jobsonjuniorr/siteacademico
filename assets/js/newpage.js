document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateForm');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Capturar os novos valores do formulário
      const newTitle = document.getElementById('title').value;
      const newDescription = document.getElementById('description').value;
      const imageFile = document.getElementById('imageFile').files[0];
  
      const updatedData = {
        title: newTitle,
        description: newDescription,
        image: null, // Inicialmente, imagem é nula
      };
  
      if (imageFile) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          updatedData.image = e.target.result; // Salva a imagem como Base64
          localStorage.setItem('updatedContent', JSON.stringify(updatedData));
          alert('Informações atualizadas com sucesso!');
  
          // Limpar o formulário
          form.reset();
        };
  
        reader.readAsDataURL(imageFile); // Lê o arquivo como URL Base64
      } else {
        localStorage.setItem('updatedContent', JSON.stringify(updatedData));
        alert('Informações atualizadas sem imagem!');
        form.reset();
      }
    });
  });
  