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
      where: req.user.id,
      include: [{
        model: db.image,
      include: [{
        model: db.Comment
      }]
      }]
      })
      .then(function(user){
        user.password = ""
        user._previousDataValues.password = ""
        // const dbUser = []
        // dbUser.push(user)
        // const resObj = dbUser.map(user => {
        //   return Object.assign({},
        //     {
        //       userId: user.id,
        //       uername: user.displayName,
        //       posts: user.Posts.map(post => {

        //         return Object.assign({},
        //           {
        //             postId: post.id,
        //             userId: post.UserId,
        //             createdAt: post.createdAt,
        //             caption: post.caption,
        //             comments: post.Comments.map(comment => {

        //               return Object.assign({},
        //                 {
        //                   commentId: comment.id,
        //                   postId: comment.PostId,
        //                   // commenter: comment.commenter_username,
        //                   content: comment.content
        //                 })
        //             })
        //           })
        //       })
        //     })
        // })
        // 
        
        // console.log(resObj)
        console.log(user)
        res.render("members", user);
      })
  })
  

  //app.post("/upload", upload.single("file"), uploadController.uploadFiles);
  app.get("/post", isAuthenticated, (req, res) => {
    res.render("post");
  });
};
