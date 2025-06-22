import { useState } from "react";
import "./LoginPage.css"; 
import { register } from '../services/api';
import imgArte from '../assets/IMG.jpg';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function SignInPage() { 
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // MUDANÇA : Lógica do handleSubmit totalmente corrigida
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterMessage("");

    if (!validateEmail(email)) {
      setRegisterMessage("Formato de e-mail inválido.");
      return;
    }
    if (password !== confirmPassword) {
      setRegisterMessage("As senhas não coincidem.");
      return;
    }

    try {
      const data = {
        nome_usuario: userName,
        email: email,
        senha: password 
      };
      
      await register(data); 
      
      setRegisterMessage("Cadastro realizado com sucesso! Redirecionando para o login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erro ao criar conta. Tente novamente.";
      setRegisterMessage(errorMessage);
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
                type="text"
                placeholder="Nome de usuário"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope /> {/* Ícone de e-mail */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock />
              <input
                type="password"
                placeholder="Senha (mínimo 8 caracteres)"
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
          {/* Mensagem de feedback */}
          <p className="login-message-feedback" style={{ color: registerMessage.includes("sucesso") ? "limegreen" : "#e74c3c" }}>
            {registerMessage}
          </p>
          {/* Link para voltar para a página de login */}
          <p className="signup-link">
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </div>
        <div className="image-container">
          <img src={imgArte} alt="Arte da Atlética" />
        </div>
      </div>
    </div>
  );
}