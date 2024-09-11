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


// Abrir o modal
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Fechar o modal ao clicar no 'X'
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
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
    }
  }
  
  // Fechar o modal se clicar fora do conteúdo
  window.onclick = function(event) {
    var mainModal = document.getElementById("mainModal");
    var secondModal = document.getElementById("secondModal");
    
    if (event.target == mainModal) {
      mainModal.style.display = "none";
    }
    
    if (event.target == secondModal) {
      secondModal.style.display = "none";
    }
  }
  