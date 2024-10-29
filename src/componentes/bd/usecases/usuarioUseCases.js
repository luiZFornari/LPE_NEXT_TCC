const { pool } = require("../config");
const Usuario = require("../entities/Usuario");

const autenticaUsuarioDB = async (objeto) => {
  try {
    const { email, senha } = objeto;
    console.log("Email: " + email + " Senha: " + senha);
    const results = await pool.query(
      `SELECT id, email, tipo, telefone, nome FROM usuarios 
            WHERE email = $1 AND senha = $2`,
      [email, senha] // Considere usar uma função de hash aqui
    );
    if (results.rowCount == 0) {
      throw "Usuário ou senha inválidos";
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.id,
      usuario.email,
      usuario.tipo,
      usuario.telefone,
      usuario.nome
    );
  } catch (err) {
    throw "Erro ao autenticar o usuário: " + err;
  }
};

const getUsuarioPorIdDB = async (id) => {
  try {
    const results = await pool.query(
      `SELECT id, nome FROM usuarios WHERE id = $1`,
      [id]
    );
    if (results.rowCount == 0) {
      throw "Usuário não encontrado";
    }
    const usuario = results.rows[0];
    return new Usuario(usuario.id, null, null, null, usuario.nome);
  } catch (err) {
    throw "Erro ao obter o usuário: " + err;
  }
};

const getUsuarioPorEmailDB = async (objeto) => {
  try {
    const { email } = objeto;

    if (!email) {
      throw new Error("Email não fornecido.");
    }

    const results = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );

    if (results.rowCount === 0) {
      throw new Error("Usuário não encontrado.");
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.id,
      usuario.email,
      usuario.tipo,
      usuario.telefone,
      usuario.nome
    );
  } catch (err) {
    throw new Error(`Erro ao obter o usuário: ${err.message || err}`);
  }
};

const addUsuarioDB = async (objeto) => {
  try {
    const { email, senha, tipo, telefone, nome } = objeto;
    const results = await pool.query(
      `INSERT INTO usuarios (email, senha, tipo, telefone, nome) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [email, senha, tipo, telefone, nome]
    );
    if (results.rowCount == 0) {
      throw "Erro ao adicionar o usuário";
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.id,
      usuario.email,
      usuario.tipo,
      usuario.telefone,
      usuario.nome
    );
  } catch (err) {
    throw "Erro ao adicionar o usuário: " + err;
  }
};

const alterarUsuarioDB = async (objeto) => {
  try {
    const { id, email, senha, tipo, telefone, nome } = objeto;
    console.log(objeto);
    const results = await pool.query(
      `UPDATE usuarios SET email = $1, senha = $2, tipo = $3, telefone = $4, nome = $5 WHERE id = $6`,
      [email, senha, tipo, telefone, nome, id]
    );
    if (results.rowCount == 0) {
      throw "Erro ao alterar o usuário";
    }
    const usuario = results.rows[0];
    return new Usuario(
      usuario.id,
      usuario.email,
      usuario.tipo,
      usuario.telefone,
      usuario.nome
    );
  } catch (err) {
    throw "Erro ao alterar o usuário: " + err;
  }
};

module.exports = {
  autenticaUsuarioDB,
  getUsuarioPorIdDB,
  addUsuarioDB,
  alterarUsuarioDB,
  getUsuarioPorEmailDB,
};
