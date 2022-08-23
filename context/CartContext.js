import { createContext } from "react";

const CartContext = createContext({
  //SOLO usuario autentificado
  // auth: undefined,
  productsCart: 0,
  //funcion agrega producto
  addProductCart: () => null,
  //funcion  obtiene producto
  getProductsCart: () => null,
  //funcion remueve el producto
  removeProductCart: () => null,
  //funcion remueve todos los productos
  removeAllProductsCart: () => null,
  addCountProduct: () => null,
});

export default CartContext;
