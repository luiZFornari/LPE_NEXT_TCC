"use client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signIn } from "next-auth/react";

export default async function Login({ searchParams }) {
  const handleLogin = async (formData) => {
    console.log("formData: " + JSON.stringify(formData));
    await signIn("credentials", {
      email: formData.get("email"),
      senha: formData.get("senha"),
      callbackUrl: "/",
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="card-title">Login de Usuário</h2>
              </div>
              {searchParams.error && (
                <div className="alert alert-danger text-center">
                  Falha ao efetuar o login. Usuário ou senha inválidos.
                </div>
              )}
              <Form action={handleLogin} method="POST">
                <Form.Group className="mb-3" controlId="txtEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Informe o email"
                    name="email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="txtSenha">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Informe a senha"
                    name="senha"
                    required
                  />
                </Form.Group>

                <div className="text-center mt-4 mb-4">
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="secondary"
                      type="link"
                      href={`/register`}
                      className="px-5 py-2 me-3 rounded-pill shadow-sm w-50"
                      style={{ backgroundColor: "#6c757d", border: "none" }}
                    >
                      Registrar
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-5 py-2 rounded-pill shadow-sm w-50"
                      style={{ backgroundColor: "#007bff", border: "none" }}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
