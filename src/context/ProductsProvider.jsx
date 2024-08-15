import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

export const ProductsProvider = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  const fetchproducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=200");
    const data = await response.json();
    const products = data.products;
    setproducts(products);

    const shuffled = products.sort(() => 0.5 - Math.random());
    const selectedRandomProducts = shuffled.slice(0, 4);
    setRandomProducts(selectedRandomProducts);

    const topRated = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
    setTopRatedProducts(topRated);
  };

  const fetchCategoriesList = async () => {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );
    const data = await response.json();
    setCategoriesList(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchproducts();
    fetchCategories();
    fetchCategoriesList();
  }, []);

  const fetchProductsByCategory = async (category) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    const products = data.products;
    setFilteredProducts(products);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        categoriesList,
        randomProducts,
        topRatedProducts,
        fetchProductsByCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
