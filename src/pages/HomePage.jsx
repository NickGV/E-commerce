import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import beauty from "../assest/beauty.jpg";
import furniture from "../assest/furniture.jpg";
import groceries from "../assest/groceries.jpg";
import fragances from "../assest/fragances.jpg";
import { RandomProductItem } from "../components/RandomProductItem";
import { NavLink } from "react-router-dom";
// import electronics from "../assest/electronics.jpg";
// import fashion from "../assest/fashion.jpg";
// import food from "../assest/food.jpg";
// import health from "../assest/health.jpg";
// import home from "../assest/home.jpg";

export const HomePage = () => {
  const { products, randomProducts, topRatedProducts } =
    useContext(ProductsContext);
  const { addPurchase, removePurchase } = useContext(CartContext);

  return (
    <div className="p-4 flex flex-col gap-4">
      <section>
        <h2 className="text-2xl font-bold mb-3">Some Products</h2>
        <ul className="flex gap-4">
          {randomProducts.map((product) => (
            <RandomProductItem key={product.id} product={product} />
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-3">Categories</h2>
        <ul className="flex gap-4">
          <li className="flex flex-col items-center w-40 p-4 bg-card-bg rounded-lg hover:scale-110 hover:cursor-pointer transition-all">
            <img
              src={beauty}
              alt="beauty"
              className="rounded-50 max-w-28 h-28"
            />
            <h3 className="text-xl font-semibold">Beauty</h3>
          </li>
          <li className="flex flex-col items-center w-40 p-4 bg-card-bg rounded-lg hover:scale-110 hover:cursor-pointer transition-all">
            <img
              src={fragances}
              alt="fragances"
              className="rounded-50 max-w-28 h-28"
            />
            <h3 className="text-xl font-semibold">Fragances</h3>
          </li>
          <li className="flex flex-col items-center w-40 p-4 bg-card-bg rounded-lg hover:scale-110 hover:cursor-pointer transition-all">
            <img
              src={groceries}
              alt="groceries"
              className="rounded-50 max-w-28 h-28"
            />
            <h3 className="text-xl font-semibold">Groceries</h3>
          </li>
          <li className="flex flex-col items-center w-40 p-4 bg-card-bg rounded-lg hover:scale-110 hover:cursor-pointer transition-all">
            <img
              src={furniture}
              alt="furniture"
              className="rounded-50 max-w-28 h-28"
            />
            <h3 className="text-xl font-semibold">Furnitures</h3>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-3">Best rating</h2>
        <ul className="flex gap-4">
          {topRatedProducts.map((product) => (
            <NavLink
              to={`/product/${product.id}`}
              key={product.id}
              className="relative flex flex-col 2xl:w-1/3 md:w-2/5 2xl bg-card-bg rounded-lg gap-4 p-4 hover:scale-105 transition-transform"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="w-64 h-64">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="rounded-lg shadow bg-white object-cover w-full h-full"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-lg mt-10">
                      {product.title}
                    </p>
                    <p className="text-sm mt-2 text-gray-400">
                      {product.description}
                    </p>
                  </div>
                  <p className="mt-4 text-xl font-bold text-green-600">
                    ${product.price}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-yellow-400 text-white font-bold rounded-full px-4 py-1 shadow-md">
                ⭐ {product.rating}
              </div>
            </NavLink>
          ))}
        </ul>
      </section>
    </div>
  );
};
