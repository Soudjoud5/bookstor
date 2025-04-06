const mongoose = require("mongoose");

const user = new mongoose.Schema({
     user: {
            type: mongoose.Types.ObjectId,
            ref: "order",
         },
     book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
     },
     status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed","Out for delivery","Delivered","Cancled"],
   },
},
{timestamps: true}
);
module.exports = mongoose.model("order",order);