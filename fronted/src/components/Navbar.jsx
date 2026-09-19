import { Link } from 'react-router-dom';

export default ({ tipoUsuario, setTipoUsuario }) => {
  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/" className="brand-logo">
          <h2>ConectaONG</h2>
        </Link>
        <span className="tagline">Conectando pessoas a causas sociais.</span>
      </div>

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Seletor de Tipo de Perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Acessar como:</label>
          <select 
            value={tipoUsuario} 
            onChange={(e) => setTipoUsuario(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <option value="voluntario">Voluntário</option>
            <option value="ong">ONG</option>
          </select>
        </div>

        {/* Botão visível apenas para ONG */}
        {tipoUsuario === 'ong' && (
          <Link to="/criar-evento" className="btn-criar-evento" style={{ padding: '8px 14px', fontSize: '0.9rem' }}>
            + Cadastrar Evento
          </Link>
        )}

        <Link to="/cadastro" className="btn-cadastro">
          CADASTRO
        </Link>
        <Link to="/login" className="btn-login">
          LOGIN
        </Link>
      </div>
    </nav>
  );
};