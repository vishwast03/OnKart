import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { medusa } from "../utils/medusa";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51KjHsqSJm3jB2gJKi0T4b7RGVAz9OT6O885xqjRAgGDi5BrrySgmq5xdrXVBOLsGVewxwqny1CiKJRaklsYGNd2u00hWIRAqli"
);

const Checkout = ({ customer, cart, createCart, notify }) => {
  const [clientSecret, setClientSecret] = useState();

  medusa.carts.createPaymentSessions(cart.id).then(({ cart }) => {
    //check if stripe is selected
    const isStripeAvailable = cart.payment_sessions?.some(
      (session) => session.provider_id === "stripe"
    );
    if (!isStripeAvailable) {
      return;
    }

    //select stripe payment session
    medusa.carts
      .setPaymentSession(cart.id, {
        provider_id: "stripe",
      })
      .then(({ cart }) => {
        setClientSecret(cart.payment_session.data.client_secret);
      });
  });

  return (
    <div className="p-4 font-montserrat">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <PaymentForm
            clientSecret={clientSecret}
            customer={customer}
            cart={cart}
            createCart={createCart}
            notify={notify}
          />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
