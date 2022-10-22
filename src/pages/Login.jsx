import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { medusa } from "../utils/medusa";

const Login = ({ setCustomer, fetchCart, notify }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();

    const { exists } = await medusa.auth.exists(email);

    if (exists) {
      const response = await medusa.auth.authenticate({
        email: email,
        password: password,
      });

      setCustomer(response.customer);
      fetchCart(response.customer);
      navigate("/");
    } else {
      notify("ERROR", "There is no account with this email address!");
    }
  };

  return (
    <div className="text-zinc-900 font-montserrat">
      <div className="w-11/12 mx-auto mt-10 flex flex-col md:w-96">
        <h2 className="text-3xl font-bold">Log In</h2>
        <form className="pt-4 flex flex-col" onSubmit={authenticate}>
          <label htmlFor="email" className="mt-2">
            Email
          </label>
          <input
            type="email"
            className="p-1 border-2 border-zinc-900 rounded-md"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            type="password"
            className="p-1 border-2 border-zinc-900 rounded-md"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mt-4 p-1 bg-zinc-900 text-gray-50 text-lg text-semibold rounded-md"
          >
            Log In
          </button>
        </form>

        <p className="mt-4">
          Don't have an OnKart account?{" "}
          <Link to="/register" className="text-blue-700">
            Register.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
