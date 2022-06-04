const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const chatScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "The maximum number of characters allowed is 20"],
    minlength: [4, "The minimum number of characters allowed is 4"],
  },
  users: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  isGroup: {
    type: Boolean,
    default: false,
  },
});

const Chat = mongoose.model("Chat", chatScheme);

module.exports = Chat;
