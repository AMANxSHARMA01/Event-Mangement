const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Import the Cart model

// Get Cart for a particular user


const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  
  // Route to fetch cart items for a particular user
  router.get('/:userId', (req, res) => {
    const { userId } = req.params;
  
    // If no cart exists for the user, return an empty cart
    const cart = Cart[userId] || { items: [] };
    const totalPrice = calculateTotal(cart.items);
  
    res.json({ items: cart.items, totalPrice });
  });
  
  // Route to add an item to the cart
  router.post('/:userId/add', (req, res) => {
    const { userId } = req.params;
    const newItem = req.body;
  
    // Initialize cart for the user if it doesn't exist
    if (!Cart[userId]) {
      Cart[userId] = { items: [] };
    }
  
    // Add the new item to the cart
    const cart = Cart[userId];
    const existingItemIndex = cart.items.findIndex(item => item.productId === newItem.productId);
  
    if (existingItemIndex >= 0) {
      // If the item already exists, update its quantity
      cart.items[existingItemIndex].quantity += newItem.quantity;
    } else {
      // If it's a new item, add it to the cart
      cart.items.push(newItem);
    }
  
    const totalPrice = calculateTotal(cart.items);
    res.json({ items: cart.items, totalPrice });
  });
  
  // Route to remove an item from the cart
  router.delete('/:userId/remove/:id', (req, res) => {
    const { userId, id } = req.params;
  
    // Initialize cart if it doesn't exist
    if (!Cart[userId]) {
      Cart[userId] = { items: [] };
    }
  
    // Remove item from the cart
    const cart = Cart[userId];
    cart.items = cart.items.filter(item => item.productId !== parseInt(id));
  
    const totalPrice = calculateTotal(cart.items);
    res.json({ items: cart.items, totalPrice });
  });
  
  // Route to update item quantity in the cart
  router.put('/:userId/update/:id', (req, res) => {
    const { userId, id } = req.params;
    const { quantity } = req.body;
  
    // Initialize cart if it doesn't exist
    if (!Cart[userId]) {
      Cart[userId] = { items: [] };
    }
  
    // Update the item's quantity
    const cart = Cart[userId];
    const itemIndex = cart.items.findIndex(item => item.productId === parseInt(id));
  
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
    }
  
    const totalPrice = calculateTotal(cart.items);
    res.json({ items: cart.items, totalPrice });
  });
  
  // Route to delete all items from the cart
  router.delete('/:userId/deleteAll', (req, res) => {
    const { userId } = req.params;
  
    // Initialize cart if it doesn't exist
    if (!Cart[userId]) {
      Cart[userId] = { items: [] };
    }
  
    // Clear the user's cart
    Cart[userId].items = [];
    const totalPrice = 0;
  
    res.json({ items: [], totalPrice });
  });

module.exports = router;