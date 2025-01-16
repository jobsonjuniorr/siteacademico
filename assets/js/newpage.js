document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('updateForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Capturar os novos valores do formulário
    const newTitle = document.getElementById('title').value;
    const newDescription = document.getElementById('description').value;
    const newSecondText = document.getElementById('secondText').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const logoFile = document.getElementById('imageLogo').files[0];
    const secondImageFile = document.getElementById('secondImage').files[0];

    const updatedData = {
      title: newTitle,
      description: newDescription,
      secondText: newSecondText,
      image: null, 
      logo: null, 
      secondImage: null,
    };

    // Função para processar imagens
    const processImage = (file, callback) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          callback(e.target.result);
        };
        reader.readAsDataURL(file); 
      } else {
        callback(null);
      }
    };

    
    processImage(imageFile, (imageData) => {
      updatedData.image = imageData;
      processImage(logoFile, (logoData) => {
        updatedData.logo = logoData;
        processImage(secondImageFile, (secondImageData) => {
          updatedData.secondImage = secondImageData; 
          localStorage.setItem('updatedContent', JSON.stringify(updatedData));
          alert('Informações atualizadas com sucesso!');
          form.reset();
        });
      });
    });
  });
});
