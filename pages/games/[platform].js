import React, { useState, useEffect } from "react";
import { getGamesPlatformApi, getTotalGamesPlatform } from "../../api/game";
import { useRouter } from "next/router";

import { size, map } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../../layouts/BasicLayouts";
import ListGames from "../../Components/ListGames";
import Pagination from "../../Components/pagination";
import Seo from "../../Components/Seo";

export default function Platform() {
  const [games, setGamesArr] = useState(null);
  const [totalGames, setTotalGames] = useState(null);
  const { query } = useRouter();

  const limitPerPage = 20;
  // paginacion por item
  const getStartItemPage = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) {
      return 0;
    } else {
      return currentPages * limitPerPage - limitPerPage;
    }
  };

  // console.log(getStartItemPage());

  // se usa para cuando se hace una peticion a una plataforma predeterminada ejecute el get de la info1
  useEffect(() => {
    // funcion anonima autoejecutable 2
    (async () => {
      if (query) {
        const response = await getGamesPlatformApi(
          getStartItemPage(),
          limitPerPage,
          query.platform
        );
        setGamesArr(response);
      }
    })();
    // se pone el query e indica que cuando query cambie ejecute de nuevo un get para que peuda verse los gets en als demas paltaformas3
  }, [query]);
  // SE HACE LA FUNCION Y EN CIERTO MODO ES UN CICLO FOR PERO CON USE EFFECT

  // const {
  //   0: {
  //     attributes: {},
  //   },
  // } = games; no se utilizo desetructuracion de imagen anidada
  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatform(query.platform);
      setTotalGames(response);
    })();
    //este cuadro es para que useEffect detecte el cambio y vuevla a llamar ala peticion que contiene
  }, [query]);

  // const poster = attributes.poster.data.attributes.url;
  return (
    <BasicLayout className="platforms">
      <Seo title={query?.platform} />
      {/* si el estado games es nulo significa que la peticio nno se ha acabado de ejecutar */}
      {!games && (
        <Loader active size="massive">
          <div>
            <h1>Cargando juegos de {query.platform}....</h1>
          </div>
        </Loader>
      )}
      {/* si games tiene contenido y su  tamaño de games es igual a 0 concatename no hay juegos, por que no se ha echo una actualziacion de estos */}
      {/* el ERROR QUE TUVE AL PRINCIPIO FUE QUE DESPÙES DE HACER UNA DECLARACION SOBRE LE TAMAÑO NO HICE CONCATENACION CON && */}
      {/* Comprobando si la matriz de juegos está vacía.  */}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {/* SI GAMESARR ES MAYOR A ' SIGNIFICA QUE HA ENCONTRADO JUEGOS EN LA PLATAFORMA' */}
      {/* si games tiene infor y esta es mayor a 0 concatename listgames */}
      {size(games) > 0 && <ListGames games={games} />}
      {/* si total games tiene data mostrarme paginacion sino es nulo    */}
      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
