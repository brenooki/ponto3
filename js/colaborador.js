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

// Função para verificar se algum campo está preenchido
function isFormularioPreenchido() {
    const form = document.querySelector('form');
    return Array.from(form.elements).some(input => input.value !== "");
}

// Abrir o modal
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Fechar o modal ao clicar no 'X', perguntando se deseja sair caso algum campo esteja preenchido
closeModal.addEventListener('click', () => {
    if (isFormularioPreenchido()) {
        const confirmExit = confirm('DESEJA REALMENTE SAIR? SE CONFIRMAR, TODOS OS DADOS SERÃO APAGADOS!');
        if (confirmExit) {
            limparFormulario(); // Limpa o formulário ao fechar o modal
        }
    } else {
        modal.style.display = 'none';
    }
});

// Fechar modais ao clicar no X com a confirmação
var closes = document.getElementsByClassName("close");
for (var i = 0; i < closes.length; i++) {
    closes[i].onclick = function() {
        if (isFormularioPreenchido()) {
            const confirmExit = confirm('DESEJA REALMENTE SAIR? SE CONFIRMAR, TODOS OS DADOS SERÃO APAGADOS!');
            if (confirmExit) {
                this.parentElement.parentElement.style.display = "none";
                limparFormulario(); // Limpa o formulário ao fechar o modal
            }
        } else {
            this.parentElement.parentElement.style.display = "none";
        }
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

// Função para desabilitar/habilitar o campo 'Número' baseado no checkbox
document.getElementById("noNumber").addEventListener("change", function() {
    const numberInput = document.getElementById("number");

    if (this.checked) {
        numberInput.setAttribute('disabled', 'disabled');  // Desabilita o campo
        numberInput.removeAttribute('required');           // Remove a obrigatoriedade
        numberInput.value = '';                            // Limpa o valor existente
        numberInput.style.backgroundColor = "#e0e0e0";     // Define a cor cinza no campo desabilitado
    } else {
        numberInput.removeAttribute('disabled');           // Habilita o campo
        numberInput.setAttribute('required', 'required');  // Torna obrigatório novamente
        numberInput.style.backgroundColor = "";            // Remove o fundo cinza
    }
});
