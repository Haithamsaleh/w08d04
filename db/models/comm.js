const mongoose = require("mongoose");

const comm = new mongoose.Schema({
    postid: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  dosc: { type: String, required: true },
  isdel:{ type: Boolean, default: false},
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String, default: new Date() },

});

module.exports = mongoose.model("Comm", comm);