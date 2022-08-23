import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getOrdersApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/api/orders?populate[game][populate]=*&filters[$and][0][user][id][$eq]=${idUser}`;
    const response = await authFetch(url, null, logout);
    const { data } = response;
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
