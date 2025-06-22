import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext"; 
import "./LoginPage.css";
import imgArte from '../assets/IMG.jpg';
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage(""); 

    const result = await login(email, password); 

    if (result.success) {
      setLoginMessage("Login realizado com sucesso!");
      // Redireciona para a página principal ou dashboard
      setTimeout(() => {
        navigate("/campeonatos"); 
      }, 100);
    } else {
     
      setLoginMessage(result.message);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="background-overlay"/>
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
          
          <p id="loginMessage" className="login-message-feedback" style={{ color: loginMessage === "Login realizado com sucesso!" ? "limegreen" : "#e74c3c" }}>
            {loginMessage}
          </p>
          
          {/* Link para a página de cadastro */}
          <p className="signup-link">
            Não tem uma conta? <Link to="/signin">Cadastre-se</Link>
          </p>
        </div>
        <div className="image-container">
          <img src={imgArte} alt="Arte da Atlética" />
        </div>
      </div>
    </div>
  );
}