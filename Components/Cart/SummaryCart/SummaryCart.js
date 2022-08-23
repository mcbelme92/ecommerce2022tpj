/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table, Icon, Image, Button } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
  const { products, setProductReload, productReload } = props;
  const { removeProductCart, addProductCount } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let price = 0;
    let precioConDescuento = 0;
    let itemCount = 0;
    forEach(products, (product) => {
      itemCount = 1;
      precioConDescuento =
        product?.attributes.price -
        Math.floor(product?.attributes.price * product?.attributes.discount) /
          100;
      price += itemCount * precioConDescuento;
    });
    setCount(itemCount);
    setTotalPrice(price);
  }, [productReload, products]);
  const handleClickadd = (product) => {
    // Counter state is incremented
    setCount(product + 1);
    setProductReload(true);
  };
  const handleClickSubsctract = (product) => {
    // Counter state is decremented
    setCount(count - 1);
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setProductReload(true);
  };

  return (
    <div className="sumary-cart">
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
              <Table.HeaderCell>Descuento</Table.HeaderCell>
              <Table.HeaderCell>Precio Final </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product?.id} className="sumary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product?.attributes.url)}
                  />

                  <Image
                    src={product?.attributes.poster.data.attributes.url}
                    alt={product?.attributes.title}
                  />

                  {product.attributes.title}
                </Table.Cell>
                <Table.Cell>{count}</Table.Cell>
                <Table.Cell>
                  {product?.attributes.platform.data.attributes.title}
                </Table.Cell>
                <Table.Cell>De 24 a 72 hrs</Table.Cell>
                <Table.Cell>${product.attributes.price}</Table.Cell>

                {<Table.Cell>% {product?.attributes?.discount}</Table.Cell>}

                <Table.Cell>
                  $
                  {product?.attributes.price -
                    Math.floor(
                      product?.attributes.price * product?.attributes.discount
                    ).toFixed(2) /
                      100}
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="sumary-cart__resume">
              <Table.Cell className="clear" />
              <Table.Cell colSpan="5">Total:</Table.Cell>
              <Table.Cell className="total-price">
                $ {totalPrice.toFixed(2)} USD
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
