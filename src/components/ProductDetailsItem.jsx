import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { StarRating } from "./StarRating";

export const ProductDetailsItem = ({ product }) => {
  const [added, setAdded] = useState(false);
  const { addPurchase, removePurchase } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [product]);

  const clickAdd = (product) => {
    addPurchase(product);
    setAdded(true);
  };

  const clickRemove = (id) => {
    removePurchase(id);
    setAdded(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-card-bg mt-8 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/12">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-20 object-cover mb-2 cursor-pointer rounded drop-shadow-white hover:opacity-75"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="md:w-5/12 ">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-140 object-cover drop-shadow-white"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-2">
              <StarRating rating={product.rating} />
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
          {added ? (
            <button
              className="w-full p-4 font-semibold bg-red-700 text-white rounded-md"
              onClick={() => clickRemove(product.id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="w-full p-4 bg-black text-white font-semibold rounded-md hover:bg-zinc-800 transition-colors"
              onClick={() => clickAdd(product)}
            >
              Buy now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
