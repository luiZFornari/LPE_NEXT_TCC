import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getGamePorIdDB,
  addGameDB,
  updateGameDB,
} from "@/componentes/bd/usecases/gameUseCases";
import FormularioGame from "@/componentes/comuns/FormularioGame";

const FormularioPage = async ({ params }) => {
  let game = null;
  let gameData = null;

  // Verifica se é um novo game ou se está editando
  if (params.codigo == 0) {
    game = { id: 0, nome: "", id_steam: "", url_image: "" };
  } else {
    try {
      gameData = await getGamePorIdDB(params.codigo);

      game = {
        id: gameData.id,
        nome: gameData.nome,
        id_steam: gameData.id_steam,
        url_image: gameData.url_image,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // Função para salvar ou atualizar o game
  const salvarGame = async (formData) => {
    "use server";
    const objeto = {
      id: formData.id,
      nome: formData.nome,
      id_steam: formData.id_steam,
      url_image: formData.url_image,
    };
    try {
      if (objeto.id == 0) {
        await addGameDB(objeto); // Adiciona novo game
      } else {
        await updateGameDB(objeto); // Atualiza game existente
      }
    } catch (err) {
      throw new Error("Erro: " + err);
    }

    // Revalida o cache e redireciona para a lista de games
    revalidatePath("/privado/games/");
    redirect("/privado/games/");
  };

  return (
    <div>
      <FormularioGame game={game} onSave={salvarGame} />
    </div>
  );
};

export default FormularioPage;
