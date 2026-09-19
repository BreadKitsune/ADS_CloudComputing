import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default ({ aoCriarEvento }) => {
  const [titulo, setTitulo] = useState('');
  const [local, setLocal] = useState('');
  const [dia, setDia] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dia || dia < 1 || dia > 31) {
      alert('Por favor, informe um dia válido do mês (1 a 31).');
      return;
    }

    const novoEvento = {
      id: Date.now(),
      dia: Number(dia),
      titulo,
      local,
      desc
    };

    if (aoCriarEvento) {
      aoCriarEvento(novoEvento);
    }

    alert('Evento cadastrado com sucesso!');
    navigate('/'); // Voltar para a Home para ver o evento criado
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit} style={{ maxWidth: '560px' }}>
        <h2>Cadastrar Novo Evento</h2>
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