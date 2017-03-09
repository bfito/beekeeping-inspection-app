const express = require('express');
const ensure = require('connect-ensure-login');
const multer = require('multer');
const Hive = require('../models/hive-model');
const Inspection = require('../models/inspection-model');

// req.query -> for the form
const router  = express.Router();
const inspectionsRoutes = express.Router();
// const uploads = multer({ dest: '__dirname' + '/../public/uploads/' });

inspectionsRoutes.get('/hive/:hiveId/inspections', ensure.ensureLoggedIn(), (req, res, next) => {
  Inspection.find({ hive: req.params.hiveId }, (err, inspectionList) => {
    res.render('hive-inspections/index-inspections', {
      inspections: inspectionList,
      userInfo: req.user
    });
  });
});
  // Hives.find({hive: req.hive._id}, (err, myInspections) => {
  //   if (err) { return next(err); }
  //
  //   res.render('hive-inspections/index-inspections', {
  //     inspections: myInspections,
  //     hiveInfo: req.user
  //   });
  // });
// });

inspectionsRoutes.get('/hive/:hiveId/inspections/new', ensure.ensureLoggedIn(), (req, res, next) => {
  res.render('hives/new-view.ejs', {
    message: req.flash('success')
  });
});

inspectionsRoutes.post('/inspections',
  ensure.ensureLoggedIn(),
  // ('picture') refers to name="picture" in the form
  // uploads.single('picture'),

    (req, res, next) => {
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
        res.redirect('/hive/:hiveId/inspections/new');
      }
    });
});

router.post('/hive/:hiveId/inspections', (req, res, next) => {
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

router.post('/hives/:id/delete', (req, res, next) => {
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
//
//
//   Hive.findById(hiveId, (err, hiveDoc) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.render('hive-inspections/new-inspections-view', {
//       inspection: inspectionDoc
//     });
//   });
//
//
// inspectionsRoutes.get('/hive/:hiveId/inspections', (req, res, next) => {
//   const hiveId = req.params.hiveId;
//
//   Inspection.findById(hiveId === inspectionsId, (err, hiveDoc) => {
//     if (err) {
//       next(err);
//       return;
//     }
//
//   res.render('hive-inspections/index-inspections', { inspections: myInspections });
//   });
// });
//
//
// inspectionsRoutes.post('/hive/:hiveId/inspections', (req, res, next) => {
// const hiveId = req.params.hiveId;
//
// Hive.findById(hiveId, (err, hiveDoc) => {
//   if (err) {
//     next(err);
//     return;
//   }
//
//   const inspectionInfo = {
//     dateInspected: req.body.dateInspected,
//     notes: req.body.notes,
//   };
// // console.log(inspectionInfo);
//   const theInspection = new Inspection(inspectionInfo);
//
//   hiveDoc.inspections.push(theInspection);
//
//   hiveDoc.save((err) => {
//     if (err) {
//       res.render('hive-inspections/new-inspections-view', {
//         errorMessage: 'Inspection submit failed!',
//         errors: theHive.errors
//       });
//       return;
//     }
//     res.redirect(`/hive/${hiveId}`);
//     });
//   });
// });
// //
// //
// //
// // Had Removed ensure.ensureLoggedIn(), following my logic that user needs to be logged in anyways before reaching this section...
// inspectionsRoutes.get('/hives/:hiveId/inspections/new', ensure.ensureLoggedIn(), (req, res, next) => {
//   const hiveId = req.params.hiveId;
//
//
//   Hive.findById(hiveId, (err, hiveDoc) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.render('hive-inspections/new-inspections-view', {
//       inspection: inspectionDoc
//     });
//   });
// });



module.exports = inspectionsRoutes;
