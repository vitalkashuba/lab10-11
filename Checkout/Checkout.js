import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FormErrorMessage from "../FormErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../redux/actions";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const total = useSelector((state) => 
      state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
        },
        validationSchema: Yup.object({
          firstName: Yup.string()
            .matches(/^[a-zA-Z]+$/, "First name can only contain letters")
            .max(15, "Max 15 characters")
            .required("First name is required"),
          lastName: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Last name can only contain letters")
            .max(20, "Max 20 characters")
            .required("Last name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          phone: Yup.number()
            .typeError("Phone number must be numeric")
            .required("Phone number is required"),
          address: Yup.string()
            .min(10, "Address should be at least 10 characters")
            .required("Address is required"),
        }),
        onSubmit: (values) => {
          console.log("Form submitted:", values);
          dispatch(clearCart());  // Clear the cart
          navigate("/success", { state: { total } });  // Pass total to success page
        },
      });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <form onSubmit={formik.handleSubmit} className="shadow p-4 rounded bg-white">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <FormErrorMessage message={formik.errors.firstName} />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <FormErrorMessage message={formik.errors.lastName} />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <FormErrorMessage message={formik.errors.email} />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <FormErrorMessage message={formik.errors.phone} />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            id="address"
            className="form-control"
            rows="3"
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address && (
            <FormErrorMessage message={formik.errors.address} />
          )}
        </div>

        <button type="submit" className="btn btn-dark w-100">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
