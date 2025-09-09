import api from './api';

// Serviço para gerenciar tipos de resíduo
const tipoResiduoService = {
  // Buscar todos os tipos de resíduo
  getAllTiposResiduo: async () => {
    try {
      const response = await api.get('/tipos-residuo');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tipos de resíduo:', error);
      throw error;
    }
  },

  // Buscar um tipo de resíduo específico por ID
  getTipoResiduoById: async (id) => {
    try {
      const response = await api.get(`/tipos-residuo/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar tipo de resíduo ${id}:`, error);
      throw error;
    }
  },

  // Criar um novo tipo de resíduo
  createTipoResiduo: async (tipoResiduoData) => {
    try {
      const response = await api.post('/tipos-residuo', tipoResiduoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tipo de resíduo:', error);
      throw error;
    }
  },

  // Atualizar um tipo de resíduo existente
  updateTipoResiduo: async (id, tipoResiduoData) => {
    try {
      const response = await api.put(`/tipos-residuo/${id}`, tipoResiduoData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar tipo de resíduo ${id}:`, error);
      throw error;
    }
  },

  // Excluir um tipo de resíduo
  deleteTipoResiduo: async (id) => {
    try {
      const response = await api.delete(`/tipos-residuo/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir tipo de resíduo ${id}:`, error);
      throw error;
    }
  }
};

export default tipoResiduoService;