// Add data to local storage
const addToDB = (id) => {
  let shoppingCart = {};

  // Get the previous cart from local storage
  const storedCart = localStorage.getItem("shopping_cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  // Add quantity
  const quantity = shoppingCart[id] || 0;
  if (quantity) {
    const newQuantity = quantity + 1;
    shoppingCart[id] = newQuantity;
  } else {
    shoppingCart[id] = 1;
  }

  // Save cart to local storage
  const stringifiedCart = JSON.stringify(shoppingCart);
  localStorage.setItem("shopping_cart", stringifiedCart);
};

 

// Get data from local storage
const getStoredCart = () => {
  let shoppingCart = {};

  const storedCart = localStorage.getItem("shopping_cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
};


// Remove data from local storage
const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("shopping_cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if(shoppingCart[id]){
      delete shoppingCart[id];
      localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    }
  }
};


// Clear all data from local storage
const clearShoppingCart = () => {
  localStorage.removeItem("shopping_cart");
};

export { addToDB, getStoredCart, removeFromDb, clearShoppingCart };
