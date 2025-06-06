import { useState } from "react";
import "./LoginPage.css";
import { login } from "../services/api";
import imgArte from '../assets/IMG.jpg';
import { FaUser, FaLock } from "react-icons/fa";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        senha: password
      }
      const response = await login(data);
      localStorage.setItem('token', response.data.token);

      setLoginMessage("Login realizado com sucesso!");
      setTimeout(() => {
        // window.location.href = "/cadastro";
      }, 1000);
    } catch (error) {
      setLoginMessage("Nome ou senha inválidos. Tente novamente.");
      console.log(error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="background-overlay" />
      <div className="main-container">
        <div className="login-container">
          <h1 className="title">ATLÉTICA FÚRIA UTFPR</h1>
          <p className="subtitle">LOGIN</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser />
              <input
                type="text"
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
          <img src={imgArte} alt="Arte da Atlética" />
        </div>
      </div>
    </div>
  );
}

