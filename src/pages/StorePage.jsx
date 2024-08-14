// StorePage.jsx
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { ProductCard } from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export const StorePage = () => {
  const { products } = useContext(ProductsContext);
  const { addPurchase, removePurchase } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState("Featured");

  const handleAdd = (product) => {
    addPurchase(product);
  };

  const handleRemove = (id) => {
    removePurchase(id);
  };

  const handleTagFilter = (category) => {
    setCategory("");
    const filteredPost = products.filter((post) =>
      post.category.includes(category)
    );
    setFilteredProducts(filteredPost);
    setCategory(category);
  };

  const categories = [...new Set(products.map((product) => product.category))];
  console.log(filteredProducts);
  // groceries
  return (
    <div className=" text-white p-4">
      <div className="mb-4">
        <span className="font-bold text-3xl">Products</span>
      </div>
      <div className="flex mb-4 gap-8">
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={category}
          onChange={(e) => handleTagFilter(e.target.value)}
        >
          <option>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex items-center">
          <span className="mr-2">Price:</span>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-32"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category === "All Categories"
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAdd={() => handleAdd(product)}
                handleRemove={() => handleRemove(product.id)}
              />
            ))
          : filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAdd={() => handleAdd(product)}
                handleRemove={() => handleRemove(product.id)}
              />
            ))}
      </div>
    </div>
  );
};
