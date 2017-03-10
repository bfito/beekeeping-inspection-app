const express = require('express');
const ensure = require('connect-ensure-login');
const multer = require('multer');
const Hive = require('../models/hive-model');
const Inspection = require('../models/inspection-model');

const inspectionsRoutes = express.Router();
// const uploads = multer({ dest: '__dirname' + '/../public/uploads/' });

inspectionsRoutes.get('/hives/:hiveId/inspections', ensure.ensureLoggedIn(), (req, res, next) => {
  // console.log("Inside /hives/:hiveId/inspections");
  Inspection.find({ hive: req.params.hiveId }, (err, inspectionList) => {
    res.render('hive-inspections/index-inspections.ejs', {
      inspections: inspectionList,
      userInfo: req.user,
      oneHive: req.params.hiveId,
    });
  });
});

inspectionsRoutes.get('/hives/:hiveId/new-inspection', ensure.ensureLoggedIn(), (req, res, next) => {
  // console.log("Inside /hives/:hiveId/inspections");
  Inspection.find({ hive: req.params.hiveId }, (err, inspectionList) => {
    res.render('hive-inspections/new-inspections-view.ejs', {
      inspections: inspectionList,
      userInfo: req.user,
      message: req.flash('success'),
      oneHive: req.params.hiveId
    });
  });
});

inspectionsRoutes.post('/inspections', ensure.ensureLoggedIn(), (req, res, next) => {
  //    const filename = req.file.filename;

    const newInspection = new Inspection ({
      dateInspected: req.body.dateInspected,
      sighted:       req.body.sighted,
      population:    req.body.population,
      layingPattern: req.body.layingPattern,
      odor:          req.body.odor,
      diseasesPests: req.body.diseasesPests,
      feedingStores: req.body.feedingStores,
      toDo:          req.body.toDo, //Not sure if i need to add appended options in here or if it pulls them automatically
      notes:         req.body.notes,

      hive: req.hive._id
    });
    newInspection.save ((err) => {
      if (err) {
        next(err);
        return;
      } else {
        req.flash('success', 'Your hive has been created');
        res.redirect('/hives/:hiveId/inspections/new');
      }
    });
});

inspectionsRoutes.post('/hives/:hiveId/inspections', (req, res, next) => {
  const inspectionId = req.params.id;
  const inspectionUpdates = {
    dateInspected: req.body.dateInspected,
    sighted:       req.body.sighted,
    population:    req.body.population,
    layingPattern: req.body.layingPattern,
    odor:          req.body.odor,
    diseasesPests: req.body.diseasesPests,
    feedingStores: req.body.feedingStores,
    toDo:          req.body.toDo, //Not sure if i need to add appended options in here or if it pulls them automatically
    notes:         req.body.notes,

};
// db.hives.updateOne({ _id: hive }, { $set: hiveUpdates })
Hive.findByIdAndUpdate(hiveId, inspectionUpdates, (err, inspection) => {
  if (err){
    next(err);
    return;
  }
    res.redirect('/hives/inspections');
  });
});

inspectionsRoutes.post('/hives/:id/delete', (req, res, next) => {
  const hiveId = req.params.id;
  console.log(hiveId);

  // db.inspections.deleteOne({_id: inspectionId })
  Inspection.findByIdAndRemove(inspectionId, (err, hive) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/hives/inspections');
  });
});

module.exports = inspectionsRoutes;
