import React from 'react';
import '../styles/components/EducacaoComponents.css'; // Caminho corrigido para o CSS

// Componente Banner
const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1 className="banner-title">Educação Ambiental: Aprendendo a Cuidar do Nosso Planeta</h1>
        <p className="banner-text">
          Saiba como suas pequenas ações diárias na gestão de resíduos podem gerar grandes 
          impactos positivos para o meio ambiente e para nossa comunidade.
        </p>
      </div>
    </div>
  );
};

// Componente RecyclingGuide
const RecyclingGuide = () => {
  return (
    <div className="card">
      <h2 className="card-title">Aprenda a Separar Seus Resíduos</h2>
      
      <div className="recycling-grid">
        <div className="recycling-item">
          <div className="recycling-circle paper">
            <span className="circle-text">Papel</span>
          </div>
          <p className="recycling-description">Jornais, revistas, folhetos</p>
        </div>
        
        <div className="recycling-item">
          <div className="recycling-circle plastic">
            <span className="circle-text">Plástico</span>
          </div>
          <p className="recycling-description">Garrafas, embalagens, sacolas</p>
        </div>
      </div>
      
      <div className="recycling-grid">
        <div className="recycling-item">
          <div className="recycling-circle metal">
            <span className="circle-text">Metal</span>
          </div>
          <p className="recycling-description">Latas, tampas, ferragens</p>
        </div>
        
        <div className="recycling-item">
          <div className="recycling-circle glass">
            <span className="circle-text">Vidro</span>
          </div>
          <p className="recycling-description">Garrafas, potes, frascos</p>
        </div>
      </div>
      
      <div className="recycling-center">
        <div className="recycling-item">
          <div className="recycling-circle organic">
            <span className="circle-text">Orgânico</span>
          </div>
          <p className="recycling-description">Restos de alimentos</p>
        </div>
      </div>
    </div>
  );
};

// Componente MaterialLifecycle
const MaterialLifecycle = () => {
  return (
    <div className="card">
      <h2 className="card-title">Ciclo de Vida dos Materiais</h2>
      
      <div className="lifecycle-image-container">
        <img 
          src="/MaoClean/assets/reciclavel.png"  // Caminho absoluto com base
          alt="Símbolo de reciclagem em mãos" 
          className="lifecycle-image"
        />
      </div>

      <p className="lifecycle-description ">
        Cada material reciclável segue um caminho específico desde o descarte até sua transformação em novo produto. Entenda esse processo e por que cada etapa é importante:
      </p>
      
      <ol className="lifecycle-steps">
        <li><span className="step-title">Consumo e Descarte</span> - O ciclo começa com você!</li>
        <li><span className="step-title">Coleta Seletiva</span> - Separação adequada dos materiais</li>
        <li><span className="step-title">Triagem</span> - Classificação nos centros de reciclagem</li>
      </ol>
    </div>
  );
};

// Componente FactsSection
const FactsSection = () => {
  return (
    <div className="card">
      <h2 className="card-title">Você Sabia?</h2>
      
      <ul className="facts-list">
        <li className="fact-item">
          Uma única garrafa PET pode levar mais de <span className="fact-highlight">400 anos</span> para se decompor na natureza.
        </li>
        <li className="fact-item">
          Reciclar uma tonelada de papel salva aproximadamente <span className="fact-highlight">20 árvores</span>.
        </li>
        <li className="fact-item">
          Cada brasileiro produz em média <span className="fact-highlight">1kg de lixo por dia</span>, totalizando mais de 79 milhões de toneladas por ano.
        </li>
        <li className="fact-item">
          Cerca de <span className="fact-highlight">30%</span> de todo o lixo produzido poderia ser compostado.
        </li>
        <li className="fact-item">
          A reciclagem de alumínio economiza <span className="fact-highlight">95%</span> da energia necessária para produzir alumínio a partir da matéria-prima.
        </li>
      </ul>
    </div>
  );
};

// Componente MainContent que combina tudo
const EducacaoContent = () => {
  return (
    <main>
      <Banner />
      
      {/* Conteúdo Principal - Fundo Preto */}
      <div className="content-container">
        <div className="cards-container">
          <RecyclingGuide />
          <MaterialLifecycle />
          <FactsSection />
        </div>
      </div>
      
    </main>
  );
};

export default EducacaoContent;