import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";

export const CartPage = () => {
  const { shoppingList, increaseAmount, decreaseAmount, removePurchase } =
    useContext(CartContext);

  const total = () => {
    return shoppingList
      .reduce((total, item) => total + item.price * item.amount, 0)
      .toFixed(2);
  };

  const handleImpresion = () => {
    print();
  };

  return (
    <>
      {shoppingList.length > 0 ? (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NAME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  PRICE
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  AMOUNT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  REMOVE
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {shoppingList.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <img src={item.image} alt="" className="w-14 rounded-lg " />
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        className="mr-1  text-xl text-white px-2 py-1 "
                        onClick={() => decreaseAmount(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-1">{item.amount}</span>
                      <button
                        className="ml-1 text-xl text-white px-2 py-1 "
                        onClick={() => increaseAmount(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-300"
                      onClick={() => removePurchase(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4" colSpan="3">
                  <b>TOTAL:</b>
                </td>
                <td className="px-6 py-4">${total()}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleImpresion}
              disabled={shoppingList.length < 1}
            >
              Buy
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h2>There is nothing here yet</h2>
            <NavLink to="/" className="text-blue-500">
              Visit the store
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
