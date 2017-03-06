const express = require('express');
const ensure = require('connect-ensure-login');
const multer = require('multer');

const Hive = require('../models/hive-model');

const hivesRoutes = express.Router();
const uploads = multer({ dest: '__dirname' + '/../public/uploads/' });

hivesRoutes.get('/hives/index', ensure.ensureLoggedIn(), (req, res, next) => {
  Hive.find({owner: req.user._id}, (err, myHives) => {
    if (err) { return next(err); }

    res.render('hives/hive-index', { hives: myHives });
  });
});

hivesRoutes.get('/hives/new', ensure.ensureLoggedIn(), (req, res, next) => {
  res.render('hives/new.ejs', {
    message: req.flash('success')
  });
});

// router.post('/hives', ensureAuthenticated, (req, res, next) => {
hivesRoutes.post('/hives',
  ensure.ensureLoggedIn(),
  // ('picture') refers to name="picture" in the form
  uploads.single('picture'),

   (req, res, next) => {
     const filename = req.file.filename;

    const newHive = new Hive ({
      name:  req.body.name,
      desc:  req.body.desc,
      picture: `/uploads/${filename}`,
      owner: req.user._id   // <-- we add the user ID
    });

  newHive.save ((err) => {
    if (err) {
      next(err);
      return;
    } else {
      req.flash('success', 'Your hive has been created');
      res.redirect('/hives/new');
    }
  });
});



module.exports = hivesRoutes;
