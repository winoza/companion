module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [2, 2200]
        },
        commenter: {
            type: DataTypes.TEXT,
            allowNull: false
        }
      });
    
      Comment.associate = function(models) {
        // We're saying that a comment should belong to a post
        // A comment can't be created without an Post due to the foreign key constraint
        Comment.belongsTo(models.image, {
          foreignKey: {
            allowNull: false
          }
        });
        // We're saying that Comment should belong to the User who created it
        // A Comment can't be created without a User
        Comment.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
      };
      return Comment
    }