const mongoose = require("mongoose");
const user = new mongoose.Schema({
  avatar:{type: "string"},
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isdel: { type: Boolean, default: false},
  date: { type: String, default: new Date() },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("User", user);
