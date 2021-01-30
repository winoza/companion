var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the comments
  app.get("/api/comments", function(req, res) {
    
    // Here we add an "include" property to our options in our findAll query
    // In this case, just db.Image
    db.Comment.findAll({
      where: query,
      include: [{
        model: db.Image
      }]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // POST route for saving a new post
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body)
    .then(function(dbComment) {
      res.json(dbComment);
    });
  });
};
