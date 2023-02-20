/** @format */
import { useCallback, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import classes from "./Header.module.css";
import Modal from "../Modal/Modal";

import telephone from "../../images/telephone-symbol-button.png";
import facebook from "../../images/fb.png";
import twitter from "../../images/twitter.png";
import instagram from "../../images/instagram.png";
import logo from "../../images/logo.png";
import shoppingcartcompressed from "../../images/shopping-cart-compressed.png";
import ProductItem from "../../components/home/ProductItem";
import Button from "../Button/Button";
import { useAppSelector } from "../../store/hooks";

const Header: React.FC = (props) => {
  const cart = useAppSelector((state) => state.cart);
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const [mobileHeaderChecked, setMobileHeaderChecked] = useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const closeModal = useCallback(() => {
    setModalState(false);
  }, []);

  const navigateToCreateOrder = () => {
    closeModal();
    navigate("/orders/new");
  };

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <Modal
        show={modalState}
        closed={closeModal}
        onConfirm={closeModal}
        title="Shopping Cart"
        customFooter={false}
      >
        <>
          <div className={classes["modal-order-container"]}>
            <div className={classes["modal-order-price"]}>
              <span>Total Price:</span>
              <span> $ {0}</span>
            </div>
            <Button
              ariaLabel="Create order"
              success={true}
              disabled={getTotalQuantity() === 0 ? true : false}
              onClickHandler={navigateToCreateOrder}
            >
              Create Order
            </Button>
          </div>
          {getTotalQuantity() === 0 ? (
            <h2>No items in shopping cart!</h2>
          ) : (
            cart.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  product={product}
                  shouldRenderActions={true}
                ></ProductItem>
              );
            })
          )}
        </>
      </Modal>

      <header className={classes["header-section"]}>
        <div className={classes.container}>
          <div className={classes["top-contact-container"]}>
            <div className={classes["tel-container"]}>
              <a href="true" rel="noreferrer">
                <img src={telephone} alt="Telephone symbol."></img>
                Call +01 987 654 321
              </a>
            </div>
            <div className={classes["social-container"]}>
              <a href="true" rel="noreferrer">
                <img src={facebook} alt="Facebook icon."></img>
                <img src={twitter} alt="Twitter icon."></img>
                <img src={instagram} alt="Instagram icon."></img>
              </a>
            </div>
          </div>
        </div>
        <div
          style={mobileHeaderChecked ? { paddingBottom: "1rem" } : undefined}
          className={classes["container-fluid"]}
        >
          <nav className={classes["mobile-header"]}>
            <div className={classes["mobile-header-logo"]}>
              <NavLink to="/" className={classes["navbar-brand"]} end>
                <img src={logo} alt="Company logo"></img>
                <span>MedDist</span>
              </NavLink>
            </div>
            <div className={classes["mobile-nav-button"]}>
              <input
                className={classes["mobile-header-menu-btn"]}
                type="checkbox"
                checked={mobileHeaderChecked}
                onChange={() => {
                  setMobileHeaderChecked((prevState) => {
                    return !prevState;
                  });
                }}
                id="mobile-header-menu-btn"
              />
              <label
                className={classes["mobile-header-menu-icon"]}
                htmlFor="mobile-header-menu-btn"
              >
                <span className={classes["mobile-header-navicon"]}></span>
              </label>
              <button
                type="button"
                aria-label="Shopping cart"
                className={classes["shopping-cart"]}
                onClick={showModal}
              >
                <span>({getTotalQuantity() || 0})</span>
                <img
                  src={shoppingcartcompressed}
                  alt="Shopping cart icon"
                ></img>
              </button>
              <ul className={classes["mobile-header-menu"]}>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${classes["navbar-nav-link"]} ${
                        isActive ? classes.active : ""
                      }`
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `${classes["navbar-nav-link"]} ${
                        isActive ? classes.active : ""
                      }`
                    }
                    end
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `${classes["navbar-nav-link"]} ${
                        isActive ? classes.active : ""
                      }`
                    }
                    end
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <nav className={classes.navbar}>
            <div className={classes["navbar-logo-menu-container"]}>
              <NavLink to="/" className={classes["navbar-brand"]} end>
                <img src={logo} alt="Company logo"></img>
                <span>MedDist</span>
              </NavLink>
              <ul className={classes["navbar-nav"]}>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${classes["navbar-nav-link"]} ${
                        isActive ? classes.active : ""
                      }`
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `${classes["navbar-nav-link"]} ${
                        isActive ? classes.active : ""
                      }`
                    }
                    end
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `${classes["navbar-nav-link"]} ${
                        isActive ? classes.active : ""
                      }`
                    }
                    end
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
            <button
              type="button"
              aria-label="Shopping cart"
              className={classes["shopping-cart"]}
              onClick={showModal}
            >
              <span>({getTotalQuantity() || 0})</span>
              <img src={shoppingcartcompressed} alt="Shopping cart icon"></img>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
