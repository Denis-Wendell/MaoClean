const { pool } = require('../config/db');

class TipoResiduo {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM tipos_residuo ORDER BY nome');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM tipos_residuo WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(tipoResiduoData) {
    try {
      const { nome, descricao } = tipoResiduoData;
      
      const [result] = await pool.query(
        'INSERT INTO tipos_residuo (nome, descricao) VALUES (?, ?)',
        [nome, descricao]
      );
      
      const id = result.insertId;
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async update(id, tipoResiduoData) {
    try {
      const { nome, descricao } = tipoResiduoData;
      
      await pool.query(
        'UPDATE tipos_residuo SET nome = ?, descricao = ? WHERE id = ?',
        [nome, descricao, id]
      );
      
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM tipos_residuo WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TipoResiduo;