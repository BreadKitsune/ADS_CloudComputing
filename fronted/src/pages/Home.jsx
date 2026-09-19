import { useState } from 'react';
import { Link } from 'react-router-dom';

export default ({ eventos, aoInscrever }) => {
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  // Pega os dias do mês que possuem ao menos 1 evento
  const diasComEvento = eventos.map(ev => ev.dia);
  const diasMes = Array.from({ length: 31 }, (_, i) => i + 1);
  const diasSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  // Eventos filtrados pelo dia clicado no calendário (ou exibe todos se nenhum estiver selecionado)
  const eventosExibidos = diaSelecionado 
    ? eventos.filter(ev => ev.dia === diaSelecionado)
    : eventos;

  return (
    <div className="home-container">
      {/* Lado Esquerdo: Calendário Clicável */}
      <div className="calendar-section">
        <div className="calendar-header-info">
          <h3>Calendário de Ações</h3>
          {diaSelecionado && (
            <button className="btn-limpar-filtro" onClick={() => setDiaSelecionado(null)}>
              Mostrar Todos
            </button>
          )}
        </div>

        <div className="calendar-grid">
          {diasSemana.map((d, index) => (
            <div key={index} className="calendar-header-day">{d}</div>
          ))}

          {diasMes.map(dia => {
            const temEvento = diasComEvento.includes(dia);
            const isSelected = diaSelecionado === dia;

            return (
              <div 
                key={dia} 
                className={`calendar-day ${temEvento ? 'has-event' : ''} ${isSelected ? 'selected-day' : ''}`}
                onClick={() => temEvento && setDiaSelecionado(dia === diaSelecionado ? null : dia)}
                style={{ cursor: temEvento ? 'pointer' : 'default' }}
                title={temEvento ? `Clique para ver eventos do dia ${dia}` : ''}
              >
                <span>{dia}</span>
                {temEvento && <div className="event-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lado Direito: Ações e Lista de Eventos */}
      <div className="events-section">
        <div className="events-header-actions">
          <Link to="/criar-evento" className="btn-criar-evento">
            + Cadastrar Evento (ONG)
          </Link>
        </div>

        <div className="events-scroll-list">
          {eventosExibidos.length === 0 ? (
            <p className="no-events-msg">Nenhum evento encontrado para este dia.</p>
          ) : (
            eventosExibidos.map(ev => (
              <div key={ev.id} className="event-list-card">
                <div className="event-day-badge">{ev.dia}</div>
                <div className="event-info">
                  <h4>{ev.titulo}</h4>
                  <p className="event-location">📍 {ev.local}</p>
                  <p className="event-desc">{ev.desc}</p>
                </div>
                <button 
                  className="btn-card-inscrever"
                  onClick={() => aoInscrever(ev)}
                >
                  Inscrever-se
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};