import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { ProductCard } from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export const StorePage = () => {
  const { products } = useContext(ProductsContext);
  const { addPurchase, removePurchase } = useContext(CartContext);

  const handleAdd = (product) => {
    addPurchase(product);
  };

  const handleRemove = (id) => {
    removePurchase(id);
  };
  console.log(products.products)

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Store</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.images[0]}
            handleAdd={() => handleAdd(product)}
            handleRemove={() => handleRemove(product.id)}
          />
        ))} */}
      </section>
    </div>
  );
};
