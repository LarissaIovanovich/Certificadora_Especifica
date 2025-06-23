const championships = [
  "Campeonato Fúria 2025",
  "Desafio UTFPR Games",
  "Copa Atlética FPS",
  "Liga de Verão 2025"
];

// Equipes reais de Valorant com e-mails fictícios institucionais
const equipesPorCampeonato = {
  "Campeonato Fúria 2025": [
    { nome: "Sentinels", email: "contact@sentinels.gg", pago: true },
    { nome: "100 Thieves", email: "info@100thieves.com", pago: false },
    { nome: "Team Liquid", email: "support@teamliquid.com", pago: true },
    { nome: "Fnatic", email: "esports@fnatic.com", pago: false },
    { nome: "G2 Esports", email: "contact@g2esports.com", pago: true }
  ],
  "Desafio UTFPR Games": [
    { nome: "Cloud9", email: "hello@cloud9.gg", pago: true },
    { nome: "DRX", email: "contact@drxesports.com", pago: true },
    { nome: "Natus Vincere", email: "info@navination.com", pago: false },
    { nome: "T1", email: "contact@t1.gg", pago: true },
    { nome: "FaZe Clan", email: "support@fazeclan.com", pago: false }
  ],
  "Copa Atlética FPS": [
    { nome: "Sentinels", email: "contact@sentinels.gg", pago: true },
    { nome: "100 Thieves", email: "info@100thieves.com", pago: true },
    { nome: "Team Liquid", email: "support@teamliquid.com", pago: false },
    { nome: "Fnatic", email: "esports@fnatic.com", pago: false },
    { nome: "G2 Esports", email: "contact@g2esports.com", pago: true }
  ],
  "Liga de Verão 2025": [
    { nome: "Cloud9", email: "hello@cloud9.gg", pago: true },
    { nome: "DRX", email: "contact@drxesports.com", pago: true },
    { nome: "Natus Vincere", email: "info@navination.com", pago: false },
    { nome: "T1", email: "contact@t1.gg", pago: true },
    { nome: "FaZe Clan", email: "support@fazeclan.com", pago: false }
  ]
};

// Objeto para armazenar relatórios por campeonato
const relatoriosPorCampeonato = {};

// Renderiza a lista de campeonatos com os botões
function renderChampionshipList() {
  const listEl = document.getElementById("championshipList");
  listEl.innerHTML = "";

  championships.forEach((name) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = name;

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("button-group");

    // Botão Gerar Confrontos
    const btnGenerate = document.createElement("button");
    btnGenerate.textContent = "Gerar Confrontos";
    btnGenerate.addEventListener("click", () => {
      alert(`Confrontos gerados para "${name}"!`);
    });

    // Botão Suspender
    const btnSuspend = document.createElement("button");
    btnSuspend.textContent = "Suspender";
    btnSuspend.addEventListener("click", () => {
      li.classList.add("suspenso");
      alert(`Campeonato "${name}" suspenso.`);
    });

    // Botão Cancelar
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancelar";
    btnCancel.addEventListener("click", () => {
      const confirmCancel = confirm(`Tem certeza que deseja cancelar "${name}"?`);
      if (confirmCancel) {
        alert(`Campeonato "${name}" cancelado.`);
        span.textContent = "CANCELADO";
        li.classList.add("cancelado");
      }
    });

    // Botão Controle de Pagamentos
    const btnManage = document.createElement("button");
    btnManage.textContent = "Controle de Pagamentos";
    btnManage.addEventListener("click", () => {
      abrirGerenciamento(name);
    });

    // Botão Relatórios
    const btnRelatorios = document.createElement("button");
    btnRelatorios.textContent = "Relatórios";
    btnRelatorios.classList.add("relatorios");
    btnRelatorios.addEventListener("click", () => {
      abrirModalRelatorios(name);
    });

    btnGroup.appendChild(btnGenerate);
    btnGroup.appendChild(btnSuspend);
    btnGroup.appendChild(btnCancel);
    btnGroup.appendChild(btnManage);
    btnGroup.appendChild(btnRelatorios);

    li.appendChild(span);
    li.appendChild(btnGroup);
    listEl.appendChild(li);
  });
}

let campeonatoSelecionado = "";

// Funções modal gerenciamento (igual você já tinha)
function abrirGerenciamento(nome) {
  campeonatoSelecionado = nome;
  document.getElementById("nomeCampeonatoModal").textContent = `Campeonato: ${nome}`;
  document.getElementById("modalGerenciamento").style.display = "block";
  atualizarListaEquipes();
}

function fecharModal() {
  document.getElementById("modalGerenciamento").style.display = "none";
  document.getElementById("listaJogadores").innerHTML = "";
}

