//// Import Sequelize library
module.exports = function (sequelize, DataTypes) {

    // Creates user model with column names id, user_name, devoured, and with a timestamp
    var User = sequelize.define("User", {
            user_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            interests: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
        // , {
        //     // We're saying that we want our user to have Posts
        //     classMethods: {
        //         associate: function(models) {
        //             // Associating user with Posts
        //             User.hasMany(models.Post);
        //         }
        //     }
        //}
    );
    // returns the model we just defined
    return User;
};