require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/db');
const dialogflow = require('@google-cloud/dialogflow'); // Nova biblioteca
const { v4: uuidv4 } = require('uuid'); // Para gerar IDs de sessão únicos

// Importar rotas
const denunciasRoutes = require('./routes/denuncias');
const tiposResiduoRoutes = require('./routes/tiposResiduo');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Teste de conexão com o banco de dados
(async () => {
  await testConnection();
})();

// --- CONFIGURAÇÃO DO DIALOGFLOW ---
// Valida se as variáveis de ambiente necessárias foram configuradas
if (!process.env.GOOGLE_PROJECT_ID) {
    console.error("ERRO: A variável de ambiente GOOGLE_PROJECT_ID não foi encontrada no arquivo .env");
    process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error("ERRO: A variável de ambiente GOOGLE_APPLICATION_CREDENTIALS não foi encontrada no arquivo .env");
    process.exit(1);
}

const projectId = process.env.GOOGLE_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient();
// --- FIM DA CONFIGURAÇÃO DO DIALOGFLOW ---


// Rotas
app.use('/api/denuncias', denunciasRoutes);
app.use('/api/tipos-residuo', tiposResiduoRoutes);

// Rota do Chatbot atualizada para o Dialogflow
app.post('/api/chatbot', async (req, res) => {
    // Para o Dialogflow, cada conversa precisa de um ID de sessão único.
    // Vamos usar o que vem do front-end ou criar um novo.
    const sessionId = req.body.sessionId || uuidv4();
    const { message } = req.body;

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'pt-BR',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        console.log('Resposta do Dialogflow:', JSON.stringify(responses, null, 2));
        
        const result = responses[0].queryResult;
        
        // Retorna a resposta de texto e o ID da sessão para o front-end manter a conversa
        res.json({ 
            reply: result.fulfillmentText,
            sessionId: sessionId 
        });

    } catch (error) {
        console.error('ERRO na API do Dialogflow:', error);
        res.status(500).json({ error: 'Desculpe, não consegui processar sua mensagem.' });
    }
});


// Rota básica para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('API do ManLimpa está funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
