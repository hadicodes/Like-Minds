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
        }

    });
// returns the model we just defined
return Post;
};
