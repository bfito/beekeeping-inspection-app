const express = require('express');
const ensure = require('connect-ensure-login');
const multer = require('multer');
const Hive = require('../models/hive-model');
const Inspection = require('../models/inspection-model');


const router  = express.Router();
const inspectionsRoutes = express.Router();
// const uploads = multer({ dest: '__dirname' + '/../public/uploads/' });

inspectionsRoutes.get('/inspections/index', ensure.ensureLoggedIn(), (req, res, next) => {
  Hives.find({hive: req.user._id}, (err, myHives) => {
    if (err) { return next(err); }

    res.render('hive-inspections/index-inspections', { inspections: myInspections });
  });
});

inspectionsRoutes.get('/hive/:hiveId/inspections/new', (req, res, next) => {
  const hiveId = req.params.hiveId;

  Hive.findById(hiveId, (err, hiveDoc) => {
    if (err) {
      next(err);
      return;
    }
    res.render('hive-inspections/new-inspections-view', {
      product: hiveDoc
    });
  });
});

inspectionsRoutes.get('/hive/:hiveId/inspections', (req, res, next) => {
  const hiveId = req.params.hiveId;

  Inspection.findById(hiveId === inspectionsId, (err, hiveDoc) => {
    if (err) {
      next(err);
      return;
    }

  res.render('hive-inspections/index-inspections', { inspections: myInspections });
  });
});


inspectionsRoutes.post('/hive/:hiveId/inspections', (req, res, next) => {
const hiveId = req.params.hiveId;

Hive.findById(hiveId, (err, hiveDoc) => {
  if (err) {
    next(err);
    return;
  }

  const inspectionInfo = {
    dateInspected: req.body.dateInspected,
    notes: req.body.notes,
  };
// console.log(inspectionInfo);
  const theInspection = new Inspection(inspectionInfo);

  hiveDoc.inspections.push(theInspection);

  hiveDoc.save((err) => {
    if (err) {
      res.render('hive-inspections/new-inspections-view', {
        errorMessage: 'Inspection submit failed!',
        errors: theHive.errors
      });
      return;
    }
    res.redirect(`/hive/${hiveId}`);
    });
  });
});
//
//
//
// Had Removed ensure.ensureLoggedIn(), following my logic that user needs to be logged in anyways before reaching this section...
inspectionsRoutes.get('/hives/:hiveId/inspections/new', ensure.ensureLoggedIn(), (req, res, next) => {
  const hiveId = req.params.hiveId;


  Hive.findById(hiveId, (err, hiveDoc) => {
    if (err) {
      next(err);
      return;
    }
    res.render('hive-inspections/new-inspections-view', {
      inspection: inspectionDoc
    });
  });
});
//
//
//
//
// inspectionsRoutes.get('/hives/new', ensure.ensureLoggedIn(), (req, res, next) => {
//   res.render('hives/new-view.ejs', {
//     message: req.flash('success')
//   });
// });
//
// // router.post('/hives', ensureAuthenticated, (req, res, next) => {
// inspectionsRoutes.post('/hives',
//   ensure.ensureLoggedIn(),
//   // ('picture') refers to name="picture" in the form
//   // uploads.single('picture'),
//
//     (req, res, next) => {
//   //    const filename = req.file.filename;
//
//     const newHive = new Hive ({
//       name:  req.body.name,
//       dateCreated: req.body.dateCreated,
//       comment:  req.body.comment,
//       // picture: `/uploads/${filename}`,
//       owner: req.user._id   // <-- we add the user ID
//     });
//     newHive.save ((err) => {
//       if (err) {
//         next(err);
//         return;
//       } else {
//         req.flash('success', 'Your hive has been created');
//         res.redirect('/hives/new');
//       }
//     });
// });
//
// router.get('/hives/:id/edit', (req, res, next) => {
//   const hiveId = req.params.id;
//
//   Hive.findById(hiveId, (err, hiveDoc) => {
//     if (err) { return next(err); }
//     res.render('hives/edit-view', {
//       hive: hiveDoc
//     });
//   });
// });
//
// router.post('/hives/:id', (req, res, next) => {
//   const hiveId = req.params.id;
//   const hiveUpdates = {
//     name:  req.body.name,
//     dateCreated: req.body.dateCreated,
//     comment:  req.body.comment,
//     owner: req.user._id
// };
//   // db.hives.updateOne({ _id: hive }, { $set: hiveUpdates })
//   Hive.findByIdAndUpdate(hiveId, hiveUpdates, (err, hive) => {
//     if (err){
//       next(err);
//       return;
//     }
//       res.redirect('/hives');
//     });
//   });
//
//   router.post('/hives/:id/delete', (req, res, next) => {
//     const hiveId = req.params.id;
//
//     console.log(hiveId);
//
//     // db.hives.deleteOne({_id: hiveId })
//     Hive.findByIdAndRemove(hiveId, (err, hive) => {
//       if (err) {
//         next(err);
//         return;
//       }
//       res.redirect('/hives');
//     });
//   });
//
// router.get('/hives/:id', (req, res, next) => {
//   let hiveId = req.params.id;
//
//   Hive.findById(hiveId, (err, hiveDoc) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.render('hives/show', {
//       hive: hiveDoc
//     });
//   });
// });
//



module.exports = inspectionsRoutes;
