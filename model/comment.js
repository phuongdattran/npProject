const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("Comment", commentSchema);