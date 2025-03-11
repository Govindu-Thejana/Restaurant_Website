import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const url = "https://restaurant-backend-flame.vercel.app";

  // Fetch products from database
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/products/`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (itemId) => {
    console.log('Adding item to cart:', itemId);
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    console.log('Removing item from cart:', itemId);
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const newCount = prev[itemId] - 1;
      if (newCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newCount };
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    products, // Replace food_list with products
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;