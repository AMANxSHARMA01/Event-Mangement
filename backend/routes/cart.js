const express = require("express");
const router = express.Router();
const Cart = require("../models/cart"); // Import the Cart model

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
  const { itemId, name, quantity, price } = req.body; // Extract data from the request body

  try {
    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (existingItemIndex >= 0) {
      // If the item exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If it's a new item, add it to the cart
      cart.items.push({ itemId, name, quantity, price });
    }

    // Save the cart to the database
    await cart.save();

    // Calculate the total price
    const totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    res.status(200).json({ items: cart.items, totalPrice });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Route to remove an item from the cart
router.delete("/:userId/remove/:id", (req, res) => {
  const { userId, id } = req.params;

  // Initialize cart if it doesn't exist
  if (!Cart[userId]) {
    Cart[userId] = { items: [] };
  }

  // Remove item from the cart
  const cart = Cart[userId];
  cart.items = cart.items.filter((item) => item.productId !== parseInt(id));

  const totalPrice = calculateTotal(cart.items);
  res.json({ items: cart.items, totalPrice });
});

// Route to update item quantity in the cart
router.put("/:userId/update/:id", (req, res) => {
  const { userId, id } = req.params;
  const { quantity } = req.body;

  // Initialize cart if it doesn't exist
  if (!Cart[userId]) {
    Cart[userId] = { items: [] };
  }

  // Update the item's quantity
  const cart = Cart[userId];
  const itemIndex = cart.items.findIndex(
    (item) => item.productId === parseInt(id)
  );

  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity = quantity;
  }

  const totalPrice = calculateTotal(cart.items);
  res.json({ items: cart.items, totalPrice });
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
