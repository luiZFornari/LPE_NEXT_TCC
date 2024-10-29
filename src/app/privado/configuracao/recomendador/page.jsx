import { getGamesDB } from "@/componentes/bd/usecases/gameUseCases";
import FormularioRecomendador from "@/componentes/comuns/FormularioRecomendador"; // Componente Client-Side

const RecomendadorPage = async () => {
  let games = [];

  try {
    const rawGames = await getGamesDB(); // Busca os jogos no servidor

    // Converte para objetos simples serializáveis (plain objects)
    games = rawGames.map((game) => ({
      id: game.id,
      id_steam: game.id_steam,
      name: game.nome,
      image: game.url_image,
    }));

    console.log(games);
  } catch (err) {
    console.log("Erro ao buscar jogos:", err);
  }

  // Retorna o componente Client-Side com os dados de jogos
  return (
    <div>
      <FormularioRecomendador games={games} />
    </div>
  );
};

export default RecomendadorPage;
