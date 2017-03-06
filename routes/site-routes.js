const express = require('express');

const siteRoutes = express.Router();

// this is the middleware
siteRoutes.use((req, res, next) => {
  if(req.session.currentUser) {
    // this will make the page go to either secret-view.ejs or cia-files.ejs
    next();
  } else {
    // If you're not logged in you get sent to login site
    res.redirect('/login');
  }
});
// http://localhost:3000/secret
// siteRoutes.get('/secret', (req, res, next) => {
//   res.render('secret-view.ejs');
// });
//
// siteRoutes.get('/cia-files', (req, res, next) => {
//   res.render('cia-files.ejs');
// });

module.exports = siteRoutes;
