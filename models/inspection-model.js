const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const inspectionSchema = new Schema({
hive: { type: Schema.Types.ObjectId, ref: "Hive" },
dateInspected: Date,

sighted:       {type: String, possibleValues: ['Queen','Eggs', 'Capped Brood', 'Uncapped Brood']},
population:    {type: String, possibleValues: ['Heavy','Moderate','Low']},
layingPattern: {type: String, possibleValues: ['Excellent','Fair', 'Porr']},
odor:          {type: String, possibleValues: ['Sweet','Foul', 'Fermented']},

diseasesPests: {type: String, possibleValues: ['American Foulbrood','Nosema', 'Small Hive Beetle', 'Varroa Mite']},

feedingStores: {type: String, possibleValues: ['Heavy','Moderate','Low']},

toDo: {
  typeOfInspection: {type: String, possibleValues: [
    'Regular inspection','Inspect for weakness','Check queen laying pattern', 'Check queen cells']},
  dateCreated: Date,
},

  notes: String,
  imagesUrl: String,
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
