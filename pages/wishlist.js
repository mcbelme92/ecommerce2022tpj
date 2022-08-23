import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayouts";
import { size, forEach, map } from "lodash";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { Loader } from "semantic-ui-react";
import ListGames from "../Components/ListGames";
import Seo from "../Components/Seo";

// RECUERDA QUE CUANDO SE CRFEA UNA RFC SE PONE EN MAYUSCULA
export default function Wishlist() {
  const { auth, logout } = useAuth();
  const [games, setGames] = useState(null);

  //const urlGame = games.url;
  // const poster = games.poster.data.attributes.url;
  // const descuento = games.discount;
  // const precioGame = games.price;
  // const tituloGame = games.title;

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);

      if (size(response) > 0) {
        const resultList = [];
        forEach(response, (data) => {
          resultList.push(data.attributes.games.data);
        });
        setGames(resultList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wish-list">
      <Seo title="Mis Favoritos" description="Lista de tus juegos favoritos" />
      <div className="wish-list__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {/* si el estado games es nulo significa que la peticio nno se ha acabado de ejecutar */}
          {!games && (
            <Loader active size="massive">
              <div>
                <h1>Cargando Favoritos</h1>
              </div>
            </Loader>
          )}
          {/* si games tiene contenido y su  tamaño de games es igual a 0 concatename no hay juegos, por que no se ha echo una actualziacion de estos */}
          {/* el ERROR QUE TUVE AL PRINCIPIO FUE QUE DESPÙES DE HACER UNA DECLARACION SOBRE LE TAMAÑO NO HICE CONCATENACION CON && */}
          {/* Comprobando si la matriz de juegos está vacía.  */}
          {games && size(games) === 0 && (
            <div>
              <h3>No hay juegos favoritos en tu lista</h3>
            </div>
          )}
          {/* SI GAMESARR ES MAYOR A ' SIGNIFICA QUE HA ENCONTRADO JUEGOS EN LA PLATAFORMA' */}
          {/* si games tiene infor y esta es mayor a 0 concatename listgames */}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
