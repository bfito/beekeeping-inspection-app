const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Inspection = require('./inspection.js');


const hiveSchema = new Schema({
owner: { type: Schema.Types.ObjectId, ref: "User" },
name: { type: String, default: 'name' },
dateCreated: Date,
comment: String
});

const Hive = mongoose.model("Hive", hiveSchema);

module.exports = Hive;
