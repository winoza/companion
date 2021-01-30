const db = require("../models");
const uploadimagedb = require("../config/middleware/uploadimage");
const uploadimagemulter = require("../config/middleware/imageware");

module.exports = function (app) {
   // POST route for saving a new Image
   app.post("/upload", uploadimagemulter.single("file"), uploadimagedb.uploadFiles);

   // DELETE route for deleting Images
  app.delete("/api/images/:id", function(req, res) {
    db.Image.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbImage) {
      res.json(dbImage);
    });
  });

  // PUT route for updating the Image caption
  app.put("/api/images", function(req, res) {
    db.Image.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
    }).then(function(dbImage) {
      res.json(dbImage);
    });
  });
}