const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  sport: { type: String, required: true },
  pace: { type: String, required: true },
  distance: { type: String, required: true },
  meeting: {
      date: { type: String, default:"no date", required: true },
      time: { type: String, default:"no date", required: true },
      place: { type: String, default:"no place", required: true }
  },
  description: { type: String, default: "none", required: false },
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  gps: { type: String, default: "none", required: false }
});

module.exports = mongoose.model("Event", eventSchema);