import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-text">
        <strong>Gestão de resíduos em Manaus:</strong> Descubra como a cidade está trabalhando para um futuro mais sustentável!
      </div>
      <div className="social-icons">
        <p>Redes Sociais:</p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="./assets/instagram.png" alt="Instagram" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="./assets/facebook.png" alt="Facebook" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="./assets/youtube.png" alt="YouTube" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;