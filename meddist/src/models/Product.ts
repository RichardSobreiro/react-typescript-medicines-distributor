/** @format */

class Product {
  id: string;
  name: string;
  description: string;
  stockQuantity: number;
  price: number;
  quantity: number;

  constructor(
    id: string,
    name: string,
    description: string,
    stockQuantity: number,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stockQuantity = stockQuantity;
    this.price = price;
    this.quantity = 0;
  }
}

export default Product;
