const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beekeeping-inspection-app');

const Hive = require('../models/hive-model.js');
const Inspection = require('../models/inspection-model');

const hives = [
  {
    owner: "58c1b077d7120a4f861f9210",
    name: 'Hive 1',
    dateCreated: '2017-02-10T10:50:42.389Z',
    comment: 'Hive testing comment',
  },
];

Hive.create(hives, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((oneHive) => {
    console.log(`${oneHive.name} ${oneHive._id}`);
  });

});


const inspections = [
  {
    hive: "58c2990842f4717d3c24a21b",
    dateInspected: '2017-02-10T10:50:42.389Z',
    note: 'Hive testing comment',
    toDo: 'Need Hive inspection',

  },
];

Inspection.create(inspections, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((oneInspection) => {
    console.log(`${oneInspection.toDo} ${oneInspection._id}`);
  });

});

mongoose.disconnect();
