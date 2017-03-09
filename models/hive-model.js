const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Inspection = require('./inspection-model.js');


const hiveSchema = new Schema({
owner: { type: Schema.Types.ObjectId, ref: "User" },

name: { type: String, default: 'name' },
dateCreated: Date,

numberOfBroodBoxes: Number,
numberOfFrames: Number,
typeOfHive: {type: String, enum: ['Nucleus Colony','Langstroth','Top Bar', '8 Frame', 'Other']},

comment: String,
});

const Hive = mongoose.model("Hive", hiveSchema);

module.exports = Hive;
