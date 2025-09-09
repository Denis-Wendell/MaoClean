import api from './api';

// Serviço para gerenciar denúncias
const denunciaService = {
  // Buscar todas as denúncias
  getAllDenuncias: async () => {
    try {
      const response = await api.get('/denuncias');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar denúncias:', error);
      throw error;
    }
  },

  // Buscar uma denúncia específica por ID
  getDenunciaById: async (id) => {
    try {
      const response = await api.get(`/denuncias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar denúncia ${id}:`, error);
      throw error;
    }
  },

  // Criar uma nova denúncia
  createDenuncia: async (denunciaData) => {
    try {
      // Se houver um arquivo anexo, seria necessário lidar com upload
      // Neste exemplo, estamos apenas enviando o nome do arquivo
      const dadosParaEnviar = {
        zona: denunciaData.zona,
        bairro: denunciaData.bairro,
        rua: denunciaData.rua,
        tipo_residuo: denunciaData.tipo_residuo,
        quantidade: denunciaData.quantidade,
        descricao: denunciaData.descricao,
        anexo_path: denunciaData.anexo_path || null
      };

      const response = await api.post('/denuncias', dadosParaEnviar);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar denúncia:', error);
      throw error;
    }
  },

  // Atualizar uma denúncia existente
  updateDenuncia: async (id, denunciaData) => {
    try {
      const response = await api.put(`/denuncias/${id}`, denunciaData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar denúncia ${id}:`, error);
      throw error;
    }
  },

  // Excluir uma denúncia
  deleteDenuncia: async (id) => {
    try {
      const response = await api.delete(`/denuncias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir denúncia ${id}:`, error);
      throw error;
    }
  },

  // Buscar denúncias por zona
  getDenunciasByZona: async (zona) => {
    try {
      const response = await api.get(`/denuncias/zona/${zona}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar denúncias da zona ${zona}:`, error);
      throw error;
    }
  },

  // Buscar denúncias por status
  getDenunciasByStatus: async (status) => {
    try {
      const response = await api.get(`/denuncias/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar denúncias com status ${status}:`, error);
      throw error;
    }
  }
};

export default denunciaService;