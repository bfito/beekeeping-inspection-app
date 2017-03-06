const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Hive = require('./hive.js');


const userSchema = new Schema({
  firstName: { type: String, default: 'firstname' },
  lastName: { type: String, default: 'lastname' },
  username: { type: String, required: true },
  encryptedPassword: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
