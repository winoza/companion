const fs = require("fs");

const db = require("../../models");
const Image = db.images;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      caption: req.body.caption,
      name: req.file.originalname,
      UserId: req.user.id,
      data: fs.readFileSync(
        __basedir + "/public/uploads/" + req.file.filename // asset upload
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/public/img/" + image.name, // asset tmp
        image.data
      );

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
