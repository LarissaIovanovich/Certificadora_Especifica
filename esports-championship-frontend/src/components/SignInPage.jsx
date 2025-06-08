import { useState } from "react";
import "./LoginPage.css";
import { createUser } from '../services/api';
import imgArte from '../assets/IMG.jpg';
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setLoginMessage("Email inválido.");
      return;
    }

    if (password !== confirmPassword) {
      setLoginMessage("Senhas diferentes.");
      return;
    }

    try {
      const data = {
        nome_usuario: userName,
        email: email,
        senha_hash: password
      };
      await createUser(data);
      setLoginMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/cadastroequipe";
      }, 1000);
    } catch (error) {
      setLoginMessage("Erro ao criar conta. Tente novamente.");
      console.log(error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="background-overlay" />
      <div className="main-container">
        <div className="login-container">
          <h1 className="title">ATLÉTICA FÚRIA UTFPR</h1>
          <p className="subtitle">CRIAR CONTA</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaUser />
              <input
                type="text"
                placeholder="Nome do usuário"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">CRIAR</button>
          </form>
          <p id="loginMessage" style={{ color: loginMessage === "Cadastro realizado com sucesso!" ? "limegreen" : "#e74c3c" }}>
            {loginMessage}
          </p>
        </div>
        <div className="image-container">
          <img src={imgArte} alt="Arte da Atlética" />
        </div>
      </div>
    </div>
  );
}
