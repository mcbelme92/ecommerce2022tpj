import { BASE_PATH } from "../utils/constants";
import {
  platformFilterUrl,
  gamesLimitPagination,
  gamesCountUrl,
  filterOrderDes,
  filterInfoGame,
} from "../utils/GamesApiFilters";

export async function getLastGamesApi(limit) {
  try {
    const limitItems = `pagination[limit]=${limit}`;
    const sortItem = `sort=createdAt:DESC`;
    const url = `${BASE_PATH}/api/games?populate=*&pagination[start]=0&${limitItems}&${sortItem}`;

    const response = await fetch(url);
    const result = await response.json();
    const { data } = result;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGamesPlatformApi(start, limit, platformUrl) {
  try {
    const url = `${BASE_PATH}/${gamesLimitPagination}=${start}&pagination[limit]=${limit}&${filterOrderDes}&${platformFilterUrl}=${platformUrl}`;
    const response = await fetch(url);
    const result = await response.json();
    const { data } = result;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalGamesPlatform(platform) {
  try {
    // SI TIENES DUDAS DE LA URL SIEMPRE VE HACIA LAS DIRECCIONES
    const url = `${BASE_PATH}/api/games/count?populate=*&${gamesCountUrl}=${platform}`;
    const response = await fetch(url);

    const result = await response.json();
    /* Devolviendo el resultado de la búsqueda. */
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGameByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/api/games?populate=*&${filterInfoGame}=${path}`;
    /* Obtener los datos de la API. */
    const response = await fetch(url);
    //    {
    //   method: "PATH",
    //   mode: "cors",
    //   credentials: "same-origin",
    //   headers: {
    //     "Access-Control-Allow-Origin": `*`,
    //   },
    // });

    const result = await response.json();

    // para invocar la informacion desestructurada de UN solo juego se hace de la siguiente forma
    // ya que l oque se manda pedir es la informacion copleta de un OBJECTO por lo tanto se le pone el cero
    // ya que es la menra de invocar la informacion individualmente la informacio contenida en un objeto y no tenderizar todos
    // cada juego por separado
    //MADNAME TRAER LA INFORMACION DE LA API POR URL DE CADA JUEGO Y DE ESE JUEGO SU INFORMACION PROPIA Y NADA MAS DEL JUEGO
    /* Devolviendo el primer elemento de la matriz. */

    return result.data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchGamebyUrlApi(title) {
  try {
    const url = `${BASE_PATH}/api/games?populate=*&filters[$and][0][title][$contains]=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
