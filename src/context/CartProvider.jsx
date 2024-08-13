import { useReducer } from "react";
import { CartContext } from "./CartContext";

const initialState = [];

export const CartProvider = ({ children }) => {
  const comprasReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case "[CART] Add Purchase":
        return [...state, action.payload];
      case "[CART] Increase Purchase Quantity":
        return state.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      case "[CART] Decrease Purchase Quantity":
        return state.map((item) => {
          if (item.id === action.payload && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      case "[CART] Remove Purchase":
        return state.filter((purchase) => purchase.id !== action.payload);
      default:
        return state;
    }
  };

  const [shoppingList, dispatch] = useReducer(comprasReducer, initialState);

  const addPurchase = (purchase) => {
    const existingProduct = shoppingList.find(item => item.id === purchase.id);
    if (existingProduct) {
      dispatch({ type: "[CART] Increase Purchase Quantity", payload: purchase.id });
    } else {
      const action = {
        type: "[CART] Add Purchase",
        payload: { ...purchase, quantity: 1 },
      };
      dispatch(action);
    }
  };

  const increaseAmount = (id) => {
    const action = {
      type: "[CART] Increase Purchase Quantity",
      payload: id,
    };
    dispatch(action);
  };

  const decreaseAmount = (id) => {
    const action = {
      type: "[CART] Decrease Purchase Quantity",
      payload: id,
    };
    dispatch(action);
  };

  const removePurchase = (id) => {
    const action = {
      type: "[CART] Remove Purchase",
      payload: id,
    };
    dispatch(action);
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
