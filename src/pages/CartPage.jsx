import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";

export const CartPage = () => {
  const { shoppingList, increaseAmount, decreaseAmount, removePurchase } =
    useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const subtotal = shoppingList
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const shipping = 5.9;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  return (
    <section className="flex justify-center items-center min-h-screen w-full p-4">
      <div className="container flex flex-col lg:flex-row gap-8 text-white">
        <div className="w-full lg:w-2/3 bg-card-bg p-4 sm:p-8 rounded-lg">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Shopping Cart</h1>
          {shoppingList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2 hidden sm:table-cell">Material</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Total Cost</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {shoppingList.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.brand}</p>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">{item.material || "N/A"}</td>
                      <td>
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseAmount(item.id)}
                            className="px-2"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => increaseAmount(item.id)}
                            className="px-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => removePurchase(item.id)}
                          className="text-red-500 text-xl hover:scale-105 transition-all"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>
              Your cart is empty.{" "}
              <NavLink to="/store" className="text-blue-500">
                Continue shopping
              </NavLink>
            </p>
          )}
          <div className="mt-4">
            <p>Subtotal: ${subtotal}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <p className="font-bold">Total: ${total}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/3 p-4 sm:p-6 bg-card-bg rounded-lg">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Payment Info</h2>
          <div className="mb-4">
            <p className="mb-2">Payment Method</p>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("Credit Card")}
                className={`px-4 py-2 rounded ${
                  paymentMethod === "Credit Card" ? "bg-zinc-800" : "bg-black"
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod("PayPal")}
                className={`px-4 py-2 rounded ${
                  paymentMethod === "PayPal" ? "bg-zinc-800" : "bg-black"
                }`}
              >
                PayPal
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Cardholder Name</label>
            <input
              type="text"
              className="w-full p-2 bg-transparent rounded"
              placeholder="EcoBuyer"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Card Number</label>
            <input
              type="text"
              className="w-full p-2 bg-transparent rounded"
              placeholder="**** **** **** 9876"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">Expiration Date</label>
              <input
                type="text"
                className="w-full p-2 bg-transparent rounded"
                placeholder="MM / YYYY"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">CVV</label>
              <input
                type="text"
                className="w-full p-2 bg-transparent rounded"
                placeholder="***"
              />
            </div>
          </div>
          <button className="w-full bg-black hover:bg-zinc-800 text-white py-4 rounded-lg">
            Confirm Payment ${total}
          </button>
        </div>
      </div>
    </section>
  );
};