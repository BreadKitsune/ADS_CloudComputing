import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/" className="brand-logo">
          <h2>ConectaONG</h2>
        </Link>
        <span className="tagline">Conectando pessoas a causas sociais.</span>
      </div>

      <div className="nav-actions">
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