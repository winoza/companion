module.exports = function(sequelize, DataTypes) {
    const Like = sequelize.define("Like", {
        liked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
      });
    
      Like.associate = function(models) {
        // We're saying that a Like should belong to a post
        // A Like can't be created without an Post due to the foreign key constraint
        Like.belongsTo(models.Image, {
          foreignKey: {
            allowNull: false
          }
        });
        // We're saying that Like should belong to the User who created it
        // A Like can't be created without a User
        Like.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
      };
      return Like
    }