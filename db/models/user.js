const mongoose = require("mongoose");
const user = new mongoose.Schema({
  avatar:{type: "string"},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isdel: { type: Boolean, default: false},
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("User", user);
