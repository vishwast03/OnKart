import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { medusa } from "../utils/medusa";

const Register = ({ setCustomer, notify }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const createCustomer = async (e) => {
    e.preventDefault();

    const { exists } = await medusa.auth.exists(email);

    if (exists) {
      notify("ERROR", "An account with this email already exists!");
    } else {
      const responnse = await medusa.customers.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });

      setCustomer(responnse.customer);
      navigate("/");
    }
  };

  return (
    <div className="text-zinc-900 font-montserrat">
      <div className="w-11/12 mx-auto mt-10 flex flex-col md:w-96">
        <h2 className="text-3xl font-bold">Register</h2>
        <form className="pt-4 flex flex-col" onSubmit={createCustomer}>
          <label htmlFor="first_name" className="mt-2">
            First Name
          </label>
          <input
            type="text"
            className="p-1 border-2 border-zinc-900 rounded-md"
            name="first_name"
            id="first_name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />

          <label htmlFor="last_name" className="mt-2">
            Last Name
          </label>
          <input
            type="text"
            className="p-1 border-2 border-zinc-900 rounded-md"
            name="last_name"
            id="last_name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />

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
            required
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
            required
          />

          <button
            type="submit"
            className="mt-4 p-1 bg-zinc-900 text-gray-50 text-lg text-semibold rounded-md"
          >
            Register
          </button>
        </form>

        <p className="mt-4">
          Already have an OnKart account?{" "}
          <Link to="/login" className="text-blue-700">
            Login.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
