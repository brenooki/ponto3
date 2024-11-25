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

// Função de filtro por status
document.getElementById('filterSelect').addEventListener('change', function() {
    const filter = this.value.toLowerCase(); // Obtém o valor do filtro e converte para minúsculas
    const rows = document.querySelectorAll('#excelTable tbody tr');

    rows.forEach(row => {
        const cell = row.getElementsByTagName('td')[2]; // Coluna "Status"
        if (cell) {
            const status = cell.textContent.toLowerCase(); // Converte o texto do status para minúsculas
            row.style.display = (!filter || status.includes(filter)) ? '' : 'none'; // Mostra ou oculta a linha
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


// Seleciona todos os botões de edição
const editButtons = document.querySelectorAll('.edit-btn');

// Função para preencher o formulário do modal com os dados do colaborador
function preencherFormulario(dados) {
    document.getElementById('nome').value = dados.nome || '';
    document.getElementById('nascimento').value = dados.nascimento || '';
    document.getElementById('naturalidade').value = dados.naturalidade || '';
    document.getElementById('estado_civil').value = dados.estadoCivil || '';
    document.getElementById('cpf').value = dados.cpf || '';
    document.getElementById('rg').value = dados.rg || '';
    document.getElementById('orgao-expedidor').value = dados.orgaoExpedidor || '';
    document.getElementById('email').value = dados.email || '';
    document.getElementById('celular').value = dados.celular || '';
    document.getElementById('cep').value = dados.cep || '';
    document.getElementById('pais').value = dados.pais || '';
    document.getElementById('estado').value = dados.estado || '';
    document.getElementById('municipio').value = dados.municipio || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('rua').value = dados.rua || '';
    document.getElementById('number').value = dados.numero || '';
    document.getElementById('complement').value = dados.complemento || '';
    document.getElementById('faixa').value = dados.faixa || '';
    document.getElementById('tipo-usuario').value = dados.tipoUsuario || 'Comum';
    document.getElementById('user').value = dados.usuario || '';
    document.getElementById('senha').value = dados.senha || '';
}

// Adiciona evento aos botões de edição
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const colaboradorId = button.getAttribute('data-id');

        // Simula uma chamada para obter dados do colaborador (substitua com seu backend)
        const dadosColaborador = buscarDadosColaborador(colaboradorId);

        // Preenche o formulário com os dados recebidos
        preencherFormulario(dadosColaborador);

        // Abre o modal
        modal.style.display = 'flex';
    });
});


// INTEGRA O MODAL COM O BACK END
function buscarDadosColaborador(id) {
    return fetch(`/api/colaborador/${id}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao buscar colaborador:', error);
            return {};
        });
}


// RESET DO FORMULARIO

function limparFormulario() {
    document.querySelectorAll('.caixa_form').forEach(input => {
        input.value = '';
    });
    document.getElementById('noNumber').checked = false;
}
