const { pool } = require("../config");
const Game = require("../entities/Game");

const getGamesDB = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM games ORDER BY nome`);
    return rows.map(
      (game) => new Game(game.id, game.nome, game.id_steam, game.url_image)
    );
  } catch (err) {
    throw "Erro: " + err;
  }
};

const deleteGameDB = async (id) => {
  try {
    const results = await pool.query(`DELETE FROM games WHERE id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o id ${id} para ser removido`;
    } else {
      return `Game com id ${id} removido com sucesso!`;
    }
  } catch (err) {
    throw "Erro ao remover o game: " + err;
  }
};

const addGameDB = async (objeto) => {
  try {
    const { nome, id_steam, url_image } = objeto;
    await pool.query(
      `INSERT INTO games (nome, id_steam, url_image) VALUES ($1, $2, $3)`,
      [nome, id_steam, url_image]
    );
  } catch (err) {
    throw "Erro ao inserir o game: " + err;
  }
};

const updateGameDB = async (objeto) => {
  try {
    const { id, nome, id_steam, url_image } = objeto;
    const results = await pool.query(
      `UPDATE games SET nome = $2, id_steam = $3, url_image = $4
        WHERE id = $1`,
      [id, nome, id_steam, url_image]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
    }
  } catch (err) {
    throw "Erro ao alterar o game: " + err;
  }
};

const getGamePorIdDB = async (id) => {
  try {
    const results = await pool.query(`SELECT * FROM games WHERE id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o id ${id}`;
    } else {
      const game = results.rows[0];
      return new Game(game.id, game.nome, game.id_steam, game.url_image);
    }
  } catch (err) {
    throw "Erro ao recuperar o game: " + err;
  }
};

module.exports = {
  getGamesDB,
  addGameDB,
  updateGameDB,
  deleteGameDB,
  getGamePorIdDB,
};
