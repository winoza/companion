var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the likes
  app.get("/api/likes", function(req, res) {
    
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Usesr and db.Image
    db.Like.findAll({
      where: {
          UserId: req.user.id
        },
      include: [{
        model: db.Image
      },{
        model: db.User
      }]
    }).then(function(dbLike) {
      res.json(dbLike);
    });
  });

  // Get route for retrieving a single Like
  app.get("/api/likes/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, db.User and db.Post
    db.Like.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.Image
      },{
        model: db.User
      }]
    }).then(function(dbLike) {
      res.json(dbLike);
    });
  });

  // POST route for saving a new post
  app.post("/api/likes", function(req, res) {
    db.Like.create(req.body).then(function(dbLike) {
      res.json(dbLike);
    });
  });

  // DELETE route for deleting likes
  app.delete("/api/likes/:postid", function(req, res) {
    db.Like.destroy({
      where: {
        UserId: req.user.id,
        ImageId: req.params.postid
      }
    }).then(function(dbLike) {
      res.json(dbLike);
    });
  });

  // PUT route for updating likes
  app.put("/api/likes", function(req, res) {
    db.Like.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLike) {
      res.json(dbLike);
    });
  });
};
