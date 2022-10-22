import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { medusa } from "../utils/medusa";

export default function Form({
  clientSecret,
  customer,
  cart,
  createCart,
  notify,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  async function handlePayment(e) {
    e.preventDefault();

    await medusa.customers.addresses.addAddress({
      address: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        address_1: address1,
        city: city,
        country_code: "US",
        postal_code: postalCode,
        address_2: address2,
      },
    });

    return stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: cart.email,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        //TODO handle errors
        medusa.carts.complete(cart.id).then((resp) => {
          createCart();
          navigate("/");
          notify("SUCCESS", "Order placed successfully!");
        });
      });
  }

  return (
    <form className="font-montserrat md:w-96 md:mx-auto">
      <div>
        <h2 className="text-xl font-bold py-4">Address Information</h2>

        <label className="flex flex-col my-2" htmlFor="address_1">
          Address Line 1*
          <input
            className="mt-1 p-1 border-2 border-zinc-900 rounded-md"
            type="text"
            name="address_1"
            id="address_1"
            value={address1}
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col my-2" htmlFor="address_2">
          Address Line 2
          <input
            className="mt-1 p-1 border-2 border-zinc-900 rounded-md"
            type="text"
            name="address_2"
            id="address_2"
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
          />
        </label>

        <label className="flex flex-col my-2" htmlFor="city">
          City*
          <input
            className="mt-1 p-1 border-2 border-zinc-900 rounded-md"
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col my-2" htmlFor="country">
          Country*
          <input
            className="mt-1 p-1 border-2 border-zinc-900 rounded-md"
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col my-2" htmlFor="postal_code">
          Postal Code*
          <input
            className="mt-1 p-1 border-2 border-zinc-900 rounded-md"
            type="text"
            name="postal_code"
            id="postal_code"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
            required
          />
        </label>
      </div>

      <div className="mt-2">
        <h2 className="text-xl font-bold py-4">Payment</h2>

        <CardElement />
      </div>
      <button
        className="w-fit py-1 px-2 my-4 bg-zinc-900 text-gray-50 text-sm text-semibold rounded-md"
        onClick={handlePayment}
      >
        Submit
      </button>
    </form>
  );
}
