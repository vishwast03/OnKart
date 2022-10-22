import React from "react";
import currency from "currency.js";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const USD = (value) => currency(value, { symbol: "$", precision: 2 });

  return (
    <Link
      to={`/products/${product.id}`}
      className="block bg-gray-100 w-4/5 mx-auto my-4 font-montserrat rounded-md shadow-md md:w-72"
    >
      <img
        src={product.thumbnail}
        className="w-4/5 mx-auto"
        alt={product.title}
      />
      <div className="mx-6 py-4">
        <p>{product.title}</p>
        <p className="text-teal-500">
          <span className="text-xl font-bold">
            {USD(product.variants[0].prices[1].amount / 100).format(true)}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
