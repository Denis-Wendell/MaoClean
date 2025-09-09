const { pool } = require('../config/db');

class Denuncia {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM denuncias ORDER BY data_denuncia DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM denuncias WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByZona(zona) {
    try {
      const [rows] = await pool.query('SELECT * FROM denuncias WHERE zona = ? ORDER BY data_denuncia DESC', [zona]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findByStatus(status) {
    try {
      const [rows] = await pool.query('SELECT * FROM denuncias WHERE status = ? ORDER BY data_denuncia DESC', [status]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(denunciaData) {
    try {
      const { zona, bairro, rua, tipo_residuo, quantidade, descricao, anexo_path } = denunciaData;
      
      const [result] = await pool.query(
        'INSERT INTO denuncias (zona, bairro, rua, tipo_residuo, quantidade, descricao, anexo_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [zona, bairro, rua, tipo_residuo, quantidade, descricao, anexo_path || null]
      );
      
      const id = result.insertId;
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async update(id, denunciaData) {
    try {
      const { zona, bairro, rua, tipo_residuo, quantidade, descricao, anexo_path, status } = denunciaData;
      
      await pool.query(
        'UPDATE denuncias SET zona = ?, bairro = ?, rua = ?, tipo_residuo = ?, quantidade = ?, descricao = ?, anexo_path = ?, status = ? WHERE id = ?',
        [zona, bairro, rua, tipo_residuo, quantidade, descricao, anexo_path, status, id]
      );
      
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM denuncias WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Denuncia;