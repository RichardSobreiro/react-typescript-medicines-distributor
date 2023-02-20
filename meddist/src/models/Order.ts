/** @format */

import Product from "./Product";

class Order {
  id: string;
  products: Product[];
  totalPrice: number;
  orderedAt: string;
  constructor(
    id: string,
    products: Product[],
    totalPrice: number,
    orderedAt: string
  ) {
    this.id = id;
    this.products = products;
    this.totalPrice = totalPrice;
    this.orderedAt = orderedAt;
  }
}

export default Order;
