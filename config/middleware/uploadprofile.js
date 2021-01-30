const fs = require("fs");

const db = require("../../models");
const profile = db.User;

const uploadProfileImage = async (req, res) => {
  
  const user_Id = req.user.id
  try {

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    profile.update(
        {
            profileImage: `/uploads/${req.file.filename}`
        },
        {
          where: {
            id: req.user.id
        }
      
    }).then(() => {
      res.redirect("/members/" + user_Id);
    });
  } catch (error) {
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadProfileImage,
};
