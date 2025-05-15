import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa componentes de layout
import Header from './components/Header';
import Footer from './components/Footer';

// Importa páginas
import Home from './pages/Home';
import Educacao from './pages/Educacao';
import Denuncia from './pages/Denuncia';
import Coleta from './pages/Coleta';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-screen-xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/denuncia" element={<Denuncia />} />
          <Route path="/coleta" element={<Coleta />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;