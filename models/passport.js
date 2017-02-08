var Sequelize = require('sequelize');
var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
    var account = sequelize.define('account', {
        username: DataTypes.STRING,
        hash: {
            type: DataTypes.TEXT
        },
        salt: {
            type: DataTypes.STRING
        }
    });

    passportLocalSequelize.attachToUser(account, {
        usernameField: 'username',
        hashField: 'hash',
        saltField: 'salt'
    });

    return account;
};
