function pesquisarVeiculos() {
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    if (pesquisa === "") {
        // Se a pesquisa estiver vazia, exibe todos os veículos
        cards.forEach(card => {
            card.style.display = "block";
        });
        return; // Sai da função para evitar filtragem
    }

    cards.forEach(card => {
        const placa = card.querySelector(".p_placa").textContent.toLowerCase();

        // Se a placa corresponde ao valor digitado, exibe o card; senão, oculta
        if (placa.includes(pesquisa)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}