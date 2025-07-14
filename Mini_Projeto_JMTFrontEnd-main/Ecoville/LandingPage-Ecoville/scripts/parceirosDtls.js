 const urlParams = new URLSearchParams(window.location.search);
    const parceiroId = urlParams.get('id');
    const objetivosSection = document.getElementById('objetivos');

    fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${parceiroId}`)
        .then(response => response.json())
        .then(data => {
        const materiais = [
            { chave: 'papel', nome: 'Papel', emoji: '📄' },
            { chave: 'plastico', nome: 'Plástico', emoji: '♻️' },
            { chave: 'vidro', nome: 'Vidro', emoji: '🍾' },
            { chave: 'metal', nome: 'Metal', emoji: '🔩' },
            { chave: 'oleoCozinha', nome: 'Óleo de cozinha', emoji: '🛢️' },
            { chave: 'pilhaBateria', nome: 'Pilhas e baterias', emoji: '🔋' },
            { chave: 'eletronico', nome: 'Eletrônicos', emoji: '💻' },
            { chave: 'roupa', nome: 'Roupa', emoji: '👕' },
            { chave: 'outros', nome: 'Outros', emoji: '📦' }
        ];

        // Filtra materiais aceitos e monta a string de emojis com nomes
        const materiaisAceitos = materiais
            .filter(m => data[m.chave])
            .map(m => `${m.emoji} ${m.nome}`)
            .join(' • '); // separa por bullet points

        objetivosSection.innerHTML = `
            <h2>${data.nomeParceiro || "Nome não cadastrado"}</h2>
            <p><strong>Responsável:</strong> ${data.responsavelParceiro || "Responsável não cadastrado"}</p>
            <p><strong>Telefone:</strong> ${data.telResponsavel || "Telefone não cadastrado"}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${data.emailResponsavel}">${data.emailResponsavel || "E-mail não cadastrado"}</a></p>
            <p><strong>Materiais aceitos:</strong> ${materiaisAceitos || 'Nenhum material aceito cadastrado.'}</p>
            <p><span class="bairro">#${data.tipoParceiro || "Tipo não cadastrado"}</span></p>
        `;
        })
