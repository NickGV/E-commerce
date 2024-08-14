import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const ProductCard = ({ product, handleAdd, handleRemove }) => {
  const { shoppingList } = useContext(CartContext);
  const clickAdd = () => {
    handleAdd();
    setAdded(true);
  };

  const clickRemove = () => {
    handleRemove();
  };

  const isAdded = shoppingList.map((item) => item.id).includes(product.id);

  return (
    <div className="bg-card-bg rounded-lg overflow-hidden flex flex-col shadow-sm shadow-gray-500 ">
      <div className="h-48 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-1/2 h-full mx-auto drop-shadow-white"
        />
      </div>
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-bold mb-2 text-white">{product.title}</h2>
        <p className="text-green-400 font-bold mb-4">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="p-4 flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 text-center  text-white py-2 rounded hover:underline hover:text-orange-500 transition duration-300"
        >
          View Details
        </Link>
        <button
          onClick={isAdded ? clickRemove : clickAdd}
          className={`flex-1 text-center py-2 rounded-lg transition duration-300 ${
            isAdded
              ? "bg-red-600 hover:bg-red-700"
              : "bg-black hover:bg-zinc-800"
          }`}
        >
          {isAdded ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
