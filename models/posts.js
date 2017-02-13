//// Import Sequelize library
module.exports = function(sequelize, DataTypes) {

    // Creates post model with column post_id, author, topic, post_title, post_message
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
            },
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thread_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thread_message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        }
    }, {
        //Author has have Posts
        // classMethods: {
        //     associate: function(models) {
        //         // When we delete an Author, we'll also delete their Posts "cascade"
        //         // An Author (foreignKey) is required or a Post can't be made
        //         Post.belongsTo(models.User, {
        //             onDelete: "cascade",
        //             foreignKey: {
        //                 allowNull: false
        //             }
        //         });
        //     }
        // }

    });
    // returns the model we just defined
    return Post;
};
