document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("companyForm");

    form.addEventListener("submit", (event) => {
        // Lógica de validação pode ser adicionada aqui
        alert("Formulário enviado com sucesso!");
        event.preventDefault(); // Remova esta linha após implementar o back-end
    });
});

document.getElementById("logo").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Obtem o arquivo
    const preview = document.getElementById("preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result; // Define a imagem carregada como src do preview
            preview.style.display = "block"; // Mostra a imagem
        };
        reader.readAsDataURL(file); // Converte o arquivo em base64
    } else {
        preview.src = "";
        preview.style.display = "none"; // Esconde a imagem
    }
});
