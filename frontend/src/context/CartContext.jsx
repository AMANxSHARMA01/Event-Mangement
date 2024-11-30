import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Example: store userId after login

  useEffect(() => {
    if (userId) {
      // Fetch the user's cart from the backend API
      const fetchCart = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/cart/${userId}`);
          const data = await response.json();
          setCartItems(data.items); // Assuming the cart data has a field `items`
          calculateTotal(data.items);
        } catch (err) {
          console.error('Error fetching cart:', err);
        }
      };
      fetchCart();
    }
  }, [cartItems]);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const addToCart = async (item) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/add`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data)
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/remove/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity: newQuantity }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (err) {
      console.error('Error updating item quantity:', err);
    }
  };

  const deleteAllItems = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/deleteAll`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setCartItems([]);
      setTotalPrice(0);
    } catch (err) {
      console.error('Error deleting all items:', err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        removeItem,
        updateQuantity,
        deleteAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
