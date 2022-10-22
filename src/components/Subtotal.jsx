import React from "react";
import currency from "currency.js";
import { Link } from "react-router-dom";

const Subtotal = ({ subtotal }) => {
  const USD = (value) => currency(value, { symbol: "$", precision: 2 });

  return (
    <div className="font-montserrat w-11/12 mx-auto p-4 bg-gray-100 rounded-md shadow-md md:w-64">
      <h2>Subtotal</h2>
      <p className="text-teal-500">
        <span className="text-xl font-bold">
          {USD(subtotal / 100).format(true)}
        </span>
      </p>

      <Link
        to="/checkout"
        className="block w-fit py-1 px-2 my-2 bg-zinc-900 text-gray-50 text-sm text-semibold rounded-md"
      >
        Proceed to checkout
      </Link>
    </div>
  );
};

export default Subtotal;
