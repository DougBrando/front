
// window.alert('Dados enviados com sucesso!');

// Pegar o formulário
const form = document.getElementById('form-model');

// Adicionar um "ouvinte" para quando o formulário for enviado
form.addEventListener('submit', function(event) {
    // Impedir que a página recarregue (comportamento padrão)
    event.preventDefault();
    
    // Coletar todos os dados do formulário
    const formData = new FormData(form);
    
    // Coletar os tipos de resíduos marcados
    const wasteTypes = [];
    const checkboxes = document.querySelectorAll('input[name="waste-types"]:checked');
    checkboxes.forEach(checkbox => {
        wasteTypes.push(checkbox.value);
    });
    
    // Criar um objeto com os dados para enviar
    const dadosParaEnviar = {
        username: formData.get('username'),
        partnerType: formData.get('partner-type'),
        responsibleName: formData.get('responsible-name'),
        responsibleEmail: formData.get('responsible-email'),
        responsiblePhone: formData.get('responsible-phone'),
        street: formData.get('street'),
        number: formData.get('number'),
        neighborhood: formData.get('neighborhood'),
        wasteTypes: wasteTypes
    };
    
    // Enviar os dados para a API
    fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
    })
    .then(response => {
        if (response.ok) {
            // Se deu certo, mostrar o alerta de sucesso
            window.alert('Dados enviados com sucesso!');
            // Limpar o formulário
            form.reset();
        } else {
            // Se deu erro, mostrar mensagem de erro
            window.alert('Erro ao enviar dados. Tente novamente.');
        }
    })
    .catch(error => {
        // Se deu erro de conexão, mostrar mensagem de erro
        window.alert('Erro ao enviar dados. Verifique sua conexão.');
    });
});





