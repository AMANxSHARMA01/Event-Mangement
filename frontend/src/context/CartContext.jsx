import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from "../context/UserContext";



const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser(); // Get the user object from UserContext




  // Fetch cart data when user.id changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user && !user.id) {
        console.warn('User ID is not set. Cannot fetch cart.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/cart/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }

        const data = await response.json();
        setCartItems(data.items || []); // Default to empty array if no items
        calculateTotal(data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err.message);
      }
    };

    fetchCart();
  }, [user]);

  // Calculate the total price of items in the cart
  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Add an item to the cart
  const addToCart = async (item) => {
    if (!user.id) {
      console.error('User ID is not set. Cannot add to cart.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${user.id}/add`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data.items || []);
      
      calculateTotal(data.items || []);
    } catch (err) {
      console.error('Error adding item to cart:', err.message);
    }
    
  };

  // Remove an item from the cart
  const removeItem = async (id) => {
    if (!user.id) {
      console.error('User ID is not set. Cannot remove item.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${user.id}/remove/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data.items || []);
      calculateTotal(data.items || []);
    } catch (err) {
      console.error('Error removing item:', err.message);
    }
  };

  // Update the quantity of an item in the cart
  const updateQuantity = async (id, newQuantity) => {
    if (!user.id) {
      console.error('User ID is not set. Cannot update quantity.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${user.id}/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity: newQuantity }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data.items || []);
      calculateTotal(data.items || []);
    } catch (err) {
      console.error('Error updating item quantity:', err.message);
    }
  };

  // Delete all items in the cart
  const deleteAllItems = async () => {
    if (!user.id) {
      console.error('User ID is not set. Cannot delete all items.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${user.id}/deleteAll`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete all items: ${response.statusText}`);
      }

      setCartItems([]);
      setTotalPrice(0);
    } catch (err) {
      console.error('Error deleting all items:', err.message);
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
