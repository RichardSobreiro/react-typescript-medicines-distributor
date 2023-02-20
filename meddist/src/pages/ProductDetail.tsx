/** @format */
import { Suspense } from "react";
import { json, defer, Await, useRouteLoaderData } from "react-router-dom";
import config from "../config.json";

import classes from "./ProductDetail.module.css";

import ProductItem from "../components/home/ProductItem";
import Product from "../models/Product";

const ProductDetail = () => {
  const { product } = useRouteLoaderData("product-details") as {
    product: Product;
  };
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={product}>
        <div className={classes["product-detail-container"]}>
          <ProductItem
            product={product}
            shouldRenderActions={true}
            isDetailPage={true}
          ></ProductItem>
        </div>
      </Await>
    </Suspense>
  );
};

export default ProductDetail;

async function loadProduct(id: string) {
  const response = await fetch(`${config.SERVER_URL}/products/` + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected product." },
      {
        status: 500,
      }
    );
  } else {
    const product = await response.json();
    return product;
  }
}

export async function loader({ params }: any) {
  const id = params.productId;

  return defer({
    product: await loadProduct(id),
  });
}
