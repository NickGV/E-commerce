import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const NavBar = () => {
  const { shoppingList } = useContext(CartContext);

  return (
    <nav className="p-2 bg-slate-900 ">
      <ul className="flex items-center justify-between">
        <li className="text-2xl text-bol">
          <NavLink to="/">Awesome Store</NavLink>
        </li>
        <div className="flex gap-2">
          <li>
            <NavLink to="/">Store</NavLink>
          </li>
          <li className="relative">
            <NavLink to="/cart">
              <span className="material-symbols-outlined">shopping_cart</span>
            </NavLink>

            {shoppingList.length > 0 && (
              <span className="bg-blue-500 absolute rounded-full p-1 text-xs top-0 right-0 text-white "></span>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};
