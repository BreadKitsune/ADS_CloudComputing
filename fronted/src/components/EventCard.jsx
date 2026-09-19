export default ({ title, local, data }) => (
  <div className="card">
    <div className="img" />
    <h3>{title}</h3>
    <p>📍 {local}</p>
    <p>📅 {data}</p>
    <button>Inscrever-se</button>
  </div>
);
