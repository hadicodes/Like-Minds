//// Import Sequelize library
module.exports = function(sequelize, DataTypes) {

    // Creates post model with column post_id, author, topic, post_title, post_message
    var Topic = sequelize.define("Topic", {
        topic_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        topic_name: {
            type: DataTypes.STRING,
            allowNull: false,
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
    return Topic;
};
