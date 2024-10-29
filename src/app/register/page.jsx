import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Loading from "@/componentes/comuns/Loading";
import { Suspense } from "react";
import { addUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases"; // Função de import
import { Button, Alert } from "react-bootstrap";

// Função para pegar query params
const getQueryParams = (search) => {
  const params = new URLSearchParams(search);
  return {
    success: params.get("success"),
    message: params.get("message"),
  };
};

const RegistroUsuarioPage = async ({ searchParams }) => {
  const { success, message } = getQueryParams(searchParams);

  const salvarUsuario = async (formData) => {
    "use server";

    const objeto = {
      email: formData.get("email"),
      senha: formData.get("senha"),
      tipo: "U",
      telefone: formData.get("telefone"),
      nome: formData.get("nome"),
    };

    try {
      await addUsuarioDB(objeto);
      // Redireciona com mensagem de sucesso
    } catch (err) {
      // Redireciona com mensagem de erro
      redirect(
        `/register?success=false&message=Erro ao adicionar usuário, tente novamente!`
      );
    }
    redirect("/register?success=true&message=Usuário registrado com sucesso!");
  };

  return (
    <Suspense fallback={<Loading />}>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ paddingTop: "50px" }}
      >
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h2 className="card-title">Registrar Usuário</h2>
          </div>

          {message && (
            <Alert variant={success === "true" ? "success" : "danger"}>
              {message}
            </Alert>
          )}

          <form action={salvarUsuario}>
            <div className="mb-3">
              <FloatingLabel controlId="campoNome" label="Nome">
                <Form.Control
                  type="text"
                  required
                  name="nome"
                  placeholder="Nome"
                  className="rounded-pill"
                />
              </FloatingLabel>
            </div>

            <div className="mb-3">
              <FloatingLabel controlId="campoEmail" label="Email">
                <Form.Control
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                  className="rounded-pill"
                />
              </FloatingLabel>
            </div>

            <div className="mb-3">
              <FloatingLabel controlId="campoSenha" label="Senha">
                <Form.Control
                  type="password"
                  required
                  name="senha"
                  placeholder="Senha"
                  className="rounded-pill"
                />
              </FloatingLabel>
            </div>

            <div className="mb-3">
              <FloatingLabel controlId="campoTelefone" label="Telefone">
                <Form.Control
                  type="tel"
                  required
                  name="telefone"
                  placeholder="Telefone"
                  className="rounded-pill"
                />
              </FloatingLabel>
            </div>

            <div className="text-center mt-4 mb-4">
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  type="link"
                  href={`/`}
                  className="px-5 py-2 me-3 rounded-pill shadow-sm w-50"
                  style={{ border: "none" }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="px-5 py-2 rounded-pill shadow-sm w-50"
                  style={{ backgroundColor: "#007bff", border: "none" }}
                >
                  Registrar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default RegistroUsuarioPage;
