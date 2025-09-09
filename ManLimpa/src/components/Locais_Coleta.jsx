import React from 'react';
import '../styles/components/Locais_Coleta.css'; // Caminho corrigido para o CSS

const Locais_Coleta = () => {
  // URL do mapa que você forneceu
    const mapaUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3981.073931372479!2d-60.0346118!3d-3.0784829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f99!2m1!1slocais+com+coleta+seletiva+manaus!5e0!3m2!1spt-BR!2sbr!4v1716368392415!5m2!1spt-BR!2sbr";

    const pontosColeta = [
    {
      nome: "PEV (CIGS - São Jorge)",
      endereco: "Av. São Jorge, s/n - São Jorge, Manaus"
    },
    {
      nome: "PEV Parque dos Bilhares",
      endereco: "Av. Djalma Batista, s/n - Chapada, Manaus"
    },
    {
      nome: "PEV Shopping Ponta Negra",
      endereco: "Av. Coronel Teixeira, 5.715 - Ponta Negra, Manaus"
    },
    {
      nome: "PEV Compensa",
      endereco: "Rua 21 de Abril, s/n - Compensa, Manaus"
    },
    {
      nome: "PEV Cidade Nova",
      endereco: "Av. Cosme Ferreira, s/n - Cidade Nova, Manaus"
    }
  ];
  
  return (
    <div className="mapa-texto-container">
      <div className="secao-texto">
        <h2>Pontos de Coleta Seletiva em Manaus</h2>
        <p className="texto-introducao">
        Manaus possui diversos pontos de coleta seletiva espalhados pela cidade. Esses locais são fundamentais para o correto descarte de materiais recicláveis, contribuindo para a preservação ambiental da nossa região amazônica.
        </p>
       
        <div className="info-dicas">
          <h3>Dicas de Reciclagem:</h3>
          <ul>
            <li>• Separe corretamente os materiais recicláveis</li>
            <li>• Lave as embalagens antes de descartar</li>
            <li>• Compacte garrafas e caixas para ocupar menos espaço</li>
            <li>• Verifique quais materiais são aceitos em cada ponto de coleta</li>
          </ul>
     
          <h3>Principais Pontos de Coleta:</h3>
            <ul>
                {pontosColeta.map((ponto, index) => (
                    <li key={index}>
                    <strong>{ponto.nome}</strong>- {ponto.endereco}
                    </li>
                ))}
           </ul>
        </div>
      </div>
      
      <div className="secao-mapa">
        {/* Incorporação do mapa do Google via iframe */}
        <h1>Pontos de coleta seletiva em Manaus</h1>
        <iframe 
          src={mapaUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Pontos de coleta seletiva em Manaus"
          className="mapa-iframe"
        ></iframe>
      </div>
    </div>
    
  );
};

export default Locais_Coleta;