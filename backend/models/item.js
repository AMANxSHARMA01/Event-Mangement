const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image_url: { typr: String },
    quantity: { type: Number, default: 0 },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    }, // Reference to Vendor
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
