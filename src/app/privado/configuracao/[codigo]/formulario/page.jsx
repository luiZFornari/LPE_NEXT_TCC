import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getGamesDB } from "@/componentes/bd/usecases/gameUseCases";
import {
  addConfiguracaoDB,
  getConfiguracaoPorIdDB,
  updateConfiguracaoDB,
} from "@/componentes/bd/usecases/configuracaoUseCases";
import Loading from "@/componentes/comuns/Loading";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import { Button } from "react-bootstrap";

const FormularioPage = async ({ params }) => {
  const games = await getGamesDB();
  const session = await getServerSession(authOptions);

  // Se não tem sessão válida, redireciona para a tela de login
  if (!session) {
    redirect("/api/auth/signin");
  }

  console.log(session);

  let configuracao = null;
  if (params.codigo == 0) {
    configuracao = {
      id: 0,
      desempenho_esperado: "",
      custo_final: "",
      configuracao: {
        armazenamento: "",
        fonte: "",
        memoria_ram: "",
        placa_de_video: "",
        placa_mae: "",
        processador: "",
        resfriamento: "",
      },
      game_id: "",
      usuario_email: session.user.email,
      data: new Date().toISOString().slice(0, 10), // Define a data como string no formato ISO
    };
  } else {
    try {
      configuracao = await getConfiguracaoPorIdDB(params.codigo);
      console.log(configuracao);
      // Certifica-se de que a data está em formato string
      configuracao.data = new Date(configuracao.data)
        .toISOString()
        .slice(0, 10);
    } catch (err) {
      return notFound();
    }
  }

  const salvarConfiguracao = async (formData) => {
    "use server";

    const configuracaoObjeto = {
      armazenamento: formData.get("armazenamento"),
      fonte: formData.get("fonte"),
      memoria_ram: formData.get("memoria_ram"),
      placa_de_video: formData.get("placa_de_video"),
      placa_mae: formData.get("placa_mae"),
      processador: formData.get("processador"),
      resfriamento: formData.get("resfriamento"),
    };

    const objeto = {
      id: parseInt(formData.get("codigo"), 10),
      desempenho_esperado: formData.get("desempenho"),
      custo_final: parseFloat(formData.get("custo")),
      configuracao: configuracaoObjeto,
      game_id: parseInt(formData.get("game_id"), 10),
      usuario_id: formData.get("usuario_email"),
      data: formData.get("data"), // Já está em string no formato correto
    };

    try {
      if (objeto.id === 0) {
        await addConfiguracaoDB(objeto);
      } else {
        await updateConfiguracaoDB(objeto);
      }
    } catch (err) {
      throw new Error("Erro: " + err);
    }
    revalidatePath("/privado/configuracao/");
    redirect("/privado/configuracao/");
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h2>Configuração </h2>
        </div>
        <form action={salvarConfiguracao}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="campoCodigo" className="form-label">
                  Código
                </label>
                <input
                  type="number"
                  defaultValue={configuracao.id}
                  readOnly
                  name="codigo"
                  className="form-control shadow-sm"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="campoUsuario" className="form-label">
                  Usuário
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={
                    configuracao.usuario_email || configuracao.usuario_id
                  }
                  name="usuario_email"
                  className="form-control shadow-sm"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="campoGame" className="form-label">
                  Game
                </label>
                <select
                  defaultValue={configuracao.game_id}
                  required
                  name="game_id"
                  className="form-control shadow-sm"
                >
                  <option value="">Selecione um game...</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.nome}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  Por favor, selecione um game.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoDesempenho" className="form-label">
                  Desempenho Esperado
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.desempenho_esperado}
                  required
                  name="desempenho"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha o desempenho esperado.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoArmazenamento" className="form-label">
                  Armazenamento
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.armazenamento}
                  required
                  name="armazenamento"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha o armazenamento.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoFonte" className="form-label">
                  Fonte
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.fonte}
                  required
                  name="fonte"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha a fonte de energia.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoMemoriaRam" className="form-label">
                  Memória RAM
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.memoria_ram}
                  required
                  name="memoria_ram"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha a memória RAM.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoPlacaDeVideo" className="form-label">
                  Placa de Vídeo
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.placa_de_video}
                  required
                  name="placa_de_video"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha a placa de vídeo.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoPlacaMae" className="form-label">
                  Placa Mãe
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.placa_mae}
                  required
                  name="placa_mae"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha a placa mãe.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoProcessador" className="form-label">
                  Processador
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.processador}
                  required
                  name="processador"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha o processador.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoResfriamento" className="form-label">
                  Resfriamento
                </label>
                <input
                  type="text"
                  defaultValue={configuracao.configuracao.resfriamento}
                  required
                  name="resfriamento"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha o sistema de resfriamento.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoCusto" className="form-label">
                  Custo Final
                </label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={configuracao.custo_final}
                  required
                  name="custo"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, preencha o custo final.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="campoData" className="form-label">
                  Data
                </label>
                <input
                  type="date"
                  defaultValue={configuracao.data}
                  required
                  name="data"
                  className="form-control shadow-sm"
                />
                <div className="invalid-feedback">
                  Por favor, selecione uma data.
                </div>
              </div>

              <div className="text-center" style={{ padding: "20px 0" }}>
                <Button
                  type="link"
                  href="/privado/configuracao"
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
            </div>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default FormularioPage;
