import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { getLastGamesApi } from "../api/game";
import { size, map } from "lodash";
import BasicLayout from "../layouts/BasicLayouts/BasicLayout";
import ListGames from "../Components/ListGames/ListGames";
import Seo from "../Components/Seo";
//en next NO ES NESECARIO react complemento solo cuando usas hooks

export default function Home() {
  // se mete arrayAppi en un estado para extraer la info
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(50);
      //si es mayor a 0 significa que responda  sino se queda con el array en blanco
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="Home">
      <Seo title="GamingShoppingtpj" />
      {/* si la data de games es nula=NO TIENE CONTENIDO significa qu esta cargando y no tenemos los juegos*/}
      {/* si games es nulo concatename este Loader */}
      {!games && (
        <Loader active size="massive">
          <h1>Cargando Juegos....</h1>
        </Loader>
      )}
      {/* si game tiene contenido significa que */}
      {/* si la peticion a terminado e indica igual a cero significa que no hay un juego nuevo actualizado en la abse de datos */}
      {/* si games tiene data y esta es igual a 0 concatename no hay juegos */}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay Juegos</h3>
        </div>
      )}
      {/* si game es mayor a 0 significa que si hay juegos */}
      {/* si games es mayor a 0 concatename listgames significa que */}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
