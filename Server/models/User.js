const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  domain: { type: String, required: true },
  availability: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
