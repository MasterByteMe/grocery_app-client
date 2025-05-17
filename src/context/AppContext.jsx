import {
  Component,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

const currency = import.meta.env.VITE_CURRENCY;

// return contextprovider tag
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //identify the user - Navbar.jsx
  const [user, setUser] = useState(null);

  const [isSeller, setIsSeller] = useState(false);
  // use to display and hide login navmenu
  const [showUserLogin, setShowUserLogin] = useState(false);

  // state for products - ProductCard.jsx
  const [products, setProducts] = useState([]);

  //for (+,-) on Card ProductCard.jsx
  const [cartItems, setCartItems] = useState({});

  const [searchQuery, setSearchQuery] = useState({});

  // Function that will fetch all the products from the assets
  const fectchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add Product to Cart - ProductCard.jsx
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update Cart Item Quantity - ProductCard.jsx
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove Product from Cart - ProductCard.jsx
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Remove from Cart");
    setCartItems(cartData);
  };

  // Get Cart Item Count
  // Calculate the total number of items in the cart, then return the totalCount of the product added in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Get Cart Total Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // function works when the page loaded
  useEffect(() => {
    fectchProducts();
  }, []);

  //access the states variable function in any other component
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// use to other component and we can directly access the data stored in "value" object
export const useAppContext = () => {
  return useContext(AppContext);
};
