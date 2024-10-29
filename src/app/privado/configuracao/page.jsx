import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";
import {
  getConfiguracoesDB,
  deleteConfiguracaoDB,
  getConfiguracoesPorUsuarioDB,
} from "@/componentes/bd/usecases/configuracaoUseCases";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

import Table from "react-bootstrap/Table";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { getGamesDB } from "@/componentes/bd/usecases/gameUseCases";

const deleteConfiguracao = async (id) => {
  "use server";
  try {
    await deleteConfiguracaoDB(id);
  } catch (err) {
    console.log(err);
    throw new Error("Erro: " + err);
  }
  revalidatePath("/privado/configuracao/");
  redirect("/privado/configuracao/");
};

export default async function Configuracao() {
  revalidatePath("/privado/configuracao/");
  let configuracoes = null;
  let games = null;

  // acessa a sessão
  const session = await getServerSession(authOptions);
  console.log(session);

  // se não tem sessão válida redireciona para a tela de login
  if (!session) {
    redirect("/api/auth/signin");
  }

  try {
    configuracoes = await getConfiguracoesPorUsuarioDB(session.user.email);
    games = await getGamesDB();
  } catch (err) {
    console.log(err);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Container style={{ padding: "20px", maxWidth: "1200px" }}>
        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h1>Configurações</h1>
            <Link href={`/privado/configuracao/${0}/formulario`}>
              <Button variant="primary" size="lg">
                Nova Configuração
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Table responsive hover className="text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Ações</th>
                    <th>ID</th>
                    <th>Desempenho Esperado</th>
                    <th>Custo Final</th>
                    <th>Configuração</th>
                    <th>Game</th>
                    <th>Usuário ID</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {configuracoes && configuracoes.length > 0 ? (
                    configuracoes.map((configuracao) => (
                      <tr key={configuracao.id}>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              href={`/privado/configuracao/${configuracao.id}/formulario`}
                            >
                              <Button variant="info" className="me-1">
                                <i className="bi bi-pencil-square" />
                              </Button>
                            </Link>
                            <form
                              action={deleteConfiguracao.bind(
                                null,
                                configuracao.id
                              )}
                              className="d-inline"
                            >
                              <Button variant="danger" type="submit">
                                <i className="bi bi-trash" />
                              </Button>
                            </form>
                          </div>
                        </td>
                        <td>{configuracao.id}</td>
                        <td>{configuracao.desempenho_esperado}</td>
                        <td>{configuracao.custo_final}</td>
                        <td>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-${configuracao.id}`}>
                                <pre>
                                  {JSON.stringify(
                                    configuracao.configuracao,
                                    null,
                                    2
                                  )}
                                </pre>
                              </Tooltip>
                            }
                          >
                            <span>
                              {Object.entries(configuracao.configuracao)
                                .slice(0, 2) // Mostra apenas os primeiros dois pares
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                              ...
                            </span>
                          </OverlayTrigger>
                        </td>
                        <td>
                          {games.find((g) => g.id === configuracao.game_id)
                            ?.nome || "Jogo não encontrado"}
                        </td>
                        <td>{configuracao.usuario_id}</td>
                        <td>
                          {new Date(configuracao.data).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">
                        <div className="alert alert-warning" role="alert">
                          Nenhuma configuração encontrada! Comece agora mesmo!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
}
