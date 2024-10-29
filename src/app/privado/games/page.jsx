import Table from "react-bootstrap/Table";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  getGamesDB,
  deleteGameDB,
} from "@/componentes/bd/usecases/gameUseCases";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";

const deleteGame = async (id) => {
  "use server";
  try {
    await deleteGameDB(id);
  } catch (err) {
    console.log(err);
    throw new Error("Erro: " + err);
  }
  revalidatePath("/privado/games/");
  redirect("/privado/games/");
};

export default async function Games() {
  revalidatePath("/privado/games/");

  const games = await getGamesDB();

  return (
    <Suspense fallback={<Loading />}>
      <Container style={{ padding: "20px", maxWidth: "1200px" }}>
        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h1>Games</h1>
            <Link href={`/privado/games/${0}/formulario`}>
              <Button variant="primary" size="lg">
                Novo Game
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
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>ID Steam</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.id}>
                      <td>
                        <Link href={`/privado/games/${game.id}/formulario`}>
                          <Button variant="info" className="me-2">
                            <i className="bi bi-pencil-square" />
                          </Button>
                        </Link>
                        <form
                          action={deleteGame.bind(null, game.id)}
                          className="d-inline"
                        >
                          <Button variant="danger" type="submit">
                            <i className="bi bi-trash"></i>
                          </Button>
                        </form>
                      </td>
                      <td>{game.id}</td>
                      <td>
                        <img
                          src={game.url_image}
                          alt={game.nome}
                          style={{ width: "70px", borderRadius: "8px" }}
                        />
                      </td>
                      <td>{game.nome}</td>
                      <td>{game.id_steam}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
}
