import { useState } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Login realizado com sucesso!");
        // Aqui você pode salvar o token no localStorage e redirecionar
        localStorage.setItem("token", data.token);
        // Exemplo: window.location.href = "/home";
      } else {
        setMensagem(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setMensagem("Erro de conexão com o servidor");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <p className="auth-subtitle">Aceda à sua conta para continuar</p>

        <div className="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            placeholder="seuemail@exemplo.com" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Palavra-passe</label>
          <div className="password-wrapper">
            <input 
              type={mostrarSenha ? "text" : "password"} 
              placeholder="Digite a sua palavra-passe" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              title={mostrarSenha ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
            >
              {mostrarSenha ? (
                /* Ícone de Olho Fechado (Riscado) */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Ícone de Olho Aberto */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-submit">Entrar</button>

        {mensagem && <p className="auth-message">{mensagem}</p>}

        <p className="auth-footer">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};
