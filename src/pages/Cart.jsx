import React from "react";
import Subtotal from "../components/Subtotal";
import { medusa } from "../utils/medusa";
import currency from "currency.js";

const Cart = ({ cart, setCart }) => {
  const USD = (value) => currency(value, { symbol: "$", precision: 2 });

  const removeFromCart = async (itemId) => {
    const response = await medusa.carts.lineItems.delete(cart.id, itemId);

    setCart(response.cart);
  };

  return (
    <div className="p-4 font-montserrat md:flex md:w-11/12 md:items-start">
      <div className="md:flex-1">
        <h1 className="text-xl font-bold">Your cart</h1>
        <div>
          {cart.items.map((cartItem) => (
            <div
              key={cartItem.id}
              className="w-11/12 mx-auto my-4 flex bg-gray-100 rounded-md shadow-md"
            >
              <img
                className="w-28 md:w-40"
                src={cartItem.thumbnail}
                alt={cartItem.title}
              />

              <div className="pt-4">
                <p className="text-sm md:text-lg">{`${cartItem.title} - ${cartItem.variant.title}`}</p>
                <p className="text-xs my-2 md:text-base">
                  Quantity:{" "}
                  <span className="font-semibold">{cartItem.quantity}</span>
                </p>
                <p className="text-teal-500 my-2 md:text-lg">
                  <span className="font-bold">
                    {USD(cartItem.total / 100).format(true)}
                  </span>
                </p>

                <div>
                  <button
                    className="px-2 py-1 rounded-md bg-zinc-900 text-xs text-gray-50 md:text-sm"
                    onClick={() => {
                      removeFromCart(cartItem.id);
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Subtotal subtotal={cart.subtotal} />
    </div>
  );
};

export default Cart;
