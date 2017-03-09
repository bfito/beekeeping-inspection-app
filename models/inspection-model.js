const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const inspectionSchema = new Schema({
hive: { type: Schema.Types.ObjectId, ref: "Hive" },
dateInspected: Date,

sighted:       {type: String, enum: ['Queen','Eggs', 'Capped Brood', 'Uncapped Brood']},
population:    {type: String, enum: ['Heavy','Moderate','Low']},
layingPattern: {type: String, enum: ['Excellent','Fair', 'Porr']},
odor:          {type: String, enum: ['Sweet','Foul', 'Fermented']},

diseasesPests: {type: String, enum: ['American Foulbrood','Nosema', 'Small Hive Beetle', 'Varroa Mite']},

feedingStores: {type: String, enum: ['Heavy','Moderate','Low']},

toDo: {
  typeOfInspection: {type: String, enum: [
    'Regular inspection','Inspect for weakness','Check queen laying pattern', 'Check queen cells']},
  dateCreated: Date,
},

  notes: String,
  imagesUrl: String,
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
