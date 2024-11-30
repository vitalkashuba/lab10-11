import React from "react";
import "./CartItem.css";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/actions.js";

const CartItem = ({ item, onIncrease, onDecrease }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="cart-item-details">
        <span className="fw-bold">
          {item.artist} - {item.title}, {item.format}
        </span>
        <span className="text-muted">${item.price}</span>
      </div>
      <div className="cart-item-quantity d-flex align-items-center">
        <button className="btn btn-dark btn-sm me-2" onClick={onDecrease}>
          -
        </button>
        <span className="quantity-text">{item.quantity}</span>
        <button className="btn btn-dark btn-sm ms-2" onClick={onIncrease}>
          +
        </button>
      </div>
      <button className="btn btn-danger btn-sm ms-3" onClick={handleRemove}>
        Remove
      </button>
    </li>
  );
};

export default CartItem;
