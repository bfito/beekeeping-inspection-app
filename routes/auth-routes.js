const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model.js');

const authRoutes = express.Router();


authRoutes.get('/signup', (req, res, next) => {
  res.render('auth/signup-view.ejs');
});

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === '' || password === '') {
    res.render('auth/signup-view.ejs', {
      errorMessage: 'Please fill out both username and password foo\'!'
    });
    return;
  }

  User.findOne(
    { username: username },
    { username: 1 },

    (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (foundUser !== null) {
        res.render('auth/signup-view.ejs', {
          errorMessage: 'The username already exists'
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const userInfo = {
        username: username,
        password: hashPass
      };

      const theUser = new User(userInfo);

      theUser.save((err) => {
        if (err) {
          res.render('auth/signup-view.ejs', {
            errorMessage: 'Oops! There was a problem. Try again later.'
          });
          return;
        }

        res.redirect('/');
      });
    });
});


authRoutes.get('/login', (req, res, next) => {
  res.render('auth/login-view.ejs');
});

authRoutes.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === '' || password === '') {
    res.render('auth/login-view.ejs', {
      errorMessage: 'Indicate a username and password to log in.'
    });
    return;
  }

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      res.render('auth/login-view.ejs', {
        errorMessage: 'The username doesn\'t exist'
      });
      return;
    }// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

const router = express.Router();
const bcryptSalt = 10;


router.get('/signup', (req, res, next) => {
  res.render('auth/signup-view', {
    errorMessage: ''
  });
});

router.post('/signup', (req, res, next) => {
  const nameInput = req.body.name;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === '' || passwordInput === '') {
    res.render('auth/signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }

  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render('auth/signup', {
        errorMessage: `The email ${emailInput} is already in use.`
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      name: nameInput,
      email: emailInput,
      password: hashedPass
    };

    const theUser = new User(userSubmission);

    theUser.save((err) => {
      if (err) {
        res.render('auth/signup', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }

      res.redirect('/');
    });
  });
});


module.exports = router;


    // This is the more important part of the code to verify password..
    if (bcrypt.compareSync(password, user.password)) {
      // Current will have sometingin there if user logged in succesfully.
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.render('auth/login-view.ejs', {
        errorMessage: 'The password is incorrect'
      });
      return;
    }
  });
});

authRoutes.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/');
  });
});

module.exports = authRoutes;
