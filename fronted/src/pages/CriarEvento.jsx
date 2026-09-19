import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

export default ({ tipoUsuario }) => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [local, setLocal] = useState('');
  const [dia, setDia] = useState('');
  const [desc, setDesc] = useState('');

  // Proteção de rota: apenas ONG pode cadastrar
  if (tipoUsuario !== 'ong') {
    alert('Apenas contas de ONG podem cadastrar novos eventos.');
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dia || dia < 1 || dia > 31) {
      alert('Por favor, informe um dia válido do mês (1 a 31).');
      return;
    }

    const novoEvento = {
      titulo,
      local,
      dia: Number(dia),
      desc
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEvento)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Evento cadastrado com sucesso!");
        navigate('/');
      } else {
        alert(data.message || "Erro ao cadastrar evento");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit} style={{ maxWidth: '560px' }}>
        <h2>Cadastrar Novo Evento (Área da ONG)</h2>
        <p className="auth-subtitle">Preencha os detalhes da sua ação social</p>

        <div className="input-group">
          <label>Título do Evento</label>
          <input 
            type="text" 
            placeholder="Ex: Arrecadação de Alimentos" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label>Dia do Mês (Ex: 15)</label>
          <input 
            type="number" 
            min="1" 
            max="31" 
            placeholder="Digite o dia do evento" 
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label>Localização</label>
          <input 
            type="text" 
            placeholder="Ex: Centro Comunitário - Zona Norte" 
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label>Descrição Breve</label>
          <textarea 
            rows="3"
            placeholder="Descreva o objetivo do evento e o que os voluntários farão"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="input-textarea"
            required
          />
        </div>

        <button type="submit" className="btn-submit">Publicar Evento</button>
      </form>
    </div>
  );
};
