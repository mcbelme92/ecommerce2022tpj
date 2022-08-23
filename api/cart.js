import { BASE_PATH, CART } from "../utils/constants";
import { size, includes, remove } from "lodash";
import { toast } from "react-toastify";
import { authFetch } from "../utils/fetch";

export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();
  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    //esta funciona compara el contenido que tiene dentro del array si es coincidente con el producto te dira que ya esta dentro del arreglo cart, si existe es true de lo contrario sera false
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("este producto ya esta en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto agregado al carrito correctamente");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();
  remove(cart, (item) => {
    return item === product;
  });
  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}

export async function paymentCardApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address.attributes;
    delete addressShipping.user;
    delete addressShipping.createdAt;

    const url = `${BASE_PATH}/api/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        data: { token, game: products, user: idUser, addressShipping },
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function RemoveAllProductsCartApi() {
  localStorage.removeItem(CART);
}
