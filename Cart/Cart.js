import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import Footer from "../Home/Footer/Footer";
import CartItem from "./CartItem/CartItem";
import { increaseQuantity, decreaseQuantity } from "../../redux/actions.js";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return Math.ceil(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  };

  return (
    <div className="cart-page d-flex flex-column align-items-center">
      <div className="cart-container shadow p-4 mt-4 mb-4 bg-white rounded animate__animated animate__fadeInUp">
        <h2 className="text-center mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Your items will appear here</p>
        ) : (
          <>
            <ul className="list-group">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => dispatch(increaseQuantity(item.id))}
                  onDecrease={() => dispatch(decreaseQuantity(item.id))}
                />
              ))}
            </ul>
            <div className="cart-total text-end mt-4">
              <h4>Total: ${calculateTotal()}</h4>
            </div>
            <button className="btn btn-success w-100 mt-3">Buy Now</button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
