import { notFound } from "next/navigation";
import { getConfiguracaoPorIdDB } from "@/componentes/bd/usecases/configuracaoUseCases";
import { getGamePorIdDB } from "@/componentes/bd/usecases/gameUseCases";
import Loading from "@/componentes/comuns/Loading";
import { Suspense } from "react";
import Link from "next/link";

const ConfiguracaoDetalhePage = async ({ params }) => {
  let configuracao = null;
  let game = null;

  try {
    configuracao = await getConfiguracaoPorIdDB(params.configuracaoCodigo);
    game = await getGamePorIdDB(configuracao.game_id);
  } catch (err) {
    return notFound();
  }

  // Função para formatar o JSON da configuração para exibição legível
  const formatarConfiguracao = (config) => {
    return Object.entries(config).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
    ));
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-dark text-white text-center">
              <h5>Detalhes da Configuração</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={game.url_image}
                    alt={`Imagem do jogo ${game.nome}`}
                    className="img-fluid rounded mb-3"
                  />
                  <h4>{game.nome}</h4>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <strong>Preço Final:</strong> R$ {configuracao.custo_final}
                  </p>
                  <p className="card-text">
                    <strong>Data de Cadastro:</strong>{" "}
                    {new Date(configuracao.data).toLocaleDateString()}
                  </p>
                  <h6>Configuração Gerada:</h6>
                  <ul className="list-unstyled">
                    {formatarConfiguracao(configuracao.configuracao)}
                  </ul>
                </div>
              </div>
              <p className="card-text text-center">
                <strong>Desempenho Esperado</strong>
                <br />
                {configuracao.desempenho_esperado}
              </p>
            </div>
            <div className="card-footer text-center">
              <Link className="btn btn-outline-success" href="/">
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoDetalhePage;
