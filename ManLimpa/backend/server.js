require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Garante que a conexão com o banco (pool) é importada para fazer consultas
const { testConnection, pool } = require('./config/db'); 
const OpenAI = require('openai');

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

// --- CONFIGURAÇÃO DA OPENAI ---
if (!process.env.OPENAI_API_KEY) {
    console.error("ERRO: A variável de ambiente OPENAI_API_KEY não foi encontrada no arquivo .env");
    process.exit(1);
}
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// A instrução base para o bot, agora mais organizada
let systemInstruction = `
    # PERFIL E OBJETIVO
    - Você é o "RecicloBot", um assistente virtual amigável e especialista do site "Mao Clean".
    - Sua missão é ajudar os usuários com dúvidas sobre descarte e coleta de resíduos recicláveis na cidade de Manaus, Amazonas.

    # REGRAS PRINCIPAIS
    1.  **USE A LISTA DE DADOS:** Responda a perguntas sobre locais de coleta usando **EXCLUSIVAMENTE** a lista de "Pontos de Coleta Conhecidos" fornecida no final deste prompt. Não invente informações ou endereços.
    2.  **SEJA PRECISO:** Se a lista não contiver um ponto de coleta para o material ou bairro solicitado, informe claramente que não encontrou um local com essas especificações.
    3.  **MANTENHA O FOCO:** Suas respostas devem ser estritamente sobre reciclagem, sustentabilidade, pontos de coleta e meio ambiente.
    4.  **LIDAR COM PERGUNTAS FORA DO TEMA:** Se o usuário perguntar sobre qualquer outro assunto (esportes, política, etc.), recuse educadamente com uma mensagem como: "Desculpe, só posso ajudar com questões relacionadas à reciclagem e ao descarte correto de resíduos."

    # TOM DE VOZ
    - Amigável
    - Didático
    - Objetivo
`;

// Função para carregar os pontos de coleta e injetar nas instruções
async function initializeSystemPrompt() {
    try {
        console.log('Carregando pontos de coleta do banco de dados...');
        const [rows] = await pool.query('SELECT * FROM pontos_coleta');

        if (rows.length > 0) {
            const pointsList = rows.map(p =>
                `- Nome: ${p.nome}, Bairro: ${p.bairro}, Endereço: ${p.endereco}, Aceita: ${p.tipos_residuos_aceitos}`
            ).join('\n');

            systemInstruction += `\n\n### Pontos de Coleta Conhecidos:\n${pointsList}`;
            console.log('Pontos de coleta carregados e adicionados às instruções do sistema com sucesso!');
        } else {
            console.warn('AVISO: Nenhum ponto de coleta encontrado no banco de dados.');
        }
    } catch (error) {
        console.error("ERRO ao carregar pontos de coleta do banco de dados:", error);
    }
}

// Inicia a função ao ligar o servidor
initializeSystemPrompt();
// --- FIM DA CONFIGURAÇÃO DA OPENAI ---


// Rotas
app.use('/api/denuncias', denunciasRoutes);
app.use('/api/tipos-residuo', tiposResiduoRoutes);

// Rota do Chatbot atualizada para a OPENAI
app.post('/api/chatbot', async (req, res) => {
    try {
        const { message, history } = req.body;

        const messages = [
            { role: "system", content: systemInstruction },
            ...(history || []).map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.parts[0].text
            })),
            { role: "user", content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 250,
        });

        const reply = completion.choices[0].message.content;

        res.json({ reply: reply });

    } catch (error) {
        console.error('ERRO na API da OpenAI:', error);
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

