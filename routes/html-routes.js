var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var account = db.account;


module.exports = function (app) {
    app.get("/login", function (req, res) {


        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    app.post('/login',
        passport.authenticate('local', {
            // failureRedirect: '/login'
        }),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.json(req.user);
        });

<<<<<<< HEAD
    // app.post('/register', function(req, res) {
    //     User.register(req.body.username, req.body.password, function(err, account) {
    //         if (err) {
    //             console.log(err);
    //             return res.json(err);
    //         }
    //         res.json(account);
    //     });
    // });
=======
    app.post('/register', function (req, res) {
        account.register(req.body.username, req.body.password, function (err, account) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            res.json(account);
        });
    });
>>>>>>> master


    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    app.get("/forum", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/forum.html"));
    });

    app.get("/newpost", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/newpost.html"));
    });

    app.get("/topics", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/topics.html"));
    });
};