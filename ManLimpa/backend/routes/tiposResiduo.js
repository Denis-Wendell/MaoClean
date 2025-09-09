const express = require('express');
const router = express.Router();
const TipoResiduo = require('../models/TipoResiduo');

// GET - Buscar todos os tipos de resíduo
router.get('/', async (req, res) => {
  try {
    const tiposResiduo = await TipoResiduo.findAll();
    res.json(tiposResiduo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tipos de resíduo', error: error.message });
  }
});

// GET - Buscar um tipo de resíduo específico por ID
router.get('/:id', async (req, res) => {
  try {
    const tipoResiduo = await TipoResiduo.findById(req.params.id);
    if (!tipoResiduo) {
      return res.status(404).json({ message: 'Tipo de resíduo não encontrado' });
    }
    res.json(tipoResiduo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tipo de resíduo', error: error.message });
  }
});

// POST - Criar um novo tipo de resíduo
router.post('/', async (req, res) => {
  try {
    const tipoResiduoCriado = await TipoResiduo.create(req.body);
    res.status(201).json(tipoResiduoCriado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar tipo de resíduo', error: error.message });
  }
});

// PUT - Atualizar um tipo de resíduo existente
router.put('/:id', async (req, res) => {
  try {
    const tipoResiduo = await TipoResiduo.findById(req.params.id);
    if (!tipoResiduo) {
      return res.status(404).json({ message: 'Tipo de resíduo não encontrado' });
    }
    
    const tipoResiduoAtualizado = await TipoResiduo.update(req.params.id, req.body);
    res.json(tipoResiduoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar tipo de resíduo', error: error.message });
  }
});

// DELETE - Excluir um tipo de resíduo
router.delete('/:id', async (req, res) => {
  try {
    const tipoResiduo = await TipoResiduo.findById(req.params.id);
    if (!tipoResiduo) {
      return res.status(404).json({ message: 'Tipo de resíduo não encontrado' });
    }
    
    const sucesso = await TipoResiduo.delete(req.params.id);
    if (sucesso) {
      res.json({ message: 'Tipo de resíduo excluído com sucesso' });
    } else {
      res.status(500).json({ message: 'Erro ao excluir tipo de resíduo' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tipo de resíduo', error: error.message });
  }
});

module.exports = router;