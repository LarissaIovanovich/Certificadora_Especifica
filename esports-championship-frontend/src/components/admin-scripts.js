// Lista de campeonatos disponíveis.
// Apenas os 4 primeiros serão exibidos para manter a estética da tela.
const championships = [
  "Campeonato Fúria 2025",
  "Desafio UTFPR Games",
  "Copa Atlética FPS",
  "Liga de Verão 2025",
  "Torneio de Outono", // Será ignorado
];

// Função responsável por montar a lista de campeonatos dinamicamente na tela
function renderChampionshipList() {
  const listEl = document.getElementById("championshipList");
  listEl.innerHTML = ""; // Garante que a lista comece limpa a cada renderização

  // Só os 4 primeiros campeonatos vão aparecer (evita layout quebrado)
  championships.slice(0, 4).forEach((name) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = name;

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("button-group");

    // Botão para gerar confrontos — pode ser ligado futuramente a um algoritmo de chaveamento
    const btnGenerate = document.createElement("button");
    btnGenerate.textContent = "Gerar Confrontos";
    btnGenerate.addEventListener("click", () => {
      alert(`Confrontos gerados para "${name}"!`);
    });

    // Botão para suspender o campeonato — simples e direto, como sugerido na proposta
    const btnSuspend = document.createElement("button");
    btnSuspend.textContent = "Suspender";
    btnSuspend.addEventListener("click", () => {
      alert(`Campeonato "${name}" suspenso.`);
    });

    // Botão para cancelar — com confirmação para evitar cancelamento acidental
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancelar";
    btnCancel.addEventListener("click", () => {
      const confirmCancel = confirm(`Tem certeza que deseja cancelar "${name}"?`);
      if (confirmCancel) {
        alert(`Campeonato "${name}" cancelado.`);
      }
    });

    // Agrupamento dos botões dentro da lista
    btnGroup.appendChild(btnGenerate);
    btnGroup.appendChild(btnSuspend);
    btnGroup.appendChild(btnCancel);

    li.appendChild(span);
    li.appendChild(btnGroup);
    listEl.appendChild(li);
  });
}

// Assim que a página carregar, renderiza a lista e aplica a animação inicial
window.addEventListener("load", () => {
  renderChampionshipList();

  const mainContainer = document.querySelector(".main-container");
  mainContainer.style.opacity = "0";
  mainContainer.style.transform = "translateY(20px)";

  setTimeout(() => {
    // Animação de fade-in suave — dá aquele toque mais profissional
    mainContainer.style.transition =
      "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    mainContainer.style.opacity = "1";
    mainContainer.style.transform = "translateY(0)";
  }, 200);
});













