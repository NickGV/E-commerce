import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

export const ProductsProvider = ({ children }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  const fetchproducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const products = data.products;
    setproducts(products);

    setUniqueCategories([
      ...new Set(products.map((product) => product.category)),
    ]);
    const shuffled = products.sort(() => 0.5 - Math.random());
    const selectedRandomProducts = shuffled.slice(0, 4);
    setRandomProducts(selectedRandomProducts);

    const topRated = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
    setTopRatedProducts(topRated);
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, uniqueCategories, randomProducts, topRatedProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
