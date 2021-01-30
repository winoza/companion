var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the likes of the user who is signed in
  app.get("/api/likes", function(req, res) {
    
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Image
    db.Like.findAll({
      where: {
          UserId: req.user.id
        },
      include: [{
        model: db.Image
      }]
    }).then(function(dbLike) {
      res.json(dbLike);
    });
  });

  // POST route for saving a new like
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
};
