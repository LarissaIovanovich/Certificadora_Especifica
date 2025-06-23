// Evento de envio do formulário — cria campeonato
document.getElementById("createChampionshipForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const champName = document.getElementById("champName").value.trim();
  const message = document.getElementById("createMessage");

  // Validação mínima do nome
  if (champName.length < 3) {
    message.style.color = "#e74c3c";
    message.textContent = "O nome do campeonato deve ter pelo menos 3 caracteres.";
    animateMessage(message);
    return;
  }

  // Mensagem de sucesso
  message.style.color = "limegreen";
  message.textContent = `✅ Campeonato "${champName}" criado com sucesso!`;
  animateMessage(message);

  // Limpa o campo
  document.getElementById("champName").value = "";
});

// Evento do botão "Cancelar" — cancela criação e mostra o nome
document.getElementById("cancelButton").addEventListener("click", () => {
  const champInput = document.getElementById("champName");
  const champName = champInput.value.trim(); // Pegamos o valor ANTES do reset
  const form = document.getElementById("createChampionshipForm");
  const message = document.getElementById("createMessage");

  if (champName.length >= 3) {
    message.textContent = `❌ Campeonato "${champName}" foi cancelado.`;
  } else {
    message.textContent = "Criação cancelada.";
  }

  message.style.color = "#e74c3c";
  animateMessage(message);

  form.reset(); // Agora sim limpamos o campo depois de mostrar a mensagem
});

// Função para animar suavemente a mensagem
function animateMessage(element) {
  element.style.opacity = "0";
  element.style.transform = "translateY(-5px)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }, 50);
}










