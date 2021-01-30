// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models")
const id = '';

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      id = req.user.id
      res.redirect("/members/" + id);
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      id = req.user.id
      res.redirect("/members/" + id);
    }
    res.render("login")
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members/:id", isAuthenticated, (req, res) => {
    
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.Image,
      include: [{
        model: db.Comment
      },{
        model: db.Like
      }]
      }]
      })
      .then(function(user){
      
        var object = {
          user: {
            userId: user.id,
            username: user.displayName,
            profileImage: user.profileImage,
            favorites: user.favorites,
            location: user.location,
            birthday: user.birthday,
            posts: user.Images
          }
        }
        res.render("members", object);
      })
  })
  
  //if the user is signed in they can access the page to edit their profile image
  app.get("/profileimage", isAuthenticated, (req, res) => {
    res.render("profileImage");
  });

  //if the user is signed in they can access the page to edit their profile details
  app.get("/aboutme", isAuthenticated, (req, res) => {
    res.render("profileDetails");
  });

  //if the user is signed in they can access the page to create a post
  app.get("/post", isAuthenticated, (req, res) => {
    res.render("post");
  });

  //if the user is signed in they can access the not found page if they search for an unknown user
  app.get("/notfound", isAuthenticated, (req, res) => {
    var userPage = {
      user_Id: req.user.id
    }

    res.render("notfound", userPage);
  });  
};
