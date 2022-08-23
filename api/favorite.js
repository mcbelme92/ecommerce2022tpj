import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export async function isFavoriteApiGet(idUser, idGame, logout) {
  try {
    //SE MANDA LA PETICION CON FILTRADO DEL USER ID Y CON EL FILTRADO EN GAME POR EL TITULO DE JUEGO
    const url = `${BASE_PATH}/api/favorites?&filters[$and][0][user][id][$eq]=${idUser}&filters[$and][0][games][id][$eq]=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    const getDataFound = await isFavoriteApiGet(idUser, idGame, logout);

    // si el tamaño de datafound es mayor a 0 o es DIFERENTE a nulo signfica que ya tiene le juego en favoritos
    if (size(getDataFound.data) > 0 || !getDataFound.data) {
      console.log("Ya lo tienes en favoritos");
    } else {
      const url = `${BASE_PATH}/api/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //CUIDADO AL COLOCAR JSON EN MINUSCULAS YA QUE PROVOCA ERrOR FS
        body: JSON.stringify({ data: { user: idUser, games: idGame } }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
  try {
    const getDataFound = await isFavoriteApiGet(idUser, idGame, logout);

    // si el tamaño de datafound es mayor a 0 o es DIFERENTE a nulo signfica que ya tiene le juego en favoritos
    if (size(getDataFound.data[0]) > 0) {
      const url = `${BASE_PATH}/api/favorites/${getDataFound.data[0]?.id}`;

      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, Logout) {
  try {
    const url = `${BASE_PATH}/api/favorites?populate[games][populate]=*&filters[$and][0][user][id][$eq]=${idUser}`;
    const result = await authFetch(url, Logout);
    const { data } = result;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
