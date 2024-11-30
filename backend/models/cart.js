const mongoose = require('mongoose');

const CartItem = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    // Additional product details like name, image, etc.
  }],
});

module.exports = mongoose.model('Cart', CartItem);