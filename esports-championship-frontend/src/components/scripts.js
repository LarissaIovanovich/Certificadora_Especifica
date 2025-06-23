// Ao enviar o formulário, previne o comportamento padrão e trata os dados manualmente
document.getElementById("createChampionshipForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const champName = document.getElementById("champName").value.trim();
  const message = document.getElementById("createMessage");

  // Aqui deixei um limite mínimo pra evitar nomes muito curtos ou acidentais
  if (champName.length < 3) {
    message.style.color = "#e74c3c";
    message.textContent = "O nome do campeonato deve ter pelo menos 3 caracteres.";
    return;
  }

  // Feedback positivo ao usuário confirmando a criação
  message.style.color = "limegreen";
  message.textContent = `Campeonato "${champName}" criado com sucesso!`;

  // Limpa o campo para nova entrada
  document.getElementById("champName").value = "";
});

// Ação do botão "Cancelar" — esvazia o formulário e avisa o usuário
document.getElementById("cancelButton").addEventListener("click", () => {
  const form = document.getElementById("createChampionshipForm");
  form.reset();

  const message = document.getElementById("createMessage");
  message.textContent = "Criação cancelada.";
  message.style.color = "#e74c3c";

  // Animação rápida pra suavizar o aviso
  message.style.opacity = "0";
  message.style.transform = "translateY(-5px)";
  setTimeout(() => {
    message.style.opacity = "1";
    message.style.transform = "translateY(0)";
  }, 50);
});








