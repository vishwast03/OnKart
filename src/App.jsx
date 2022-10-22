import React, { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product, { loader } from "./pages/Product";
import Register from "./pages/Register";
import { medusa } from "./utils/medusa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState(null);

  const fetchCustomer = async () => {
    const response = await medusa.auth.getSession();

    setCustomer(response.customer);

    fetchCart(response.customer);
  };

  const fetchCart = async (customer) => {
    if (customer.metadata) {
      const res = await medusa.carts.retrieve(customer.metadata.cart_id);

      setCart(res.cart);
    }
  };

  const createCart = async () => {
    const { cart } = await medusa.carts.create();

    const response = await medusa.customers.update({
      metadata: {
        cart_id: cart.id,
      },
    });

    setCustomer(response.customer);
    setCart(cart);
  };

  const logoutCustomer = async () => {
    await medusa.auth.deleteSession();

    setCustomer(null);
    setCart(null);
    notify("SUCCESS", "Logged out successfully!");
  };

  const notify = (type, message) => {
    switch (type) {
      case "INFO":
        toast.info(message);
        break;

      case "SUCCESS":
        toast.success(message);
        break;

      case "WARNING":
        toast.warn(message);
        break;

      case "ERROR":
        toast.error(message);
        break;

      default:
        toast(message);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <Navbar
                customer={customer}
                logoutCustomer={logoutCustomer}
                cart={cart}
              />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar
                customer={customer}
                logoutCustomer={logoutCustomer}
                cart={cart}
              />
              <Login
                setCustomer={setCustomer}
                fetchCart={fetchCart}
                notify={notify}
              />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar
                customer={customer}
                logoutCustomer={logoutCustomer}
                cart={cart}
              />
              <Register setCustomer={setCustomer} notify={notify} />
            </>
          }
        />
        <Route
          path="/products/:productId"
          loader={loader}
          element={
            <>
              <Navbar
                customer={customer}
                logoutCustomer={logoutCustomer}
                cart={cart}
              />
              <Product
                customer={customer}
                setCustomer={setCustomer}
                setCart={setCart}
                notify={notify}
              />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar
                customer={customer}
                logoutCustomer={logoutCustomer}
                cart={cart}
              />
              <Cart cart={cart} setCart={setCart} />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar
                customer={customer}
                logoutCustomer={logoutCustomer}
                cart={cart}
              />
              <Checkout
                customer={customer}
                cart={cart}
                createCart={createCart}
                notify={notify}
              />
            </>
          }
        />
      </>
    )
  );

  return (
    <>
      <ToastContainer autoClose={4000} position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
