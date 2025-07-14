const parceirosList = document.getElementById("parceirosList");
const pesquisaInput = document.getElementById("pesquisa");
const btnPesquisar = document.getElementById("botaoPesquisar");

let parceiros = [];

function renderizarParceiros(parceirosFiltrados) {
  parceirosList.innerHTML = "";
  parceirosFiltrados.forEach((parceiro) => {
    const tipoParce = parceiro.tipoParceiro;
    const card = document.createElement("div");
    card.classList.add(`car_${tipoParce}`);
    card.innerHTML = `
        <h3>${parceiro.nomeParceiro}</h3>
        <p class="inclu">Data de inclusão: ${new Date(
          parceiro.dataCriacao
        ).toLocaleDateString("pt-BR")}</p>
        <span class="bairro">${parceiro.bairro}</span>
    `;
    card.onclick = () => {
      window.location.href = `../pages/parceiros.html?id=${parceiro.id}`;
    };
    parceirosList.appendChild(card);
  });
}

function carregarParceiros() {
  fetch(
    "https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros"
  )
    .then((response) => response.json())
    .then((data) => {
      parceiros = data.filter(
        (parceiro) => parceiro.nomeParceiro.trim() !== ""
      );
      renderizarParceiros(parceiros);
    })
    .catch((error) => {
      console.error("Erro ao carregar os parceiros:", error);
    });
}

btnPesquisar.addEventListener("click", () => {
  const pesquisa = pesquisaInput.value.trim().toLowerCase();

  if (pesquisa === "") {
    window.alert("Digite algum valor para pesquisar.");
    return;
  }

  const parceirosFiltrados = parceiros.filter(
    (parceiro) =>
      parceiro.bairro.toLowerCase().includes(pesquisa) ||
      parceiro.nomeParceiro.toLowerCase().includes(pesquisa)
  );

  if (parceirosFiltrados.length === 0) {
    parceirosList.innerHTML =
      "<p>Nenhum parceiro encontrado para essa pesquisa.</p>";
  } else {
    renderizarParceiros(parceirosFiltrados);
  }
});

window.onload = carregarParceiros;
