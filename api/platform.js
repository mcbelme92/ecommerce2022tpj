import { BASE_PATH } from "../utils/constants";
//get Platforms all
export async function getPlatformsApi() {
  try {
    const url = `${BASE_PATH}/api/platforms`;
    const response = await fetch(url);
    const result = await response.json();
    const { data } = result;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
