import { useState } from "react";
import "./LoginPage.css";
import { Users, Lock } from "lucide-react";

export default function LoginPage() {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim().toLowerCase() === "furia" && password === "utfpr") {
      setLoginMessage("Login realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/cadastroequipe"; // Ajuste a rota conforme o React Router
      }, 1000);
    } else {
      setLoginMessage("Nome da equipe ou senha inválidos. Tente novamente.");
    }
  };

  return (
    <div className="background-overlay">
      <div className="main-container">
        <div className="login-container">
          <h1 className="title">ATLÉTICA FÚRIA UTFPR</h1>
          <p className="subtitle">LOGIN</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Users size={20} strokeWidth={2} />
              <input
                type="text"
                placeholder="Nome da Equipe"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <Lock size={20} strokeWidth={2} />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">ENTRAR</button>
          </form>
          <p id="loginMessage" style={{ color: loginMessage === "Login realizado com sucesso!" ? "limegreen" : "#e74c3c" }}>
            {loginMessage}
          </p>
        </div>
        <div className="image-container">
          <img src="IMG.jpg" alt="Arte da Atlética" />
        </div>
      </div>
    </div>
  );
}
