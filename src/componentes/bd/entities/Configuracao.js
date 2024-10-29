class Configuracao {
  constructor(
    id,
    desempenho_esperado,
    custo_final,
    configuracao,
    game_id,
    usuario_id,
    data
  ) {
    this.id = id;
    this.desempenho_esperado = desempenho_esperado;
    this.custo_final = custo_final;
    this.configuracao = configuracao;
    this.game_id = game_id;
    this.usuario_id = usuario_id;
    this.data = data;
  }
}

module.exports = Configuracao;
