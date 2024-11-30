const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  quantity: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);