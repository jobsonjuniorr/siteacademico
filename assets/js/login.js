document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Login realizado com sucesso.') {
            window.location.href = 'index.html'
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao realizar o login.');
    });
    
});
