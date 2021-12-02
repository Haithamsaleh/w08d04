const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img :{type: String},
  dosc: { type: String, required: true },
  isdel:{ type: Boolean, default: false},
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commid: { type: mongoose.Schema.Types.ObjectId, ref: "Comm" },
  date: { type: String, default: new Date() },
  isdel: { type: Boolean, default: false},

});

module.exports = mongoose.model("Post", post);