//// Import Sequelize library
module.exports = function(sequelize, DataTypes) {

    // Creates post model with column names id, post_name, devoured, and with a timestamp
    var Post = sequelize.define("Post", {
        post_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        //Author has have Posts
        classMethods: {
            associate: function(models) {
                // When we delete an Author, we'll also delete their Posts "cascade"
                // An Author (foreignKey) is required or a Post can't be made
                Post.belongsTo(models.User, {
                    onDelete: "cascade",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    // returns the model we just defined
    return Post;
};
