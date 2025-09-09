// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Crie um arquivo CSS para estilizar

function Chatbot() {
    // O estado agora guarda o objeto completo da mensagem para o histórico do Gemini
    const [messages, setMessages] = useState([
        { role: 'model', parts: [{ text: 'Olá! Sou o RecicloBot. Como posso te ajudar hoje?' }] }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Efeito para rolar para a última mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', parts: [{ text: input }] };
        setIsLoading(true);
        setInput('');
        setMessages(prev => [...prev, userMessage]); // Mostra a mensagem do usuário imediatamente

        try {
            // Prepara o histórico para enviar ao backend
            // O Gemini espera um formato específico, por isso filtramos a mensagem inicial
            const history = messages.filter(m => m.role !== 'model' || m.parts[0].text.startsWith('Olá!') === false);

            const response = await axios.post('http://localhost:3001/api/chatbot', {
                message: input,
                history: history
            });

            const botMessage = { role: 'model', parts: [{ text: response.data.reply }] };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { role: 'model', parts: [{ text: 'Ops, algo deu errado. Tente novamente.' }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
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
                <button type="submit" disabled={isLoading}>Enviar</button>
            </form>
        </div>
    );
}

export default Chatbot;