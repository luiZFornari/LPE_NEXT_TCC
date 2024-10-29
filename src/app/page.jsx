import { getConfiguracoesDB } from "@/componentes/bd/usecases/configuracaoUseCases";
import { getGamesDB } from "@/componentes/bd/usecases/gameUseCases";
import Link from "next/link";

export const revalidate = 60; // revalida a cada 60 segundos

export default async function Home() {
  const configuracoes = await getConfiguracoesDB();
  const games = await getGamesDB();

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 mb-3">Gerador de configurações usando IA</h1>
        <p className="lead">
          Encontre a configuração ideal para o seu computador usando
          Inteligência Artificial
        </p>
      </header>

      <section className="mb-5">
        <h2 className="text-center mb-4">Diferenciais</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 shadow-sm hover-shadow transition">
              <div className="card-body text-center">
                <i className="bi bi-robot display-4 mb-3 text-primary"></i>
                <h3 className="card-title h4">Inteligência Artificial</h3>
                <p className="card-text">
                  Utilizamos modelos de IA de ponta para analisar e recomendar
                  as melhores configurações de PC.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm hover-shadow transition">
              <div className="card-body text-center">
                <i className="bi bi-cpu display-4 mb-3 text-primary"></i>
                <h3 className="card-title h4">Componentes Atualizados</h3>
                <p className="card-text">
                  Nossa base de dados é constantemente atualizada com os últimos
                  lançamentos de hardware.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm hover-shadow transition">
              <div className="card-body text-center">
                <i className="bi bi-lightning-charge display-4 mb-3 text-primary"></i>
                <h3 className="card-title h4">Recomendações Rápidas</h3>
                <p className="card-text">
                  Obtenha recomendações personalizadas em segundos, economizando
                  seu tempo e esforço.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-8">
            <Link
              href={`/privado/configuracao/recomendador`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm hover-shadow transition">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <i className="bi bi-plus-circle display-3 mb-1 text-primary"></i>
                  <h2 className="card-title h4">Teste agora!</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-center mb-4">Configurações da Comunidade</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {configuracoes.map((objeto) => {
            const game = games.find((g) => g.id === objeto.game_id);
            return (
              <div key={objeto.codigo} className="col">
                <Link
                  href={`/${objeto.id}/detalhe`}
                  className="text-decoration-none"
                >
                  <div className="card h-100 shadow-sm hover-shadow transition">
                    {game && (
                      <img
                        src={game.url_image}
                        alt={game.nome}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h3 className="card-title h5 text-center">
                        {game ? game.nome : "Game não encontrado"}
                      </h3>
                      <p className="card-text text-muted">
                        <strong>Preço:</strong> R$ {objeto.custo_final}
                      </p>
                      <p className="card-text text-muted">
                        <strong>Data de criação:</strong>{" "}
                        {new Date(objeto.data).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
