// Função de pesquisa
document.getElementById('searchInput').addEventListener('keyup', function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#excelTable tbody tr');

    rows.forEach(row => {
        const cell = row.getElementsByTagName('td')[0];
        if (cell) {
            const textValue = cell.textContent || cell.innerText;
            row.style.display = textValue.toLowerCase().includes(filter) ? '' : 'none';
        }
    });
});

// Função de filtro por idade
document.getElementById('filterSelect').addEventListener('change', function() {
    const filter = this.value;
    const rows = document.querySelectorAll('#excelTable tbody tr');

    rows.forEach(row => {
        const cell = row.getElementsByTagName('td')[2];
        if (cell) {
            const age = parseInt(cell.textContent);
            const [min, max] = filter.split('-').map(Number);
            row.style.display = (!filter || (age >= min && age <= max)) ? '' : 'none';
        }
    });
});

// Função de download
document.getElementById('downloadBtn').addEventListener('click', function() {
    const table = document.getElementById('excelTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: "Planilha1" });
    XLSX.writeFile(wb, "planilha.xlsx");
});

// Função para limpar o formulário
function limparFormulario() {
    const form = document.querySelector('form');
    form.reset(); // Reseta todos os campos do formulário
}

// Abrir o modal
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Fechar o modal ao clicar no 'X' e limpar o formulário
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    limparFormulario(); // Limpa o formulário ao fechar o modal
});

// Fechar o modal ao clicar fora dele e limpar o formulário
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        limparFormulario(); // Limpa o formulário ao fechar o modal
    }
});

// Abrir modal secundário ao clicar no botão
document.getElementById("openSecondModal").onclick = function() {
    document.getElementById("secondModal").style.display = "flex";
};

// Fechar modais ao clicar no X
var closes = document.getElementsByClassName("close");
for (var i = 0; i < closes.length; i++) {
    closes[i].onclick = function() {
        this.parentElement.parentElement.style.display = "none";
        limparFormulario(); // Limpa o formulário ao fechar o modal
    }
}

// Fechar o modal se clicar fora do conteúdo
window.onclick = function(event) {
    var mainModal = document.getElementById("mainModal");
    var secondModal = document.getElementById("secondModal");

    if (event.target == mainModal) {
      mainModal.style.display = "none";
      limparFormulario(); // Limpa o formulário ao fechar o modal
    }

    if (event.target == secondModal) {
      secondModal.style.display = "none";
      limparFormulario(); // Limpa o formulário ao fechar o modal
    }
}

// AUTOMATIZAÇÃO DO NÚMERO DE TELEFONE
function formatarCelular(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length > 10) {
        // Formato com DDD e hífen
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 5) {
        // Formato sem hífen ainda
        valor = valor.replace(/^(\d{2})(\d{5})/, '($1) $2-');
    } else if (valor.length > 2) {
        // Formato somente com DDD
        valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else {
        // Formato apenas com os primeiros números
        valor = valor.replace(/^(\d*)/, '($1');
    }
    input.value = valor;
}

// Função de busca de CEP e preenchimento automático de endereço
function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido.');
        return;
    }

    // Chama a API ViaCEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            // Preenche os campos do formulário
            document.getElementById('pais').value = 'Brasil'; // ViaCEP só cobre o Brasil
            document.getElementById('estado').value = data.uf;
            document.getElementById('municipio').value = data.localidade;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('rua').value = data.logradouro;
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP!');
        });
}

document.getElementById('noNumber').addEventListener('change', function() {
    var numberField = document.getElementById('number');
  
    if (this.checked) {
      numberField.value = '';  // Limpa o campo
      numberField.classList.add('disabled');  // Aplica o estilo desativado
      numberField.setAttribute('disabled', 'disabled');  // Desabilita o input
      numberField.removeAttribute('required');  // Remove a obrigatoriedade
    } else {
      numberField.classList.remove('disabled');  // Remove o estilo desativado
      numberField.removeAttribute('disabled');  // Habilita o input
      numberField.setAttribute('required', 'required');  // Torna obrigatório
    }
  });