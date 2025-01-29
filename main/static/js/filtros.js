function filtrar() {
    const status = document.getElementById('status').value;
    const exibir = document.getElementById('exibir').value;
    const urlParams = new URLSearchParams(window.location.search);

    // Adiciona ou remove o parâmetro de status
    if (status) {
        urlParams.set('status', status);
    } else {
        urlParams.delete('status');
    }

    // Adiciona ou remove o parâmetro de exibir
    if (exibir) {
        urlParams.set('exibir', exibir);
    } else {
        urlParams.delete('exibir');
    }

    // Atualiza a URL com os parâmetros
    window.location.search = urlParams.toString();
}
