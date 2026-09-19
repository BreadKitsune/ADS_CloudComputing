import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CriarEvento from './pages/CriarEvento';
import './styles.css';

export default () => {
  const [tipoUsuario, setTipoUsuario] = useState('voluntario'); // 'voluntario' ou 'ong'

  const [eventos, setEventos] = useState([
    { id: 1, dia: 2, titulo: 'Mutirão Solidário', local: 'Zona Sul', desc: 'Ação de apoio à comunidade local.' },
    { id: 2, dia: 10, titulo: 'Doação de Sangue', local: 'Hospital Central', desc: 'Campanha de coleta de sangue.' },
    { id: 3, dia: 13, titulo: 'Plantio de Árvores', local: 'Parque Urbanova', desc: 'Reflorestamento de área verde.' }
  ]);

  const adicionarEvento = (novoEvento) => {
    setEventos([...eventos, novoEvento]);
  };

  const realizarInscricao = (evento) => {
    alert(`Inscrição realizada com sucesso no evento: ${evento.titulo}!`);
  };

  return (
    <div className="app-container">
      <Navbar tipoUsuario={tipoUsuario} setTipoUsuario={setTipoUsuario} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              eventos={eventos} 
              aoInscrever={realizarInscricao} 
              tipoUsuario={tipoUsuario} 
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route 
          path="/criar-evento" 
          element={
            <CriarEvento 
              aoCriarEvento={adicionarEvento} 
              tipoUsuario={tipoUsuario} 
            />
          } 
        />
      </Routes>
    </div>
  );
};