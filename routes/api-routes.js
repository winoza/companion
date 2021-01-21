// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const uploadimagedb = require("../public/js/uploadimage");
const uploadimagemulter = require("../config/middleware/uploadimage");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body)
    db.User.create(req.body).then((result) => res.json(result))
  });

  // POST route for saving a new image
  app.post("/upload", uploadimagemulter.single("file"), uploadimagedb.uploadFiles);

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // app.get("/api/image", function (req, res) {
  //   db.Image.findAll({}).then(function (dbPost) {
  //   res.json(dbPost).catch((err) => res.status(422).json(err));
  //   });
  // });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        displayName: req.user.displayName,
        id: req.user.id
      });
    }
  });
};
