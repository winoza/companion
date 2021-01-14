module.exports = function(sequelize, DataTypes) {
const Post = sequelize.define("Post", {
    preview: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1],
        validate: {
            isSupportedFile (value) {
                const split = value.split('.')
                if(split[1] !== "jpg" || 'png'){
                    throw new Error('Only .jpg or .png files are allowed')
                }
            }
        }
      },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1],
        validate: {
            isSupportedFile (value) {
                const split = value.split('.')
                if(split[1] !== "jpg" || 'png'){
                    throw new Error('Only .jpg or .png files are allowed')
                }
            }
        }
      },
    caption: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1, 2200]
      }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post
}