import { useReducer, useEffect } from "react";
import { CartContext } from "./CartContext";

// Función para obtener el estado inicial del localStorage
const getInitialState = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = getInitialState();

export const CartProvider = ({ children }) => {
  const comprasReducer = (state = initialState, action = {}) => {
    let newState;
    switch (action.type) {
      case "[CART] Add Purchase":
        newState = [...state, action.payload];
        break;
      case "[CART] Increase Purchase Quantity":
        newState = state.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        break;
      case "[CART] Decrease Purchase Quantity":
        newState = state.map((item) => {
          if (item.id === action.payload && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        break;
      case "[CART] Remove Purchase":
        newState = state.filter((purchase) => purchase.id !== action.payload);
        break;
      default:
        return state;
    }
    // Guardar el nuevo estado en localStorage
    localStorage.setItem("cart", JSON.stringify(newState));
    return newState;
  };

  const [shoppingList, dispatch] = useReducer(comprasReducer, initialState);

  // Efecto para guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const addPurchase = (purchase) => {
    const existingProduct = shoppingList.find(
      (item) => item.id === purchase.id
    );
    if (existingProduct) {
      dispatch({
        type: "[CART] Increase Purchase Quantity",
        payload: purchase.id,
      });
    } else {
      dispatch({
        type: "[CART] Add Purchase",
        payload: { ...purchase, quantity: 1 },
      });
    }
  };

  const increaseAmount = (id) => {
    dispatch({
      type: "[CART] Increase Purchase Quantity",
      payload: id,
    });
  };

  const decreaseAmount = (id) => {
    dispatch({
      type: "[CART] Decrease Purchase Quantity",
      payload: id,
    });
  };

  const removePurchase = (id) => {
    dispatch({
      type: "[CART] Remove Purchase",
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        shoppingList,
        addPurchase,
        increaseAmount,
        decreaseAmount,
        removePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
