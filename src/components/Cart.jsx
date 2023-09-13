import React, { useContext, useEffect, useState } from "react";
import {
  clearShoppingCart,
  getStoredCart,
  removeFromDb,
} from "../utils/fakeDB";
import { Link, useLoaderData } from "react-router-dom";
import CartItem from "./Cards/CartItem";
import { CartContext } from "../App";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  let total = 0;
  if (cart.length > 0) {
    for (const product of cart) {
      total += product.price * product.quantity;
    }
  }

  // Remove item from cart
  const handleRemoveFromCart = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
    removeFromDb(id);
    return toast.error("Product removed!");
  };

  // Clear cart
  const handleClearCart = () => {
    if (cart.length > 0) {
      setCart([]);
      clearShoppingCart();
      return toast.error("All items removed successfully!");
    }
    toast.error("Nothing to remove!");
  };

  // Place order
  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      setCart([]);
      clearShoppingCart();
      return toast.success("Order placed successfully!");
    }
    toast.error("Cart is empty!");
  };

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-gray-100 text-gray-900">
        <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 ">
          <h2 className="text-xl font-semibold">
            {cart.length ? "Review Cart Items" : "Cart is Empty!"}
          </h2>
          <ul className="flex flex-col divide-y divide-gray-700">
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </ul>
          <div className="space-y-1 text-right">
            <p>
              Total amount: <span className="font-semibold">{total}$</span>
            </p>
            <p className="text-sm text-gray-400">
              Not including taxes and shipping costs
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            {cart.length > 0 ? (
              <button className="btn-outlined" onClick={handleClearCart}>
                Clear Cart
              </button>
            ) : (
              <Link to="/shop">
                <button className="btn-outlined">Back To Shop</button>
              </Link>
            )}

            <button className="btn-primary" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
