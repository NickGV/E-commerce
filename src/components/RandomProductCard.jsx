import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export const RandomProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);
  const { addPurchase, removePurchase } = useContext(CartContext);
  const clickAdd = (product) => {
    addPurchase(product);
    setAdded(true);
  };

  const clickRemove = (id) => {
    removePurchase(id);
    setAdded(false);
  };
  return (
    <li
      key={product.id}
      className="flex flex-col w-1/4 gap-4 bg-card-bg p-4 rounded-lg"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="w-40 h-40">
          <img
            src={product.images[0]}
            alt=""
            className="rounded-lg shadow bg-white w-full h-full"
          />
        </div>
        <p className="flex flex-col ">
          <span className="font-semibold text-xl">{product.title}</span>
          <span className="text-lg text-gray-900 font-bold">
            ${product.price}
          </span>
        </p>
      </div>
      {added ? (
        <button
          className="w-full p-2 bg-red-700 text-white rounded-md mt-3"
          onClick={() => clickRemove(product.id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="w-full p-2 bg-black text-white rounded-md mt-3  hover:bg-zinc-800 transition-colors"
          onClick={() => clickAdd(product)}
        >
          add to Cart
        </button>
      )}
    </li>
  );
};
