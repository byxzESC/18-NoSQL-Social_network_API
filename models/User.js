const mongoose = require("mongoose");
const Thought = require("./Thought");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = mongoose.model("user", userSchema);

module.exports = User;
