import { Route, Routes } from "react-router-dom";
import { StorePage, CartPage } from "./pages/index";
import { NavBar } from "./components/NavBar";
import { ProductsProvider } from "./context/ProductsProvider";
import { CartProvider } from "./context/CartProvider";
function App() {
  return (
    <>
        <ProductsProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<StorePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </CartProvider>
        </ProductsProvider>
    </>
  );
}

export default App;
