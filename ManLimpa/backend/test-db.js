const mysql = require('mysql2/promise');
require('dotenv').config();

// Configurações do banco de dados a partir do arquivo .env
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function testConnection() {
  let connection;
  try {
    // Tenta criar uma conexão com o banco de dados
    connection = await mysql.createConnection(dbConfig);

    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    console.log(`Conectado ao banco de dados '${dbConfig.database}' no host '${dbConfig.host}'.`);

    // Executa uma query simples para confirmar
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log('✅ Query de teste executada com sucesso. Resultado:', rows[0].solution);

  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:');
    if (error.code === 'ECONNREFUSED') {
      console.error('   -> Verifique se o servidor de banco de dados está rodando e acessível no host e porta configurados.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   -> Credenciais (usuário/senha) inválidas. Verifique seu arquivo .env.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error(`   -> O banco de dados '${dbConfig.database}' não existe. Verifique o nome no arquivo .env.`);
    } else {
      console.error('   ->', error.message);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexão com o banco de dados fechada.');
    }
  }
}

testConnection();
