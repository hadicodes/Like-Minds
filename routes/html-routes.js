var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var account = db.account;
var User = db.User;


module.exports = function (app) {
    app.get("/login", function (req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/forum');
        }
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

    // Login route
    app.post('/login', passport.authenticate('local', function (req, res) {
        console.log('RESPONSE ROUTES ' + res);
    }));

    app.post('/register', function (req, res) {
        console.log(req.body);
        //User.create({
        //   username: req.body.username,
        //   email: req.body.email,
        //   location: req.body.location,
        //   interests: req.body.interests
        //});
        account.register({
            username: req.body.username,
            password: req.body.password
        }, function (err, account) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
        });
        //passport.authenticate('local', function (err, res) {
        //   console.log(res);
        //res.send(res);
        //});
    });

    // ===========================
    // Get HTML route  to forum. Filters  forum topics by Topic
    app.get("/forum", function (req, res) {
        db.Post.findAll({
            attributes: ["topic"]
        }).then(function (dbForumTopics) {
            res.render("forum", {
                topic: dbForumTopics
            });
        });
    });
    // ==============
    //Route to Specific Thread Titles pertaining to topic selected
    app.get("/forum/:topic", function (req, res) {
        db.Post.findAll({
                where: {
                    topic: req.params.topic
                }
            })
            .then(function (dbPosts) {
                // res.json(dbPosts);
                res.render("threads", {
                    post: dbPosts
                });
            });
    });
    // ==============================
    // GET  Route to all Posts by users under specific topic/ under specific thread title.
    app.get("/forum/:topic/:thread_title", function (req, res) {
        db.Post.findAll({
            where: {
                topic: req.params.topic,
                thread_title: req.params.thread_title
            }
        }).then(function (dbPosts) {
            res.render("posts", {
                post: dbPosts
            });
        });
    });

    app.get("/newthread", function (req, res) {
        res.render("newthread");
    });
};