const mongoose = require("mongoose");

const followingSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  followingId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

followingSchema.index({ userId: 1, followingId: 1}, { unique: true });

module.exports = mongoose.model("Following", followingSchema);