import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";

import { RandomProductItem } from "../components/RandomProductItem";
import { NavLink } from "react-router-dom";
import beauty from "../assest/beauty.webp";
import fragrances from "../assest/fragrances.webp";
import furniture from "../assest/furniture.webp";
import groceries from "../assest/groceries.webp";
import homeDecoration from "../assest/home-decoration.webp";
import kitchenAccessories from "../assest/kitchen-accessories.jpg";
import laptops from "../assest/laptops.webp";
import mensShirts from "../assest/mens-shirts.webp";
import mensShoes from "../assest/mens-shoes.jpg";
import mensWatches from "../assest/mens-watches.jpg";
import mobileAccessories from "../assest/mobile-accessories.webp";
import motorcycle from "../assest/motorcycle.jpg";
import skinCare from "../assest/skin-care.webp";
import smartphones from "../assest/smartphones.jpg";
import sportsAccessories from "../assest/sports-accessories.jpg";
import sunglasses from "../assest/sunglasses.jpg";
import tablets from "../assest/tablets.webp";
import tops from "../assest/tops.jpg";
import vehicle from "../assest/vehicle.webp";
import womensBags from "../assest/womens-bags.jpg";
import womensDresses from "../assest/womens-dresses.webp";
import womensJewellery from "../assest/womens-jewellery.webp";
import womensShoes from "../assest/womens-shoes.jpg";
import womensWatches from "../assest/womens-watches.webp";

const categoryImages = {
  beauty,
  fragrances,
  furniture,
  groceries,
  "home-decoration": homeDecoration,
  "kitchen-accessories": kitchenAccessories,
  laptops,
  "mens-shirts": mensShirts,
  "mens-shoes": mensShoes,
  "mens-watches": mensWatches,
  "mobile-accessories": mobileAccessories,
  motorcycle,
  "skin-care": skinCare,
  smartphones,
  "sports-accessories": sportsAccessories,
  sunglasses,
  tablets,
  tops,
  vehicle,
  "womens-bags": womensBags,
  "womens-dresses": womensDresses,
  "womens-jewellery": womensJewellery,
  "womens-shoes": womensShoes,
  "womens-watches": womensWatches,
};
export const HomePage = () => {
  const { randomProducts, topRatedProducts, categories } =
    useContext(ProductsContext);

  console.log(categories);

  return (
    <div className="p-4 flex flex-col gap-4">
      <section>
        <h2 className="text-2xl font-bold mb-3">Some Products</h2>
        <ul className="md:flex grid grid-flow-col gap-4 overflow-x-auto w-full">
          {randomProducts.map((product) => (
            <RandomProductItem key={product.id} product={product} />
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-3">Categories</h2>
        <ul className="grid grid-flow-col gap-4 overflow-x-auto max-width-full">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={`/store/${category.slug}`}
              className="flex flex-col items-center justify-center md:w-56 w-36 p-4 bg-card-bg rounded-lg hover:scale-110 hover:cursor-pointern transition-all"
            >
              <img
                src={categoryImages[category.slug]}
                alt={category.slug}
                className="rounded-50 md:max-w-28 md:h-28 max-w-16 h-16"
              />
              <h3 className="md:text-xl text-lg font-semibold">
                {category.name}
              </h3>
            </NavLink>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-3">Best rating</h2>
        <ul className="flex gap-4">
          {topRatedProducts.map((product) => (
            <NavLink
              to={`/product/${product.id}`}
              key={product.id}
              className="relative flex flex-col 2xl:w-1/3 md:w-2/5 w-1/2 bg-card-bg rounded-lg gap-4 p-4 hover:scale-105 transition-transform"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <div className="md:w-64 md:h-64">
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
                    <p className="text-sm mt-2 md:block hidden text-gray-400">
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
