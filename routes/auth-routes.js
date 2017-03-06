const express    = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Specific passport startegy. Local.
const authRoutes = express.Router();
// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");

// User model
const User       = require("../models/user-model");


authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup-view");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup-view", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username: username }, "username", (err, user) => { //"username" means: just display the username field.
    if (user !== null) {
      res.render("auth/signup-view", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup-view", { message: "Something went wrong" });
      } else {
        // 'success' is made up. Can be called whatever you want. You are going to use it in the view to retrieve the message
        req.flash('success', 'You have been successfully registered. Try Logging in!');
        res.redirect("/");
      }
    });
  });
});


// Handling different cases of the findOne method.
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    // If you want to do some extra logic, do it here and not in authRoutes
    return next(null, user);
  });
}));

//-------------------- LOG IN HANDLER ---------------------------
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login-view", {
    // If there is an error, then the error will be specified. The if statement is inside the login view.
    errorMessage: req.flash('error') //The catcher, waiting for the ball to be thrown. If there is no error, there wont be any error to display (duh!)
    // So how to use it? If we redirect to this address, we want to send or throw "req.flash('error', 'No success in log in')"; so that the catcher can actually grab the information.
    // Remember, do this req.flash before redirecting so that the errorMessage is passed on.
  });
});

authRoutes.post("/login", passport.authenticate("local", {
  successReturnToOrRedirect: "/", //If i try to access kgb-files(which are protected), then its going to direct me to login. If I log In successfully, it will directly redirect me to kgb-files!!
  failureRedirect: "/login",
  failureFlash: true,
  successFlash: 'Successful Log In!',
  passReqToCallback: true
}));

// authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
//
// authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
//   successRedirect: "/",
//   failureRedirect: "/login"
// }));

// authRoutes.get("/auth/google", passport.authenticate("google", {
//   scope: ["https://www.googleapis.com/auth/plus.login",
//           "https://www.googleapis.com/auth/plus.profile.emails.read"]
//           //Scope defines what we are able to access we request information from google. Basically the points that tell me what I will be able to see from the user (i.e blue box of fb telling user what im requesting)
// }));

// authRoutes.get("/auth/google/callback", passport.authenticate("google", {
//   successRedirect: "/",
//   failureRedirect: "/login"
// }));
//--------------------------------------------------------------

authRoutes.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out.'); //Actually sending the ('success')ball to a catcher waiting for a success ball. In this case the .get('/') is awaiting a success ball.
  res.redirect('/');
});

module.exports = authRoutes;
