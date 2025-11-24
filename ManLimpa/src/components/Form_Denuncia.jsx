import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/components/Form_Denuncia.css';
import '../styles/components/Chatbot.css';
// --- Início das Simulações (Mocks) ---
// Para resolver os erros de importação, estamos simulando os serviços aqui.
const denunciaService = {
  createDenuncia: (data) => {
    console.log("Enviando denúncia (simulado):", data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Denúncia criada com sucesso' });
      }, 1000);
    });
  }
};

const tipoResiduoService = {
  getAllTiposResiduo: () => {
    return new Promise((resolve) => {
        resolve([
          { id: 1, nome: 'Resíduos Domiciliares', descricao: 'Provenientes de residências.' },
          { id: 2, nome: 'Resíduos de Limpeza Urbana', descricao: 'Gerados pela limpeza de ruas.' },
          { id: 3, nome: 'Resíduos Industriais', descricao: 'Resultantes de atividades industriais.' },
          { id: 4, nome: 'Resíduos de Serviços de Saúde (RSS)', descricao: 'Gerados em hospitais, clínicas, etc.' },
          { id: 5, nome: 'Resíduos de Construção Civil', descricao: 'Entulho, materiais de demolição, etc.' },
          { id: 6, nome: 'Resíduos Radioativos', descricao: 'Provenientes de fontes radioativas.' },
          { id: 7, nome: 'Resíduos Agrícolas', descricao: 'Provenientes de atividades agrícolas.' }
        ]);
    });
  }
};
// --- Fim das Simulações (Mocks) ---


// --- Início do Componente Chatbot ---
// O componente Chatbot e seus estilos foram movidos para este arquivo para resolver o erro de importação.
const ChatbotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', parts: [{ text: 'Olá! Sou o RecicloBot. Como posso te ajudar hoje?' }] }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', parts: [{ text: input }] };
        setIsLoading(true);
        setInput('');
        setMessages(prev => [...prev, userMessage]);

        try {
            const history = messages.slice(1);
            const response = await axios.post('http://localhost:3002/api/chatbot', {
                message: input,
                history: history
            });
            const botMessage = { role: 'model', parts: [{ text: response.data.reply }] };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Erro ao comunicar com o chatbot:", error);
            const errorMessage = { role: 'model', parts: [{ text: 'Ops, algo deu errado. Tente novamente.' }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-widget">
            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <h3>RecicloBot</h3>
                    <button onClick={() => setIsOpen(false)} className="close-btn">&times;</button>
                </div>
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                            {msg.parts[0].text}
                        </div>
                    ))}
                    {isLoading && <div className="message bot-message"><em>Digitando...</em></div>}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSend} className="chatbot-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pergunte sobre reciclagem..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>➤</button>
                </form>
            </div>
            <button onClick={() => setIsOpen(prev => !prev)} className="chatbot-toggle-button">
                <ChatbotIcon />
            </button>
        </div>
    );
}
// --- Fim do Componente Chatbot ---


const Form_Denuncia = () => {
  const [formData, setFormData] = useState({
    zona: '',
    bairro: '',
    rua: '',
    tipo_residuo: '',
    quantidade: '',
    descricao: '',
    anexo_path: ''
  });

  const [tiposResiduo, setTiposResiduo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    const carregarTiposResiduo = async () => {
      try {
        const tipos = await tipoResiduoService.getAllTiposResiduo();
        setTiposResiduo(tipos);
      } catch (error) {
        console.error('Erro ao carregar tipos de resíduo:', error);
        setTiposResiduo([
          { id: 1, nome: 'Resíduos Domiciliares', descricao: 'Provenientes de residências (restos de alimentos, papéis, plásticos, etc.)' },
          { id: 2, nome: 'Resíduos de Limpeza Urbana', descricao: 'Gerados pela limpeza de ruas, praças e logradouros' },
          { id: 3, nome: 'Resíduos Industriais', descricao: 'Resultantes de atividades industriais' },
          { id: 4, nome: 'Resíduos de Serviços de Saúde (RSS)', descricao: 'Gerados em hospitais, clínicas, etc. (agulhas, luvas, etc.)' },
          { id: 5, nome: 'Resíduos de Construção Civil', descricao: 'Entulho, materiais de demolição, etc.' },
          { id: 6, nome: 'Resíduos Radioativos', descricao: 'Provenientes de fontes radioativas, como urânio' },
          { id: 7, nome: 'Resíduos Agrícolas', descricao: 'Provenientes de atividades agrícolas, como restos de colheita' }
        ]);
      }
    };
    carregarTiposResiduo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
      anexo_path: name === 'anexo' && files ? files[0].name : formData.anexo_path
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const dadosParaEnviar = { ...formData };
      await denunciaService.createDenuncia(dadosParaEnviar);
      setMensagem({
        texto: 'Denúncia enviada com sucesso! Agradecemos sua contribuição.',
        tipo: 'sucesso'
      });
      setFormData({
        zona: '', bairro: '', rua: '', tipo_residuo: '',
        quantidade: '', descricao: '', anexo_path: ''
      });
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error);
      setMensagem({
        texto: `Erro ao enviar denúncia: ${error.message}`,
        tipo: 'erro'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="formulario-container">
        <div className="barra-laranja"></div>
        <div className="titulo-container">
          <h2 className="titulo-principal">
            DENÚNCIAS: INFORME IRREGULARIDADES DE DESCARTE INDEVIDO DE RESÍDUOS
          </h2>
        </div>
        {mensagem.texto && (
          <div className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="formulario-interno">
            <h3 className="secao-titulo">Localização do descarte indevido</h3>
            <div className="campos-row">
              <div className="campo-grupo">
                <label className="campo-label">Zona:</label>
                <select name="zona" value={formData.zona} onChange={handleChange} className="campo-input" required>
                  <option value="">Selecione uma zona</option>
                  <option value="Norte">Norte</option>
                  <option value="Sul">Sul</option>
                  <option value="Leste">Leste</option>
                  <option value="Oeste">Oeste</option>
                  <option value="Centro">Centro</option>
                </select>
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Bairro:</label>
                <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className="campo-input" required placeholder='Ex: Centro, Flores, etc.'/>
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Rua:</label>
                <input type="text" name="rua" value={formData.rua} onChange={handleChange} className="campo-input" required placeholder='Ex: Rua das Flores, Av. Brasil, etc.'/>
              </div>
            </div>
            <h3 className="secao-titulo">Detalhes da denúncia</h3>
            <div className="campos-row">
              <div className="campo-grupo">
                <label className="campo-label">Tipo de resíduo:</label>
                <select name="tipo_residuo" value={formData.tipo_residuo} onChange={handleChange} className="campo-input" required>
                  <option value="">Selecione um tipo de resíduo</option>
                  {tiposResiduo.map(tipo => (
                    <option key={tipo.id} value={tipo.nome}>{tipo.nome}: {tipo.descricao}</option>
                  ))}
                </select>
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Imagem da Denúncia:</label>
                <input type="file" name="anexo" onChange={handleChange} className="campo-input"/>
              </div>
            </div>
            <div className="campo-grupo">
              <label className="campo-label">Descrição da Denúncia:</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={4} className="campo-textarea" required placeholder='Descreva a situação...'></textarea>
            </div>
          </div>
          <div className="botao-container">
            <button type="submit" className="botao-enviar" disabled={isLoading}>
              {isLoading ? 'ENVIANDO...' : 'ENVIAR'}
            </button>
          </div>
        </form>
        <br/>
        <Chatbot />
      </div>
    </>
  );
};

export default Form_Denuncia;

