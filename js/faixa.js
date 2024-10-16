// Abrir e fechar modal
const modal = document.getElementById("jornadaModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
  modal.style.display = "block";
  modal.classList.add("open");
}

closeModalBtn.onclick = function() {
  modal.classList.remove("open");
  setTimeout(() => {
    modal.style.display = "none";
    limparCampos(); // Limpar campos ao fechar modal
  }, 300); // Transição suave de 300ms
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.classList.remove("open");
    setTimeout(() => {
      modal.style.display = "none";
      limparCampos(); // Limpar campos ao clicar fora do modal
    }, 300);
  }
}

// Função para limpar todos os dados do modal
function limparCampos() {
  const nomeJornada = document.getElementById("nomeJornada");
  nomeJornada.value = "";
  jornadaForm.innerHTML = "";
  document.querySelectorAll('.tipo-btn').forEach(btn => btn.classList.remove('selected'));
  document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('selected'));
}

// Função para trocar o conteúdo do modal de acordo com o tipo de jornada
const tipoBtns = document.querySelectorAll('.tipo-btn');
const jornadaForm = document.getElementById('jornadaForm');

tipoBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    tipoBtns.forEach(b => b.classList.remove('selected')); // Remove classe de todos os botões
    btn.classList.add('selected'); // Adiciona classe ao botão selecionado

    const tipo = btn.getAttribute('data-type');
    
    if (tipo === 'fixa') {
      jornadaForm.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Entrada</th>
              <th>Intervalo (Saída)</th>
              <th>Intervalo (Entrada)</th>
              <th>Saída</th>
              <th>Total de Horas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seg-Sex</td>
              <td><input type="time"></td>
              <td><input type="time"></td>
              <td><input type="time"></td>
              <td><input type="time"></td>
              <td><input type="number"></td>
            </tr>
            <tr>
              <td>Sábado</td>
              <td><input type="time"></td>
              <td><input type="time" placeholder="Opcional"></td>
              <td><input type="time" placeholder="Opcional"></td>
              <td><input type="time"></td>
              <td><input type="number"></td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td><input type="time"></td>
              <td><input type="time" placeholder="Opcional"></td>
              <td><input type="time" placeholder="Opcional"></td>
              <td><input type="time"></td>
              <td><input type="number"></td>
            </tr>
          </tbody>
        </table>`;
    } else if (tipo === 'intervalo-flexivel') {
      jornadaForm.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Entrada</th>
              <th>Horas de Intervalo</th>
              <th>Saída</th>
              <th>Total de Horas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seg-Sex</td>
              <td><input type="time"></td>
              <td><input type="number"></td>
              <td><input type="time"></td>
              <td><input type="number"></td>
            </tr>
            <tr>
              <td>Sábado</td>
              <td><input type="time"></td>
              <td><input type="number" placeholder="Opcional"></td>
              <td><input type="time"></td>
              <td><input type="number"></td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td><input type="time"></td>
              <td><input type="number" placeholder="Opcional"></td>
              <td><input type="time"></td>
              <td><input type="number"></td>
            </tr>
          </tbody>
        </table>`;
    } else if (tipo === 'flexivel') {
      jornadaForm.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Total de Horas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seg-Sex</td>
              <td><input type="number"></td>
            </tr>
            <tr>
              <td>Sábado</td>
              <td><input type="number" placeholder="Opcional"></td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td><input type="number" placeholder="Opcional"></td>
            </tr>
          </tbody>
        </table>`;
    }
  });
});

// =====================
// Melhorias Adicionadas
// =====================

// Seleção de periodicidade e tipos de jornada com funcionalidade de exibição dinâmica
const periodBtns = document.querySelectorAll('.period-btn');

// Alternar tipo de jornada com base na periodicidade selecionada
periodBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    periodBtns.forEach(b => b.classList.remove('selected')); // Remove seleção anterior
    btn.classList.add('selected'); // Adiciona seleção ao botão clicado
    
    const periodType = btn.getAttribute('data-type');
    
    // Mostrar jornadas correspondentes à periodicidade
    if (periodType === 'seg-dom') {
      document.querySelectorAll('.tipo-btn').forEach(b => b.style.display = 'inline-block');
    } else if (periodType === '12-36') {
      document.querySelectorAll('.tipo-btn').forEach(b => {
        if (b.getAttribute('data-type') === 'flexivel') {
          b.style.display = 'none'; // Oculta jornada flexível
        } else {
          b.style.display = 'inline-block'; // Mostra os outros tipos
        }
      });
    } else if (periodType === 'mensal') {
      document.querySelectorAll('.tipo-btn').forEach(b => b.style.display = 'inline-block');
    } else if (periodType === 'irregular') {
      document.querySelectorAll('.tipo-btn').forEach(b => b.style.display = 'inline-block');
    }
  });
});
