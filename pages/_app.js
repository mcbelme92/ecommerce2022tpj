import React, { useMemo, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { toast } from "react-toastify";
import { getToken, setToken, removeToken } from "../api/token";
import {
  addProductCart,
  getProductsCart,
  countProductsCart,
  removeProductCart,
  addPorductCount,
  RemoveAllProductsCartApi,
} from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [realoaderUser, setRealoaderUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloaderCart, setReloaderCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setRealoaderUser(false);
  }, [realoaderUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloaderCart(false);
  }, [reloaderCart, auth]);

  const alertCloseSession = () => {
    setTimeout(() => {
      toast.warning("Sesion Cerrada correctamente");
    }, 1000);
  };

  // funcion de logueo decodifica el token y lo setea en el localstorage
  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
      alertCloseSession();
    }
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setRealoaderUser,
    }),
    [auth]
  );
  const addProduct = (product) => {
    const token = getToken();
    //si auth tiene  valor logueado con idUser agregalo al carrito pero sino muestrame un mensaje de error
    if (token) {
      addProductCart(product);
      setReloaderCart(true);
    } else {
      toast.warning(
        "para comprar un juego tienes que iniciar sesion o registrarte"
      );
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloaderCart(true);
  };
  const removeAllProduct = () => {
    RemoveAllProductsCartApi();
    setReloaderCart(true);
  };

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,

      addProductCart: (p) => addProduct(p),

      getProductsCart: getProductsCart,
      //se le envia el producto a remove
      removeProductCart: (product) => removeProduct(product),

      addCountProduct: (p) => addPorductCount(p),
      removeAllProductsCart: removeAllProduct,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
