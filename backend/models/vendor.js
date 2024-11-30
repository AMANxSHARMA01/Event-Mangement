const mongoose = require("mongoose");


const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type:String,required: true,unique:true},
    password:{type:String,required: true},
    category: { type: String, required: true },
    contact:{type:Number,required: true },
    membership:{type:Number,default: 6},
    role:{ type: String, default:"vendor" },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Item', // This will be a reference to the Item model
        default: [] // Empty array by default
      }
}, { timestamps: true });

module.exports = mongoose.model("Vendor", VendorSchema);
