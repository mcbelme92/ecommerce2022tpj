import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayouts";
import { getGameByUrlApi, addPorductCount } from "../api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../Components/Cart/SummaryCart";
import AdressShipping from "../Components/Cart/AddressShiupping/AddressShipping";
import Payment from "../Components/Cart/Payment/Payment";

export default function Cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos el carrito </h2>
    </BasicLayout>
  );
}

function FullCart(props) {
  //LA INFO EN  UNA URL
  const { products } = props;
  const [productsData, setProductsData] = useState(null);
  const [productReload, setProductReload] = useState(false);
  const [addressArray, setAddresses] = useState(null);

  useEffect(() => {
    // esta funcion anonima con for await es para que haga una peticion por cada URL, que se le pasa
    (async () => {
      // FUNCION PARA METER LOS ARREGLOS EN UN ARREGLO
      const productsTemp = [];
      // for asincrono para ir metiendo UNO POR UNO de producto en data
      for await (const product of products) {
        //peticion del producto la regresa completa aqui viene un arreglo de objetos con toda lainformacion por producto separada
        const data = await getGameByUrlApi(product);
        //setea la data la mete en el arreglo vacio llamado products temp, mete la data uno por uno
        productsTemp.push(data);
      }
      //SETEA LA INFORMACION EN EL ARRAY TEMPORAL
      setProductsData(productsTemp);
      setProductReload(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productReload]);

  return (
    <BasicLayout className="cart">
      <SummaryCart
        products={productsData}
        setProductReload={setProductReload}
        productReload={productReload}
      />
      <AdressShipping setAddresses={setAddresses} />
      {addressArray && (
        <Payment products={productsData} addressArray={addressArray} />
      )}
    </BasicLayout>
  );
}
//   <BasicLayout className="cart">
//     <div className="cart__block">
//       <div className="title">Carrito de compra</div>
//       <div className="data">
//         <h1>cart....component</h1>
//       </div>
//     </div>
//   </BasicLayout>
