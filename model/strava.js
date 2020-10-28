const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const stravaSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  athleteId: { type: String, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expires_at: { type: String, required: true },
  expires_in: { type: String, required: true }
});

stravaSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Strava", stravaSchema);