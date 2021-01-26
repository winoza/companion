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
            posts: user.Images
          }
        }
        res.render("members", object);
      })
  })
  

  //app.post("/upload", upload.single("file"), uploadController.uploadFiles);
  app.get("/post", isAuthenticated, (req, res) => {
    res.render("post");
  });

  app.get("/notfound", isAuthenticated, (req, res) => {
    var userPage = {
      user_Id: req.user.id
    }
    console.log(userPage)
    res.render("notfound", userPage);
  });  
};
