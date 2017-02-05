var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var User = db.User;

module.exports = function (app) {
    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    app.post('/login', 
        passport.authenticate('local', {
            successRedirect: '/forum',
            failureRedirect: '/login'
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            // res.redirect('/users/' + req.user.username);
        },
        function(req,res){
            console.log('RESPONSE ' + res);
            }
    ));

    app.post('/register', function(req, res) {
        User.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            res.json(account);
        });
    });
};