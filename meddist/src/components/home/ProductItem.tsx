/** @format */
import React, { CSSProperties } from "react";
import {
  addToCart,
  removeItem,
  decrementQuantity,
} from "../../store/cartSlice";
import { Link } from "react-router-dom";

import classes from "./ProductItem.module.css";
import medicineImage from "../../images/p-1.jpg";
import Button from "../../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Product from "../../models/Product";

const ProductItem: React.FC<{
  product: Product;
  imageStyle?: CSSProperties;
  shouldRenderActions: boolean;
  isDetailPage?: boolean;
}> = (props) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const productWasAddedHandler = (productId: string) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      return true;
    } else {
      return false;
    }
  };
  let isInShoppingCart = productWasAddedHandler(props.product.id);

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product));
  };

  const decrementFromCartHandler = (productId: string) => {
    dispatch(decrementQuantity(productId));
  };

  const removeFromCartHandler = (productId: string) => {
    dispatch(removeItem(productId));
  };

  const getItemQuantity = (productId: string) => {
    let item = cart.filter((item) => item.id === productId);
    return item[0].quantity;
  };

  return (
    <article className={classes["product-item-container"]}>
      <div className={classes["image-container"]}>
        <img
          style={props.imageStyle}
          src={medicineImage}
          alt="Medicine illustration"
        />
      </div>
      <div className={classes["product-description-container"]}>
        <h3>{props.product.name}</h3>
        <p className={classes["product-description"]}>
          {props.product.description}
        </p>
        <p className={classes["product-description-container-price"]}>
          $ {props.product.price}
        </p>
        {isInShoppingCart ? (
          <p>
            Quantity in Cart:{" "}
            <span className={classes["product-stock-quantity"]}>
              {getItemQuantity(props.product.id)}
            </span>
          </p>
        ) : null}
        {props.shouldRenderActions ? (
          <>
            <div>
              <Button
                ariaLabel="Add to cart"
                onClickHandler={addToCartHandler.bind(null, props.product)}
                success={true}
              >
                &#43;
              </Button>
              {isInShoppingCart ? (
                <Button
                  ariaLabel="Decrement quantity from Cart"
                  onClickHandler={() =>
                    decrementFromCartHandler(props.product.id)
                  }
                  default={true}
                >
                  &#8722;
                </Button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
      <div>
        {props.isDetailPage ? (
          <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
            <Button ariaLabel="Return home page" info={true}>
              Return
            </Button>
          </Link>
        ) : (
          <Link
            key={props.product.id}
            to={`/products/${props.product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button ariaLabel="Product details" info={true}>
              Details
            </Button>
          </Link>
        )}
      </div>
      <div>
        {isInShoppingCart ? (
          <Button
            ariaLabel="Remove from Cart"
            onClickHandler={() => removeFromCartHandler(props.product.id)}
            default={true}
          >
            Remove
          </Button>
        ) : null}
      </div>
    </article>
  );
};

export default React.memo(ProductItem);
