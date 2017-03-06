const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Hive = require('./hive.js');


const userSchema = new Schema({
  firstName: { type: String, default: 'firstname' },
  lastName: { type: String, default: 'lastname' },
  username: { type: String, required: true },
  password: { type: String, required: true }
}, {
   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
