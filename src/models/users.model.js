const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "It is required"],
    unique: true,
    maxlength: [20, "The maximum number of characters allowed is 20"],
    minlength: [4, "The minimum number of characters allowed is 4"],
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
  },
  chats: [
    {
      type: ObjectId,
      ref: "Chat",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
