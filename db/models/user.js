const mongoose = require("mongoose");
const user = new mongoose.Schema({
  avatar:{type:String },
  username: { type: String, required: true, unique: true },
  email: { type: String,required: true, unique: true },
  password: { type: String, required: true },
  isdel: { type: Boolean, default: false},
  state: {type: String, enum: ["Pending", "Active"],default: "Pending"},
  date: { type: String, default: new Date() },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role",default:"61a73960f1fa8a686b1641c7" },
  passwordCode: {type: String},
  activeCode: {type: String},

});

module.exports = mongoose.model("User", user);
