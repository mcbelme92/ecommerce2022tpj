import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import BasicLayout from "../layouts/BasicLayouts/BasicLayout";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import OrderInfo from "../Components/Orders/OrderInfo/OrderInfo";
import Seo from "../Components/Seo";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      //si response tiene valor lo pones sino ponme un arreglo vacio array blank
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" description="Lista de tus pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavia no has realziado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const { orders } = props;
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} table={6} computer={8} key={order.id}>
          <OrderInfo order={order} key={order.id} />
          {/* {order?.game?.data?.attributes.title === undefined ? (
            <p key={order.id}>Objeto sin imagen</p>
          ) : (
            <OrderInfo order={order} key={order.id} />
          )} */}
        </Grid.Column>
      ))}
    </Grid>
  );
}
