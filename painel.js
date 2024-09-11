// Alterna a visibilidade do menu lateral quando o botão de menu é clicado
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('sidebar-menu');
    menu.classList.toggle('visible'); // Alterna a classe 'visible' para exibir/esconder o menu
    if (menu.classList.contains('visible')) {
        menu.classList.remove('hidden'); // Remove a classe 'hidden' se o menu estiver visível
    } else {
        menu.classList.add('hidden'); // Adiciona a classe 'hidden' se o menu estiver oculto
    }
});

// Alterna entre modo claro e escuro quando o botão correspondente é clicado
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode'); // Alterna a classe 'dark-mode' no corpo da página
    document.getElementById('sidebar-menu').classList.toggle('dark-mode'); // Alterna a classe 'dark-mode' no menu lateral
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode')); // Salva a preferência de modo no localStorage
});

// Controla o dropdown do menu "Ponto"
document.getElementById('ponto-dropdown').addEventListener('click', function() {
    const submenu = document.getElementById('ponto-submenu');
    submenu.classList.toggle('hidden'); // Alterna a visibilidade do submenu
});

// Fecha o menu lateral quando o botão de fechar é clicado
document.getElementById('close-menu').addEventListener('click', function() {
    const menu = document.getElementById('sidebar-menu');
    menu.classList.remove('visible'); // Remove a classe 'visible' para esconder o menu
    menu.classList.add('hidden'); // Adiciona a classe 'hidden' para garantir que o menu esteja oculto
});

// Verifica e aplica o modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('dark-mode') === 'true'; // Verifica se o modo escuro está ativado no localStorage
    if (darkMode) {
        document.body.classList.add('dark-mode'); // Aplica o modo escuro ao corpo da página
        document.getElementById('sidebar-menu').classList.add('dark-mode'); // Aplica o modo escuro ao menu lateral
    }
});


