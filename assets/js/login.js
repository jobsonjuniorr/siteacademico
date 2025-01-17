document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    if (!email.value.trim() || !senha.value.trim()) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value.trim(), senha: senha.value.trim() })
    })
    .then(response => {
        if (!response.ok) {
          
            if (response.status === 401) {
                throw new Error('E-mail ou senha incorretos.');
            }
            if (response.status === 400) {
                throw new Error('Por favor, preencha todos os campos.');
            }
            throw new Error('Erro no servidor. Tente novamente mais tarde.');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Login realizado com sucesso.') {
            window.location.href = 'index.html';
        } else {
            alert(data.message);
            email.value = '';
            senha.value = '';
        }
    })
    .catch(error => {
        // Trate o erro sem exibi-lo no console
        alert(error.message);
        email.value = '';
        senha.value = '';
    });
});
