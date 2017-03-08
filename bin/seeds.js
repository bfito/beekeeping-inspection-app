const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beekeeping-inspection-app');

const Hive = require('../models/hive-model.js');


const hives = [
  {
    owner: "58bdae5f6c3a565707fe1383",
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

mongoose.disconnect();
