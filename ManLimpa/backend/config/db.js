const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com o banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Criação do pool de conexões
const pool = mysql.createPool(dbConfig);

// Teste de conexão ao iniciar o servidor
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o MySQL estabelecida com sucesso!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};