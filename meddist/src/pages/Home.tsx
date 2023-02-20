/** @format */

import { useState } from "react";

import ProductsList from "../components/home/ProductsList";
import SearchProduct from "../components/home/SearchProduct";

import useHttp from "../hooks/useHttp";
import Product from "../models/Product";
import Loader from "../UI/Loader/Loader";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoading, sendRequest: fetchProducts } = useHttp();

  return (
    <>
      <SearchProduct
        onFetchProducts={fetchProducts}
        applyProducts={setProducts}
      />
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <ProductsList productsList={products} loading={isLoading} />
      )}
    </>
  );
};

export default HomePage;
