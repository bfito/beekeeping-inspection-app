const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const inspectionSchema = new Schema({
hive: { type: Schema.Types.ObjectId, ref: "Hive" },
dateInspected: Date,
note: String,
toDo: String,
image: String
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
