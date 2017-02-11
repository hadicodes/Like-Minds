var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var account = db.account;
var User = db.User;


module.exports = function (app) {
    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    passport.use(new Strategy(function (username, password, cb) {
        db.account.findByUsername(username, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

    app.post('/login',
        passport.authenticate('local', {
                successRedirect: '/forum',
                failureRedirect: '/login'
            },
            function (req, res) {
                console.log('RESPONSE ' + res);
            }
        )
    );

    app.post('/register', function (req, res) {
        console.log("USER " + req.body.username, req.body.email, req.body.location, req.body.interests);
        User.create({
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            interests: req.body.interests
        });
        account.register(req.body.username, req.body.password, function (err, account) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            res.json(account);
        });
    });

    app.get("/forum", function (req, res) {
        db.Post.findAll({
            attributes: ["topic"]
        }).then(function (dbForumTopics) {
            res.render("forum", {
                topic: dbForumTopics
            });
        });
    });

    app.get("/threads", function (req, res) {
        db.Post.findAll({
            attributes: ["thread_title"]
        }).then(function (dbThreadTitle) {
            res.render("threads", {
                thread_title: dbThreadTitle
            });
        });
    });

    app.get("/posts/", function (req, res) {
        db.Post.findAll({
            attributes: ["thread_message"]
        }).then(function (dbPosts) {
            res.render("posts", {
                thread_message: dbPosts
            });
        });
    });

    app.get("/newthread", function (req, res) {
        res.render("newthread");
    });
};