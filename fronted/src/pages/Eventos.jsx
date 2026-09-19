import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

export default () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    }
    fetchEventos();
  }, []);

  return (
    <div className="grid">
      {eventos.length === 0 ? (
        <p>Nenhum evento disponível.</p>
      ) : (
        eventos.map(ev => (
          <EventCard 
            key={ev.id}
            title={ev.titulo} 
            local={ev.local} 
            data={ev.dia} 
          />
        ))
      )}
    </div>
  );
};
