require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/db');
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');
// NOVO: Importa a biblioteca auxiliar para o Fulfillment
const { WebhookClient } = require('dialogflow-fulfillment');

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
if (!process.env.GOOGLE_PROJECT_ID) {
    console.error("ERRO: A variável de ambiente GOOGLE_PROJECT_ID não foi encontrada no arquivo .env");
    process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error("ERRO: A variável de ambiente GOOGLE_APPLICATION_CREDENTIALS não foi encontrada no arquivo .env");
    process.exit(1);
}

const projectId = process.env.GOOGLE_PROJECT_ID;
// Mantemos o sessionClient para as requisições que vêm do frontend
const sessionClient = new dialogflow.SessionsClient();
// --- FIM DA CONFIGURAÇÃO DO DIALOGFLOW ---


// Rotas
app.use('/api/denuncias', denunciasRoutes);
app.use('/api/tipos-residuo', tiposResiduoRoutes);

// Rota do Chatbot ATUALIZADA para lidar com o Frontend E com o Webhook do Dialogflow
app.post('/api/chatbot', async (req, res) => {

  // Lógica para o Webhook do Dialogflow (Fulfillment)
  // O Dialogflow envia um corpo de requisição com a propriedade 'queryResult'
  if (req.body.queryResult) {
    console.log('>> Requisição recebida do Webhook do Dialogflow');
    
    const agent = new WebhookClient({ request: req, response: res });

    // Função que será chamada quando a intenção 'EncontrarPontoColeta - custom' for acionada
    function encontrarPontoColeta(agent) {
        const material = agent.parameters['tipo-residuo'];
        const bairro = agent.parameters['geo-city'];

        // AQUI VOCÊ COLOCARIA A LÓGICA PARA BUSCAR NO SEU BANCO DE DADOS
        // Por enquanto, vamos usar uma resposta de exemplo:
        const enderecoDoBanco = `Supermercado Teste na Av. Djalma Batista, bairro ${bairro}`;

        agent.add(`Ótima notícia! Encontrei um ponto de coleta para ${material} no bairro ${bairro}: ${enderecoDoBanco}.`);
    }

    // Mapeia as intenções do Dialogflow para as funções do seu código
    let intentMap = new Map();
    // O nome aqui deve ser EXATAMENTE o nome da sua intenção no Dialogflow
    intentMap.set('EncontrarPontoColeta - custom', encontrarPontoColeta); 
    agent.handleRequest(intentMap);

  } else {
    // Lógica para requisições que vêm do seu Frontend
    console.log('>> Requisição recebida do cliente Frontend');
    
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
        const result = responses[0].queryResult;
        
        res.json({ 
            reply: result.fulfillmentText,
            sessionId: sessionId 
        });

    } catch (error) {
        console.error('ERRO na API do Dialogflow:', error);
        res.status(500).json({ error: 'Desculpe, não consegui processar sua mensagem.' });
    }
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