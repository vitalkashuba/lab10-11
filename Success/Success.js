import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total || 0;

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Order Successful!</h2>
      <p>Your order has been successfully placed. Thank you for shopping with us!</p>
      <h4>Total Paid: ${total}</h4>
      <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Success