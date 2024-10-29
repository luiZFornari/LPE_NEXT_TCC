"use client";

import { useState } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";

const FormularioGame = ({ game, onSave }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: game.id || 0,
    nome: game.nome || "",
    id_steam: game.id_steam || "",
    url_image: game.url_image || "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSave(formData); // Chama a função onSave com os dados do formulário
    }
    setValidated(true);
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <div className="card-body">
          <h2
            className="text-center mb-4"
            style={{ fontWeight: "bold", color: "#333" }}
          >
            {formData.id === 0 ? "Adicionar Novo Jogo" : "Editar Jogo"}
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  value={formData.id}
                  readOnly
                  style={{ backgroundColor: "#e9ecef" }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="nome">
                <Form.Label>Nome do Jogo</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Digite o nome do jogo"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  style={{ borderRadius: "8px" }}
                />
                <Form.Control.Feedback type="invalid">
                  O nome do jogo é obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="id_steam">
                <Form.Label>ID Steam</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Digite o ID Steam do jogo"
                  name="id_steam"
                  value={formData.id_steam}
                  onChange={handleInputChange}
                  style={{ borderRadius: "8px" }}
                />
                <Form.Control.Feedback type="invalid">
                  O ID Steam é obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="url_image">
                <Form.Label>URL da Imagem</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Digite a URL da imagem do jogo"
                  name="url_image"
                  value={formData.url_image}
                  onChange={handleInputChange}
                  style={{ borderRadius: "8px" }}
                />
                <Form.Control.Feedback type="invalid">
                  A URL da imagem é obrigatória.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="text-center" style={{ padding: "20px 0" }}>
              <Button
                type="link"
                href="/privado/games"
                className="btn btn-danger"
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn btn-success"
                style={{ padding: "10px 20px", borderRadius: "8px" }}
              >
                Salvar
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default FormularioGame;
