import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "../assest/logo.png";

export const NavBar = () => {
  const { shoppingList } = useContext(CartContext);

  return (
    <nav className="fixed top-0 left-0 shadow-sm z-10 shadow-white right-0 p-2 bg-card-bg">
      <ul className="flex items-center justify-between">
        <li className="text-2xl text-bol">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-12 h-12" />
            Awesome Store
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/store/all"
            className="text-2xl hover:text-gray-400 transition-colors"
          >
            Store
          </NavLink>
        </li>
        <li className="relative">
          <NavLink to="/cart" className="text-2xl ">
            <span className="material-symbols-outlined text-2xl hover:scale-110 transition-transform">
              shopping_cart
            </span>
          </NavLink>

          {shoppingList.length > 0 && (
            <span className="bg-blue-500 absolute rounded-full p-1 text-xs top-0 right-0 text-white "></span>
          )}
        </li>
      </ul>
    </nav>
  );
};
