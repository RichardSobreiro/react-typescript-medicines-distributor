/** @format */
import React from "react";
import Order from "../../models/Order";

import OrderItem from "./OrderItem";

const OrdersList: React.FC<{ orders: Order[] }> = (props) => {
  return (
    <>
      {props.orders.map((order) => {
        return <OrderItem key={order.id} order={order}></OrderItem>;
      })}
    </>
  );
};

export default React.memo(OrdersList);
