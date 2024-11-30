const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    membership_duration: { type: Number, default: 6 },
    address:{type:String},
    city:{type:String},
    number:{type: Number},
    pincode:{type: Number}
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
