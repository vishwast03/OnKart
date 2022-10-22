import React, { useEffect, useState } from "react";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { medusa } from "../utils/medusa";
import currency from "currency.js";

export const loader = async ({ params }) => {
  const { product } = await medusa.products.retrieve(params.productId);

  return product;
};

const Product = ({ customer, setCustomer, setCart, notify }) => {
  const product = useLoaderData();
  const [variant, setVariant] = useState(product.variants[0]);
  const [image, setImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const USD = (value) => currency(value, { symbol: "$", precision: 2 });

  const handleVariantChange = (index) => {
    setVariant(product.variants[index]);
    setQuantity(1);
  };

  const handleQuantityChange = (action) => {
    switch (action) {
      case "inc":
        if (quantity < variant.inventory_quantity) setQuantity(quantity + 1);
        break;

      case "dec":
        if (quantity > 1) setQuantity(quantity - 1);
        break;

      default:
        break;
    }
  };

  const handleImageChange = (id) => {
    setImage(product.images.find((img) => img.id === id));
  };

  const addToCart = async () => {
    if (!customer) {
      navigate("/login");
      return;
    }

    if (!customer.metadata) {
      const { cart } = await medusa.carts.create({
        items: [
          {
            variant_id: variant.id,
            quantity: quantity,
          },
        ],
      });

      const response = await medusa.customers.update({
        metadata: {
          cart_id: cart.id,
        },
      });

      setCustomer(response.customer);
      setCart(cart);
      notify("SUCCESS", "Item added to cart!");
    } else {
      const { cart } = await medusa.carts.lineItems.create(
        customer.metadata.cart_id,
        {
          variant_id: variant.id,
          quantity: quantity,
        }
      );

      setCart(cart);
      notify("SUCCESS", "Item added to cart!");
    }
  };

  return (
    <div className="p-4 font-montserrat md:flex">
      <div>
        <img
          className="w-10/12 mx-auto md:w-80"
          src={image.url}
          alt={product.title}
        />
        <div className="flex my-2">
          {product.images.map((imageItem) => (
            <img
              className={`w-12 border-4  rounded-md mx-2 ${
                image.id === imageItem.id
                  ? "border-teal-500"
                  : "border-gray-300"
              }`}
              key={imageItem.id}
              src={imageItem.url}
              alt={product.title}
              onClick={() => {
                handleImageChange(imageItem.id);
              }}
            />
          ))}
        </div>
      </div>

      <div className="md:ml-8">
        <p className="my-2 text-lg">{product?.title}</p>

        <p className="text-teal-500">
          <span className="text-xl font-bold">
            {USD(variant.prices[1].amount / 100).format(true)}
          </span>
        </p>

        <div className="mt-4">
          <p className="font-bold">Select Variant</p>
          <div className="my-1">
            {product.variants.map((variantItem, index) => (
              <button
                className={`m-1 px-3 py-1 rounded-md ${
                  variant.id === variantItem.id
                    ? "bg-zinc-900 text-gray-50"
                    : "bg-gray-200"
                }`}
                key={variantItem.id}
                onClick={() => {
                  handleVariantChange(index);
                }}
              >
                {variantItem.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="font-bold">Select Quantity</p>

          <div className="my-1 w-fit flex justify-center items-center">
            <button
              className="text-xl font-bold"
              onClick={() => {
                handleQuantityChange("dec");
              }}
            >
              -
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              className="text-xl font-bold"
              onClick={() => {
                handleQuantityChange("inc");
              }}
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="px-3 py-1 rounded-md bg-zinc-900 text-gray-50"
            onClick={() => {
              addToCart();
            }}
          >
            Add to cart
          </button>
        </div>

        <div>
          <h2 className="mt-5 text-xl font-bold">Product Description</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
