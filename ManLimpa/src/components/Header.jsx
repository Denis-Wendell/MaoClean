import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Header.css';

const Header = () => {
  const location = useLocation();
  
  // Verifica se o link corresponde à rota atual
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Sempre que a rota mudar, fecha o menu mobile
  useEffect(() => {
    const checkbox = document.getElementById('menu-toggle');
    if (checkbox) {
      checkbox.checked = false;
    }
  }, [location.pathname]); // dispara quando a URL muda

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="./assets/logo.png"
            alt="Logo"
            className="logo-image"
          />
        </Link>
      </div>
      
      {/* Botão do menu mobile */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-button">
        <span></span>
        <span></span>
        <span></span>
      </label>
      
      <nav className="nav-links">
        <Link to="/" className={isActive('/')}>GESTÃO DE RESÍDUOS</Link>
        <Link to="/coleta" className={isActive('/coleta')}>PONTOS DE COLETA</Link>
        <Link to="/educacao" className={isActive('/educacao')}>EDUCAÇÃO</Link>
        <Link to="/denuncia" className={isActive('/denuncia')}>DENUNCIE</Link>
      </nav>
    </header>
  );
};

export default Header;
