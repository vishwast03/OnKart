import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { medusa } from "../utils/medusa";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await medusa.products.list();

    setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="md:flex md:flex-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
