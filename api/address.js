import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function createAddressApi(data, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // los corchetes desestructuran un objeto o en este caso le agregas la infor a otro objeto ya echo data: agregar
      body: JSON.stringify({ data }),
    };
    const result = await authFetch(url, params, logout);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressApi(idUser, logout) {
  //se configuro desde strapiv4 recuerda ver tu domicilio siempre de estrapi ;) (D) cuando queiras configurar un filtro
  try {
    //esa url saca las direcciones del usuario por su id de usuario aunque NO muestra al usuario
    //es completamente dirferente ala del curso ya que el curso es strapi v4
    const url = `${BASE_PATH}/api/addresses?filters[$and][0][user][id][$eq]=${idUser}`;
    const result = await authFetch(url, null, logout);
    //result tenia dos objetos data y metase realizo lo siguiente proxima linea

    //se desestructuro result para tener el data directo de addres ya que eran 2 objetos o keys
    // mas profundos el id de los objectos y attributes los objetos con propiedades
    const address = await result.data;
    if (result.status === 500) throw "Error del servidor";
    return address;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAddressApi(idAddresss, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses/${idAddresss}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.status === 500) throw "Error del servidor ";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses/${idAddress}`;
    const params = {
      method: "PuT",
      headers: {
        "Content-Type": "application/json",
      },
      // los corchetes desestructuran un objeto o en este caso le agregas la infor a otro objeto ya echo data: agregar
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
