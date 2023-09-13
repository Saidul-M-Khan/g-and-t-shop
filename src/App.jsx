import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { createContext, useState } from "react";
import Modal from "./components/Modal";

export const ProductContext = createContext([]);
export const CartContext = createContext([]);

const App = () => {
  let [isOpen, setIsOpen] = useState(false);

  const { cartData, products } = useLoaderData();
  const [cart, setCart] = useState(cartData);

  const cartAlert = sessionStorage.getItem("alert");
  if (cart.length > 0 && cartAlert !== "true") {
    setIsOpen(true);
    // alert("You have items in your cart!");
    sessionStorage.setItem("alert", "true");
  }

  return (
    <>
      <ProductContext.Provider value={products}>
        <CartContext.Provider value={[cart, setCart]}>
          <Header />
          <div className="min-h-[calc(100vh-137px)]">
            <Outlet />
          </div>
          <Footer />
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
        </CartContext.Provider>
      </ProductContext.Provider>
    </>
  );
};

export default App;
