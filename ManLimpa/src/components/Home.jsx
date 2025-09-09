import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../styles/components/Home.css";


const images = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.jpg",
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.jpg",
 
];

const infoCards = [
  /* Componente de informações */
  {
    title: "Ecopontos",
    description: "Encontre os pontos de coleta seletiva mais próximos de você em Manaus e contribua para um destino correto dos seus resíduos recicláveis",
				link: "/coleta"
  },
  {
    title: "Central de Denúncias",
    description: "Seja um guardião da sua cidade! Denuncie descartes irregulares de lixo, entulho e resíduos em locais inadequados. Juntos, construímos uma Manaus mais limpa.",
				link: "/denuncia"
  },
  {
    title: "Conscientização",
    description: "Domine a arte da separação correta de lixo e entenda como papel, plástico, metal e vidro podem ter uma segunda vida através da reciclagem",
				link: "/educacao"
  },
  ];

// Componente de Carrossel de Imagens
const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Configurações do carrossel
  return (
    <div className="home-container">
      <div className="impact-container">
        <h2 className="impact-title">
          🌱<strong>MaoClean</strong>🎯
        </h2>
        <p className="impact-stat">
          <strong>MaoClean</strong> é uma 💻 solução digital, materializada como uma plataforma web interativa, criada com o propósito central de promover e facilitar a <strong>gestão sustentável de resíduos sólidos</strong> na cidade de <strong>Manaus</strong>. Sua finalidade é enfrentar o desafio do 🗑️ <strong>descarte inadequado</strong> e da baixa adesão às práticas de ♻️ reciclagem, atuando como um 🔗 <strong>elo</strong> entre os cidadãos, a informação e os recursos de coleta seletiva.
        </p>
        <p className="impact-stat">
          O projeto busca ℹ️ <strong>democratizar o acesso a informações</strong> cruciais sobre a coleta seletiva, incentivar a  <strong>conscientização ambiental</strong> e engajar a população em <strong>práticas de descarte mais responsáveis</strong>. Para os gestores, o <strong>MaoClean</strong> também se propõe a oferecer 🛠️ <strong>ferramentas</strong> que auxiliem no monitoramento e na otimização dos processos de coleta e gestão de resíduos.
        </p>
        <p className="impact-stat">
          O objetivo final do <strong>MaoClean</strong> é contribuir significativamente para a construção de uma <strong>Manaus mais limpa, organizada e ambientalmente consciente</strong>. Ele representa uma iniciativa de 💡 <strong>inovação social</strong> que utiliza a tecnologia como ferramenta para fomentar o <strong>desenvolvimento sustentável urbano</strong>, a segurança dos dados e o <strong>bem-estar da comunidade</strong>.
        </p>
      </div>


      {/* Carrossel de Imagens */}
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <img
              src={src}
              alt={`Imagem ${i + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>

      {/* Componente de Informações */}
      <div className="info-cards-container">
							{infoCards.map((card, index) => (
								<div key={index} className="info-card">
									<Link to={card.link} className="info-link">{card.title}</Link>
									<p className="info-description">
										{card.description}
									</p>
									</div>
									))}
						</div>
        

      {/* Componente de Impacto Ambiental */}
      <div className="impact-container">
        <h2 className="impact-title">
          Impacto Positivo em Manaus 🌱
        </h2>
        <br />
        <p className="impact-stat">
          ♻️ Mais de <strong>1.200 toneladas</strong> de resíduos recicláveis coletados em 2024
        </p>
        <p className="impact-stat">
          🌍 Redução estimada de <strong>3.500 toneladas de CO₂</strong> na atmosfera
        </p>
        <p className="impact-stat">
          ♻️ Mais de <strong>1.000 toneladas</strong> de resíduos recicláveis coletados em 2023
        </p>
        <p className="impact-stat">
          💚 Mais de <strong>200 ecopontos</strong> ativos ajudando a construir uma cidade mais sustentável!
        </p>
      </div>
    </div>
  );
};

export default ImageCarousel;