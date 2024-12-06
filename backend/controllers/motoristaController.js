const pool = require("../config/db");

// Listar todos os motoristas
const getMotoristas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM motoristas ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter motorista por ID
const getMotoristaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM motoristas WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo motorista
const createMotorista = async (req, res) => {
  const { nome, cnh, validade_cnh, telefone, endereco } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO motoristas (nome, cnh, validade_cnh, telefone, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, cnh, validade_cnh, telefone, endereco]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar motorista
const updateMotorista = async (req, res) => {
  const { id } = req.params;
  const { nome, cnh, validade_cnh, telefone, endereco } = req.body;
  try {
    const result = await pool.query(
      "UPDATE motoristas SET nome = $1, cnh = $2, validade_cnh = $3, telefone = $4, endereco = $5 WHERE id = $6 RETURNING *",
      [nome, cnh, validade_cnh, telefone, endereco, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir motorista
const deleteMotorista = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM motoristas WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }
    res.status(200).json({ message: "Motorista excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMotoristas,
  getMotoristaById,
  createMotorista,
  updateMotorista,
  deleteMotorista,
};
