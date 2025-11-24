import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api', // Ajuste esta porta conforme a configuração do seu servidor backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;