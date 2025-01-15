const baseValor = 40; // Valor base
const valorTotalElement = document.getElementById("valorTotal");
const tipoEventoSelect = document.getElementById("tipoEvento");
const eventoSelect = document.getElementById("evento");
const eventosSelecionadosUl = document.getElementById("eventosSelecionados");
const adicionarEventoBtn = document.getElementById("adicionarEvento");

const eventosDisponiveis = [
    { id: 1, tipo: "minicurso", nome: "Introdução ao JavaScript", valor: 30 },
    { id: 2, tipo: "minicurso", nome: "Desenvolvimento Web Avançado", valor: 30 },
    { id: 3, tipo: "palestra", nome: "Tendências em Tecnologia", valor: 10 },
    { id: 4, tipo: "palestra", nome: "O Futuro da Inteligência Artificial", valor: 10 },
    { id: 5, tipo: "minicurso", nome: "Banco de Dados para Iniciantes", valor: 30 },
    { id: 6, tipo: "palestra", nome: "Metodologias Ágeis na Prática", valor: 10 }
];


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


function showAlert(message, type = "success") {
        const alertBox = document.getElementById("alert-box");
        
     
        alertBox.textContent = message;
        alertBox.className = `alert-box ${type === "error" ? "alert-error" : type === "info" ? "alert-info" : ""}`;
        
 
        alertBox.classList.remove("hidden");
        
    
        setTimeout(() => {
            alertBox.classList.add("hidden");
        }, 3000);
}

let eventosSelecionados = [];


function preencherOpcoesEventos(tipo) {
    eventoSelect.innerHTML = ""; 

    const eventosFiltrados = eventosDisponiveis.filter(evento => evento.tipo === tipo);
    eventosFiltrados.forEach(evento => {
        const option = document.createElement("option");
        option.value = evento.id;
        option.textContent = `${evento.nome} (${evento.valor},00R$)`;
        eventoSelect.appendChild(option);
    });
}


function adicionarEvento() {
    const eventoId = parseInt(eventoSelect.value);
    const evento = eventosDisponiveis.find(e => e.id === eventoId);

    if (eventosSelecionados.some(e => e.id === eventoId)) {
        showAlert("Este evento já foi selecionado!", "error");
        return;
    }

    eventosSelecionados.push(evento);

    const li = document.createElement("li");
    li.textContent = `${evento.nome} (${evento.valor},00R$)`;
    li.dataset.id = evento.id;

 
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => removerEvento(evento.id, li));

   
    li.appendChild(removeButton);
    eventosSelecionadosUl.appendChild(li);

    atualizarValorTotal();
}

function removerEvento(eventoId, liElement) {
   
    eventosSelecionados = eventosSelecionados.filter(e => e.id !== eventoId);

  
    liElement.remove();

  
    atualizarValorTotal();
}


function atualizarValorTotal() {
    let total = baseValor;

    eventosSelecionados.forEach(evento => {
        total += evento.valor;
    });

    valorTotalElement.textContent = `${total.toFixed(2)}R$`;
}


preencherOpcoesEventos(tipoEventoSelect.value);


tipoEventoSelect.addEventListener("change", () => {
    preencherOpcoesEventos(tipoEventoSelect.value);
});

adicionarEventoBtn.addEventListener("click", adicionarEvento);

const form = document.getElementById("cadastroForm");
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
        nome: form.nome.value,
        cpf: form.cpf.value,
        email: form.email.value,
        celular: form.celular.value,
        categoria: form.categoria.value,
        eventos: eventosSelecionados,
        valorTotal: valorTotalElement.textContent
    };

    try {
        const response = await fetch('http://localhost:3000/api/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const result = await response.json();
        console.log("Resposta do backend:", result);

        if (response.ok) {
            showAlert(result.message, "success");
            setTimeout(()=>{
                window.location.href = "/index.html"
            },3000) 
        } else {
            showAlert("Erro ao cadastrar!", "error");
        }

      
        form.reset(); 
        eventosSelecionados = []; 
        eventosSelecionadosUl.innerHTML = ""; 
        valorTotalElement.textContent = `${baseValor.toFixed(2)}R$`; 

    } catch (error) {
        console.error("Erro:", error);
        showAlert("Erro ao conectar ao servidor!", "error");
    }
});



