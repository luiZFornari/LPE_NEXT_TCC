"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  InputGroup,
  Carousel,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Loading from "./Loading";

const FormularioRecomendador = ({ games }) => {
  const [game, setGame] = useState(games.length > 0 ? games[0].id : "");
  const [gameIdSteam, setGameIDSteam] = useState(games[0].id_steam);
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (games.length > 0 && !game) {
      setGame(games[0].id); // Definindo o primeiro jogo como o selecionado inicialmente
    }
  }, [games]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(budget) <= 0) {
      alert("Por favor, insira um orçamento válido.");
      return;
    }

    setIsLoading(false);

    try {
      setIsLoading(true);
      setGameIDSteam(games.find((g) => g.id === game)?.id_steam);
      console.log("game:" + gameIdSteam, "budget:" + budget);
      const response = await fetch(
        "https://luizfornari2.app.n8n.cloud/webhook-test/HardwarIA_API",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            game,
            budget,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao obter recomendação");
      }

      const data = await response.json();

      router.push("/pages/resultado");
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      alert(
        "Ocorreu um erro ao obter a recomendação. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center bg-dark text-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-4">
            <h2 className="text-white">Recomendador de PC</h2>
            <p className="text-white">
              Preencha os detalhes abaixo para obter sua recomendação
              personalizada
            </p>
          </div>
          <Form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
            {isLoading && (
              <div className="text-center mb-3">
                <Spinner animation="border" role="status" variant="primary" />
              </div>
            )}
            <Form.Group>
              <Form.Label>Selecione o jogo</Form.Label>
              <Carousel
                activeIndex={games.findIndex((g) => g.id === game)}
                onSelect={(selectedIndex) => setGame(games[selectedIndex].id)}
                interval={null}
                className="mb-4"
              >
                {games.map((gameOption) => (
                  <Carousel.Item key={gameOption.id}>
                    <img
                      className="d-block w-100"
                      src={gameOption.image}
                      alt={gameOption.name}
                    />
                    <Carousel.Caption>
                      <h5 className="text-dark bg-light p-1 rounded">
                        {gameOption.name}
                      </h5>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Orçamento</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  min="0"
                  required
                  placeholder="Seu orçamento"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              variant="primary"
              disabled={!game || parseFloat(budget) <= 0 || isLoading}
            >
              {isLoading ? "Carregando..." : "Recomendar"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioRecomendador;
