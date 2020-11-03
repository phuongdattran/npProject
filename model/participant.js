const mongoose = require("mongoose");

const participantSchema = mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

participantSchema.index({ eventId: 1, userId: 1}, { unique: true });

module.exports = mongoose.model("Participant", participantSchema);