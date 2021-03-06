const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: String, required: true },
  mainSport: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  status: { type: String, default: "member", required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);