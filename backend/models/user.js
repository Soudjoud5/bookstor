const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default:"https://www.flaticon.com/free-icon-font/user_3917688?related_id=3917688",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","admin"],
    },
     favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
     },],
     cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
     },],
     orderes: [{
        type: mongoose.Types.ObjectId,
        ref: "order",
     },
    ],
  },
  {timestamps: true}
);
module.exports = mongoose.model("user",user);