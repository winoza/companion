const fs = require("fs");

const db = require("../../models");
const Image = db.Image;

const uploadFiles = async (req, res) => {
  console.log(req.file);

  try {

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      caption: req.body.caption,
      name:  `/uploads/${req.file.filename}`,
      UserId: req.user.id
      
    }).then((image) => {
      console.log(image)

      //return res.send(`File has been uploaded.`);
      res.redirect("/members/:id");
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
