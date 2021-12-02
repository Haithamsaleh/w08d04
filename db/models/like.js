const mongoose = require("mongoose");

const like = new mongoose.Schema({
  like: { type: Boolean, default: false },
  postid: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


module.exports = mongoose.model("Like", like);
