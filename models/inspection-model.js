const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const inspectionSchema = new Schema({
hive: { type: Schema.Types.ObjectId, ref: "Inspection" },
dateCreated: Date,
notes: String,
imageUrl: String
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
