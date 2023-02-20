/** @format */
import { useNavigate, json } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ProductItem from "../../components/home/ProductItem";
import Button from "../../UI/Button/Button";
import Loader from "../../UI/Loader/Loader";
import useHttp from "../../hooks/useHttp";
import { resetCart } from "../../store/cartSlice";
import config from "../../config.json";

import classes from "./OrderForm.module.css";
import Product from "../../models/Product";

const OrderForm = () => {
  const cart = useAppSelector((state) => state.cart);
  const totalPrice = useAppSelector((state) => state.totalPrice);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest: createOrder } = useHttp();
  const dispatch = useAppDispatch();

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const createOrderHandler = async () => {
    const createOrderCallback = () => {
      dispatch(resetCart());
      navigate("/");
    };
    const productsInCart: Product[] = [];
    cart.forEach((item) => productsInCart.push(item));
    await createOrder(
      {
        url: `${config.SERVER_URL}/orders`,
        method: "POST",
        body: {
          id: Date.now().toString(),
          products: productsInCart,
          totalPrice: totalPrice,
          orderedAt: new Date().toString(),
        },
      },
      createOrderCallback
    );

    if (error) {
      throw json(
        {
          message:
            "An error occurred while creating the Order. Try again, please",
        },
        { status: 500 }
      );
    }
  };

  const cancelOrderHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes["order-area"]}>
            <h3 className={classes["order-area-title"]}>Order</h3>
            <hr></hr>
            <div className={classes["order-items"]}>
              {getTotalQuantity() === 0 ? (
                <h2>No items in shopping cart!</h2>
              ) : (
                cart.map((product) => {
                  return (
                    <ProductItem
                      product={product}
                      shouldRenderActions={true}
                    ></ProductItem>
                  );
                })
              )}
            </div>
          </div>
          <div className={classes["payment-area"]}>
            <h3 className={classes["payment-area-title"]}>Payment Summary</h3>
            <hr></hr>
            <div className={classes["payment-area-line"]}>
              <p>Order Summary: </p>
              <p>$ {totalPrice}</p>
            </div>
            <div className={classes["payment-area-line"]}>
              <p>Delivery Price: </p>
              <p>$ 20</p>
            </div>
            <hr></hr>
            <div className={classes["payment-area-line"]}>
              <h3>Order Total: </h3>
              <h3>$ {(totalPrice > 0 ? totalPrice + 20 : 0).toFixed(2)}</h3>
            </div>
            <div className={classes["payment-area-actions"]}>
              <Button
                ariaLabel="Cancel"
                info={true}
                onClickHandler={cancelOrderHandler}
              >
                Cancel
              </Button>
              <Button
                ariaLabel="Create order"
                success={true}
                disabled={getTotalQuantity() === 0 ? true : false}
                onClickHandler={createOrderHandler}
              >
                Create Order
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderForm;
