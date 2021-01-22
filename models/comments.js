module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 2200]
          }
      });
    
      Comment.associate = function(models) {
        // We're saying that a comment should belong to a post
        // A comment can't be created without an Post due to the foreign key constraint
        Comment.belongsTo(models.Post, {
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