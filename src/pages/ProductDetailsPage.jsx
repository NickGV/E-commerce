import { NavLink, useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { ProductDetailsItem } from "../components/ProductDetailsItem";
import { useContext, useEffect, useState } from "react";
import { RandomProductItem } from "../components/RandomProductItem";
import { StarRating } from "../components/StarRating";
import { format } from "date-fns";

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { products } = useContext(ProductsContext);
  const { id } = useParams();

  useEffect(() => {
    const currentProduct = products.find((p) => p.id === parseInt(id));
    setProduct(currentProduct);

    if (currentProduct) {
      const filteredProducts = products.filter(
        (p) =>
          p.category === currentProduct.category && p.id !== currentProduct.id
      );
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      const similarProducts = shuffled.slice(0, 3);
      setSimilarProducts(similarProducts);
    }
  }, [id, products]);

  const goBack = () => {
    window.history.back();
  };

  if (!product) return <p>Product not found</p>;

  return (
    <section>
      <div className="mb-16">
        <div className="md:ml-36 ml-4 pt-4">
          <NavLink to="/" className="hover:text-orange-500 hover:underline">
            Home/
          </NavLink>
          <NavLink to="/store" className="hover:text-orange-500 hover:underline">
            Store/
          </NavLink>
          <NavLink
            to={`/product/${product.id}`}
            className="hover:text-orange-500 hover:underline"
          >
            {product.title}
          </NavLink>
        </div>
        <ProductDetailsItem product={product} />
      </div>
      <div className="my-8 p-4">
        <h2 className="text-center text-3xl font-bold mb-8">
          Similar Products
        </h2>
        <div className="flex gap-4 justify-center">
          {similarProducts.map((product) => (
            <RandomProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Customer Reviews
        </h1>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div
              key={review.reviewerEmail}
              className="border-b border-gray-300 py-6 mb-6 last:border-b-0"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <StarRating rating={review.rating} />
                  <span className="ml-3 font-semibold text-gray-700">
                    {review.reviewerName}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(review.date), "MMMM dd, yyyy")}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </section>
  );
};
