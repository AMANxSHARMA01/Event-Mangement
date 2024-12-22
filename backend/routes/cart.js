const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Cart = require("../models/cart"); // Import the Cart model
const Item =require("../models/item")

// Get Cart for a particular user

const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// Route to fetch cart items for a particular user
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  // If no cart exists for the user, return an empty cart
  const cart = Cart[userId] || { items: [] };
  const totalPrice = calculateTotal(cart.items);

  res.json({ items: cart.items, totalPrice });
});

// Route to add an item to the cart
router.post("/:userId/add", async (req, res) => {
  const { userId } = req.params;
  const { id, quantity } = req.body; // Assume `itemId` and `quantity` are sent in the request body

  try {
    // Find the item in the database to retrieve its vendorId
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem._id === id
    );

    if (existingItemIndex >= 0) {
      // If the item exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If it's a new item, add it to the cart
      cart.items.push({
        itemId: item._id,
        name: item.name,
        quantity,
        price: item.price,
        vendorId: item.vendorId, // Add the vendorId from the Item model
      });
    }

    // Save the cart to the database
    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Route to remove an item from the cart
router.delete("/:userId/remove/:id", async (req, res) => {
  const { userId, id } = req.params;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    // Recalculate the total price
    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    res.json({ items: cart.items, totalPrice });
  } catch (err) {
    console.error('Error removing item:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update item quantity in the cart
router.put("/:userId/update/:id", async (req, res) => {
  const { userId, id } = req.params;
  const { quantity } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the item to update
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    // Update the item's quantity
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();

    // Recalculate the total price
    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Send the updated cart and total price
    res.json({ items: cart.items, totalPrice });
  } catch (err) {
    console.error('Error updating item quantity:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete all items from the cart
router.delete("/:userId/deleteAll", (req, res) => {
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
