document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.querySelector('input[name="cep"]');
    const enderecoInput = document.querySelector('input[name="endereco"]');
    const bairroInput = document.querySelector('input[name="bairro"]');
    const cidadeInput = document.querySelector('input[name="cidade"]');
    const estadoInput = document.querySelector('input[name="estado"]');

    if (cepInput) {
        cepInput.addEventListener("blur", function () {
            const cep = cepInput.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número.

            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            enderecoInput.value = data.logradouro || '';
                            bairroInput.value = data.bairro || '';
                            cidadeInput.value = data.localidade || '';
                            estadoInput.value = data.uf || '';
                        } else {
                            alert("CEP não encontrado!");
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao buscar o CEP:", error);
                        alert("Erro ao buscar o CEP. Tente novamente.");
                    });
            } else {
                alert("CEP inválido. Por favor, digite um CEP com 8 números.");
            }
        });
    }
});