import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayouts/BasicLayout";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../Components/Game/HeaderGame";
import { Loader } from "semantic-ui-react";
import TabsGame from "../Components/Game/TabsGame";
import Seo from "../Components/Seo";

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();
  const data = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);

      setGame(response);
    })();
  }, [query]);
  // tambien se puede poner if(!game) return null para que entienda que solo se renderize si tiene valor
  // if (!game) {
  //   return;
  //   null;
  // }

  return (
    <div className="game">
      {/* si games es nulo renderizame esto  */}
      {/*  Una mano abreviada para una declaración if. Si games es nulo, renderice BasicLayout. */}

      {!game ? (
        <BasicLayout>
          <Loader active size="massive">
            <h1>Cargando Informacion del Juego...</h1>
          </Loader>
        </BasicLayout>
      ) : (
        <BasicLayout>
          <div className="game-layout">
            <Seo
              title={game?.attributes.title}
              description={game?.attributes.description}
            />
            <HeaderGame game={game} />
            <TabsGame game={game} />
          </div>
        </BasicLayout>
      )}
    </div>
  );
}
