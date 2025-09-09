const express = require('express');
const router = express.Router();
const Denuncia = require('../models/Denuncia');

// GET - Buscar todas as denúncias
router.get('/', async (req, res) => {
  try {
    const denuncias = await Denuncia.findAll();
    res.json(denuncias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar denúncias', error: error.message });
  }
});

// GET - Buscar uma denúncia específica por ID
router.get('/:id', async (req, res) => {
  try {
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }
    res.json(denuncia);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar denúncia', error: error.message });
  }
});

// POST - Criar uma nova denúncia
router.post('/', async (req, res) => {
  try {
    const denunciaCriada = await Denuncia.create(req.body);
    res.status(201).json(denunciaCriada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar denúncia', error: error.message });
  }
});

// PUT - Atualizar uma denúncia existente
router.put('/:id', async (req, res) => {
  try {
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }
    
    const denunciaAtualizada = await Denuncia.update(req.params.id, req.body);
    res.json(denunciaAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar denúncia', error: error.message });
  }
});

// DELETE - Excluir uma denúncia
router.delete('/:id', async (req, res) => {
  try {
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }
    
    const sucesso = await Denuncia.delete(req.params.id);
    if (sucesso) {
      res.json({ message: 'Denúncia excluída com sucesso' });
    } else {
      res.status(500).json({ message: 'Erro ao excluir denúncia' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir denúncia', error: error.message });
  }
});

// GET - Buscar denúncias por zona
router.get('/zona/:zona', async (req, res) => {
  try {
    const denuncias = await Denuncia.findByZona(req.params.zona);
    res.json(denuncias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar denúncias por zona', error: error.message });
  }
});

// GET - Buscar denúncias por status
router.get('/status/:status', async (req, res) => {
  try {
    const denuncias = await Denuncia.findByStatus(req.params.status);
    res.json(denuncias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar denúncias por status', error: error.message });
  }
});

module.exports = router;