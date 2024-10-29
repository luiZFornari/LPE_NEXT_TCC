const { pool } = require("../config");
const Configuracao = require("../entities/Configuracao");

const getConfiguracoesDB = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT c.id, c.desempenho_esperado, c.custo_final, c.configuracao::json, c.game_id, c.usuario_id , c.data
      FROM configuracoes c
      ORDER BY c.id
    `);
    return rows.map(
      (configuracao) =>
        new Configuracao(
          configuracao.id,
          configuracao.desempenho_esperado,
          configuracao.custo_final,
          configuracao.configuracao,
          configuracao.game_id,
          configuracao.usuario_id,
          configuracao.data
        )
    );
  } catch (err) {
    throw "Erro ao buscar configurações: " + err;
  }
};

const addConfiguracaoDB = async (objeto) => {
  try {
    const {
      desempenho_esperado,
      custo_final,
      configuracao,
      game_id,
      usuario_id,
      data,
    } = objeto;
    await pool.query(
      `INSERT INTO configuracoes (desempenho_esperado, custo_final, configuracao, game_id, usuario_id, data)
      VALUES ($1, $2, $3, $4, (SELECT id FROM usuarios WHERE email = $5), $6)`,
      [
        desempenho_esperado,
        custo_final,
        configuracao,
        game_id,
        usuario_id,
        data,
      ]
    );
  } catch (err) {
    throw "Erro ao inserir a configuração: " + err;
  }
};

const updateConfiguracaoDB = async (objeto) => {
  try {
    const {
      id,
      desempenho_esperado,
      custo_final,
      configuracao,
      game_id,
      usuario_id,
      data,
    } = objeto;
    const results = await pool.query(
      `UPDATE configuracoes SET desempenho_esperado = $2, 
        custo_final = $3, configuracao = $4, game_id = $5, usuario_id = $6 , data = $7 WHERE id = $1`,
      [
        id,
        desempenho_esperado,
        custo_final,
        configuracao,
        game_id,
        usuario_id,
        data,
      ]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
    }
  } catch (err) {
    throw "Erro ao alterar a configuração: " + err;
  }
};

const deleteConfiguracaoDB = async (id) => {
  try {
    const results = await pool.query(
      `DELETE FROM configuracoes WHERE id = $1`,
      [id]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o id ${id} para ser removido`;
    } else {
      return "Configuração removida com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a configuração: " + err;
  }
};

const getConfiguracaoPorIdDB = async (id) => {
  try {
    const results = await pool.query(
      `SELECT 
        c.id, 
        c.desempenho_esperado, 
        c.custo_final, 
        c.configuracao::json, 
        c.game_id, 
        g.id AS game_id, 
        c.usuario_id, 
        c.data
      FROM 
        configuracoes c
      JOIN 
        games g ON c.game_id = g.id
      WHERE 
        c.id = $1;`,
      [id]
    );

    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o id ${id}`;
    } else {
      const configuracao = results.rows[0];
      // Retorne a instância da configuração com os valores de game_nome e usuario_nome7
      console.log(configuracao);
      return new Configuracao(
        configuracao.id,
        configuracao.desempenho_esperado,
        configuracao.custo_final,
        configuracao.configuracao,
        configuracao.game_id,
        configuracao.usuario_id,
        configuracao.data
      );
    }
  } catch (err) {
    throw "Erro ao recuperar a configuração: " + err;
  }
};

const getConfiguracoesPorUsuarioDB = async (usuario_email) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
        c.id, 
        c.desempenho_esperado, 
        c.custo_final, 
        c.configuracao::json, 
        c.game_id, 
        c.usuario_id, 
        c.data
        FROM configuracoes c
        WHERE c.usuario_id = (SELECT id FROM usuarios WHERE email = $1 )
`,
      [usuario_email]
    );
    return rows.map(
      (configuracao) =>
        new Configuracao(
          configuracao.id,
          configuracao.desempenho_esperado,
          configuracao.custo_final,
          configuracao.configuracao,
          configuracao.game_id,
          configuracao.usuario_id,
          configuracao.data
        )
    );
  } catch (err) {
    throw "Erro ao buscar configurações do usuário: " + err;
  }
};

module.exports = {
  getConfiguracoesDB,
  addConfiguracaoDB,
  updateConfiguracaoDB,
  deleteConfiguracaoDB,
  getConfiguracaoPorIdDB,
  getConfiguracoesPorUsuarioDB,
};
