import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { searchGamebyUrlApi } from "../api/game";
import BasicLayout from "../layouts/BasicLayouts";
import ListGames from "../Components/ListGames";
import Seo from "../Components/Seo";

// se ordena primero con componetnte isntalados y al final los propios

export default function Search() {
  const [searchGames, setSearchGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, [query]);

  useEffect(() => {
    (async () => {
      // se va eejcutar la peticion al servidor si query es mayor a 0 que si tiene una letra o mas de pendiendo cuantas letras le aumentamos
      //mide el tamaño de las letras que contiene el query
      if (size(query.title) > 0) {
        const response = await searchGamebyUrlApi(query.title);

        // si response es mayor a 0 significa que hay valor
        if (size(response) > 0) {
          setSearchGames(response);
        } else {
          setSearchGames([]);
        }
      } else {
        //sino devuelveme un arreglo vacio en caso dado no tenga informacion query title
        setSearchGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <Seo title="Buscador de juegos" />
      <div className="title">Busqueda de juegos:</div>
      <div className="data">
        {!searchGames && (
          <Loader active size="massive">
            <div>
              <h1>Buscando juegos </h1>
            </div>
          </Loader>
        )}
        {/* si games tiene contenido y su  tamaño de games es igual a 0 concatename no hay juegos, por que no se ha echo una actualziacion de estos */}
        {/* el ERROR QUE TUVE AL PRINCIPIO FUE QUE DESPÙES DE HACER UNA DECLARACION SOBRE LE TAMAÑO NO HICE CONCATENACION CON && */}
        {/* Comprobando si la matriz de juegos está vacía.  */}

        {searchGames && size(searchGames) === 0 && (
          <div className="data__empty-blank">
            <h3>Buscador</h3>
          </div>
        )}
        {/* SI GAMESARR ES MAYOR A ' SIGNIFICA QUE HA ENCONTRADO JUEGOS EN LA PLATAFORMA' */}
        {/* si games tiene infor y esta es mayor a 0 concatename listgames */}

        {size(searchGames) > 0 && <ListGames games={searchGames} />}
        {/* si total games tiene data mostrarme paginacion sino es nulo    */}
      </div>
    </BasicLayout>
  );
}
