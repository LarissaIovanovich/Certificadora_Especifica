import { useState } from "react";
import "./LoginPage.css";
import { createUser } from '../services/api';

export default function LoginPage() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nome_usuario: userName,
        email: email,
        senha_hash: password
      }
      await createUser(data);
      setLoginMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/cadastroequipe";
      }, 1000);
    } catch (error) {
      //pendente: fazer verificacao e retornar msg da api
      setLoginMessage("Nome ou senha inválidos. Tente novamente.");
      console.log(error)
    }
  };

  return (
    <div className="background-overlay">
      <div className="main-container">
        <div className="login-container">
          <h1 className="title">ATLÉTICA FÚRIA UTFPR</h1>
          <p className="subtitle">CRIAR CONTA</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nome do usuário"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
            <div className="input-group">
            <input
              type="text"
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