function atualizarListaEquipes() {
  const tbody = document.getElementById("listaJogadores");
  tbody.innerHTML = "";

  const equipes = equipesPorCampeonato[campeonatoSelecionado] || [];

  if (equipes.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.style.color = "#f5c400";
    td.style.fontWeight = "700";
    td.style.textAlign = "center";
    td.textContent = "Nenhuma equipe cadastrada.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  equipes.forEach((equipe, index) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = equipe.nome;

    const tdEmail = document.createElement("td");
    tdEmail.innerHTML = `<span class="email">&lt;${equipe.email}&gt;</span>`;

    const tdStatus = document.createElement("td");
    const btnStatus = document.createElement("button");
    btnStatus.textContent = equipe.pago ? "Pago" : "Não Pago";
    btnStatus.classList.add("status");
    btnStatus.classList.add(equipe.pago ? "pago" : "nao-pago");
    btnStatus.onclick = () => {
      equipesPorCampeonato[campeonatoSelecionado][index].pago =
        !equipesPorCampeonato[campeonatoSelecionado][index].pago;
      atualizarListaEquipes();
    };
    tdStatus.appendChild(btnStatus);

    const tdAcoes = document.createElement("td");
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remover";
    btnRemove.classList.add("remover");
    btnRemove.onclick = () => {
      if (confirm(`Remover equipe ${equipe.nome}?`)) {
        equipesPorCampeonato[campeonatoSelecionado].splice(index, 1);
        atualizarListaEquipes();
      }
    };
    tdAcoes.appendChild(btnRemove);

    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  });
}

// --------------------------------------------------
// RELATÓRIOS - Modal, abrir, salvar e fechar
// --------------------------------------------------

// Crie um modal no HTML para relatórios parecido com o modal de gerenciamento
// Vou detalhar depois se quiser.

// Função para abrir o modal de relatórios
function abrirModalRelatorios(nome) {
  campeonatoSelecionado = nome;

  // Cria modal dinamicamente (ou pode colocar fixo no HTML)
  let modalRelatorio = document.getElementById("modalRelatorios");
  if (!modalRelatorio) {
    modalRelatorio = document.createElement("div");
    modalRelatorio.id = "modalRelatorios";
    modalRelatorio.classList.add("modal");
    modalRelatorio.innerHTML = `
      <div class="modal-content">
        <span class="close" id="closeRelatorio">&times;</span>
        <h2>Relatório do Campeonato</h2>
        <p><strong>${nome}</strong></p>
        <label for="tituloRelatorio">Título:</label>
        <input type="text" id="tituloRelatorio" placeholder="Digite o título" style="padding: 8px; width: 100%; margin-bottom: 10px; border-radius: 8px; border: 1px solid #f5c400; background-color: #121212; color: #f5c400; font-family: 'Bebas Neue', sans-serif; text-transform: uppercase;">
        <label for="resumoRelatorio">Resumo:</label>
        <textarea id="resumoRelatorio" placeholder="Digite o resumo" rows="6" style="padding: 8px; width: 100%; border-radius: 8px; border: 1px solid #f5c400; background-color: #121212; color: #f5c400; font-family: 'Bebas Neue', sans-serif; text-transform: uppercase;"></textarea>
        <button id="btnSalvarRelatorio" style="margin-top: 15px; background-color: #f5c400; color: black; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; padding: 10px 15px; width: 100%;">Salvar Relatório</button>
      </div>
    `;
    document.body.appendChild(modalRelatorio);

    // Fecha modal ao clicar no X
    document.getElementById("closeRelatorio").onclick = () => {
      fecharModalRelatorios();
    };
  }

  // Preenche campos com relatório salvo se houver
  const relatorio = relatoriosPorCampeonato[nome];
  document.getElementById("tituloRelatorio").value = relatorio?.titulo || "";
  document.getElementById("resumoRelatorio").value = relatorio?.resumo || "";

  modalRelatorio.style.display = "block";

  // Salvar relatório
  document.getElementById("btnSalvarRelatorio").onclick = () => {
    const titulo = document.getElementById("tituloRelatorio").value.trim();
    const resumo = document.getElementById("resumoRelatorio").value.trim();

    if (!titulo || !resumo) {
      alert("Preencha título e resumo antes de salvar.");
      return;
    }

    relatoriosPorCampeonato[nome] = { titulo, resumo };
    alert("Relatório salvo com sucesso!");
    fecharModalRelatorios();
  };
}

// Função para fechar modal de relatórios
function fecharModalRelatorios() {
  const modalRelatorio = document.getElementById("modalRelatorios");
  if (modalRelatorio) {
    modalRelatorio.style.display = "none";
  }
}

// Fecha modais ao clicar fora do conteúdo
window.onclick = function (event) {
  const modalGerenciamento = document.getElementById("modalGerenciamento");
  const modalRelatorios = document.getElementById("modalRelatorios");
  if (event.target === modalGerenciamento) {
    fecharModal();
  }
  if (event.target === modalRelatorios) {
    fecharModalRelatorios();
  }
};

// Inicializa
window.addEventListener("load", () => {
  renderChampionshipList();

  const mainContainer = document.querySelector(".main-container");
  mainContainer.style.opacity = "0";
  mainContainer.style.transform = "translateY(20px)";

  setTimeout(() => {
    mainContainer.style.transition =
      "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    mainContainer.style.opacity = "1";
    mainContainer.style.transform = "translateY(0)";
  }, 200);
});








































