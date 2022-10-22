import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const Navbar = ({ customer, logoutCustomer, cart }) => {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (customer) {
      logoutCustomer();
    } else {
      navigate("/login");
    }
  };

  return (
    <IconContext.Provider value={{ className: "text-gray-50 text-2xl" }}>
      <nav className="font-montserrat bg-zinc-900 h-fit flex justify-between">
        <Link to="/" className="p-2 flex justify-center items-center">
          <img className="h-8" src="/onkart-logo.png" alt="OnKart Logo" />
          <span className="text-gray-50 text-lg font-bold">OnKart</span>
        </Link>

        <div className="flex align-center">
          <button
            onClick={handleLoginLogout}
            className="mr-4 flex justify-center items-center"
          >
            <FiUser />

            <div className="my-1 flex flex-col text-xs text-gray-50">
              <span>{`Hello, ${customer ? customer.first_name : "User"}`}</span>
              <span className="font-bold">
                {customer ? "Log Out" : "Log In"}
              </span>
            </div>
          </button>

          <Link to="/cart" className="flex justify-center items-center">
            <FiShoppingCart />

            <span className="text-gray-50 text-lg mx-1">
              {cart ? cart.items.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
