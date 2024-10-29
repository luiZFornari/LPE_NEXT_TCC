"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import Loading from "./Loading";

const FormularioUsuario = ({ onSave, getUsuario }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    email: "",
    senha: "",
    tipo: "",
    telefone: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      if (session?.user?.email) {
        const usuario = await getUsuario({ email: session.user.email });
        setFormData({
          id: usuario.id || "",
          nome: usuario.nome || "",
          email: usuario.email || "",
          senha: "", // Nunca pré-preencher a senha por segurança
          tipo: usuario.tipo || "",
          telefone: usuario.telefone || "",
        });

        setIsLoading(false);
      }
    };

    fetchUsuario();
  }, [session, getUsuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Validação mais completa
    if (formData.nome && formData.email && formData.tipo && formData.telefone) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

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

  return (
    <Container className="mt-5">
      {!isLoading ? (
        <>
          <h1 className="text-center mb-4">Atualizar Dados do Usuário</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Digite seu nome"
                    aria-label="Nome"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, preencha o nome.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    aria-label="Email"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="senha">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Deixe em branco para não alterar"
                    aria-label="Senha"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipo">
                  <Form.Label>Tipo de Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipo"
                    value={formData.tipo}
                    readOnly
                    aria-label="Tipo de Usuário"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="telefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    placeholder="(00) 00000-0000"
                    aria-label="Telefone"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, preencha o telefone.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button type="submit" disabled={!formValid} variant="primary">
                Atualizar
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
};

export default FormularioUsuario;
