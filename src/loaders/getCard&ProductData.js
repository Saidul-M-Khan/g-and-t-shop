import { getStoredCart } from "../utils/fakeDB";

export const productsAndCartData = async () => {
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  const savedCart = getStoredCart();
  let cartData = [];
  for (const id in savedCart) {
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
      foundProduct.quantity = savedCart[id];
      cartData.push(foundProduct);
    }
  }
  return { cartData, products };
};

// export default productsAndCartData;
