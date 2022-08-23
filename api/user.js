import { BASE_PATH, urlCountrys } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function registerApi(formData) {
  //devuevle register de strapi
  try {
    const url = `${BASE_PATH}/api/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  //devuelve local de callback
  try {
    // se manda llamar desde strapi la opcion callback esta en user-permissions
    const url = `${BASE_PATH}/api/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordApi(email) {
  //En este caso en concreto no devuelve la peticion ya que no se ha levanado un servidor de correo que responda las peticiones hasta que se levante yse cambie el host por ese dominio funcionara 200 ok, pero pro lo mientras marcara error smtp

  try {
    const url = `${BASE_PATH}/api/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${BASE_PATH}/api/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateNameApp(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateEmailApp(idUser, email, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    };
    const result = await authFetch(url, params, logout);
    // regresa result si este tiene valor y si no devuelve nulo
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePhoneApi(idUser, phone, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phone),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAddressApi(idUser, address, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
  }
}
