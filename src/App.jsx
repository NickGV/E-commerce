import { Route, Routes } from "react-router-dom";
import { StorePage, CartPage, HomePage } from "./pages/index";
import { NavBar } from "./components/NavBar";
import { ProductsProvider } from "./context/ProductsProvider";
import { CartProvider } from "./context/CartProvider";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
function App() {
  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store/:category" element={<StorePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
