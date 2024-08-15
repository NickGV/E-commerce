// StorePage.jsx
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { ProductCard } from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export const StorePage = () => {
  const {
    products,
    categoriesList,
    filteredProducts,
    fetchProductsByCategory,
  } = useContext(ProductsContext);
  const { addPurchase, removePurchase } = useContext(CartContext);
  const [filter, setfilter] = useState("");

  const { category } = useParams();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    addPurchase(product);
  };

  const handleRemove = (id) => {
    removePurchase(id);
  };

  const handleTagFilter = (category) => {
    setfilter("");
    fetchProductsByCategory(category);
    navigate(`/store/${category}`);
    setfilter(category);
  };

  useEffect(() => {
    setfilter(category || "all");
    fetchProductsByCategory(category || "all");
  }, [category]);

  console.log(filteredProducts);

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
          <option value={"all"}>All Categories</option>
          {categoriesList &&
            categoriesList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(filter === "all" ? products : filteredProducts).map((product) => (
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
