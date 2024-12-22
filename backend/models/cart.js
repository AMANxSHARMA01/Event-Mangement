const mongoose = require('mongoose');

const CartItem = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    name:{type:String, required:true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to the Vendor model
    // Additional product details like name, image, etc.
  }],
});

module.exports = mongoose.model('Cart', CartItem);