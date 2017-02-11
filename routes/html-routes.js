var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var account = db.account;
var User = db.User;


module.exports = function(app) {
    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    // Login route
    app.post('/login',
        passport.authenticate('local'),
        function(req, res) {
            res.json(req.user);
        }
    );

    app.post('/register', function(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            interests: req.body.interests
        });

        account.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            req.login(account, function(err) {
                if (err) {
                    res.json(err);
                }
                res.json(req.user);
            });
        });
    });

    // ===========================
    // Get HTML route  to forum. Filters  forum topics by Topic

    app.get("/forum", function(req, res) {
        if (req.isAuthenticated()) {
            db.Post.findAll({
                attributes: ["topic"]
            }).then(function(dbForumTopics) {
                res.render("forum", {
                    topic: dbForumTopics
                });
            });
        } else {
            res.redirect('/login');
        }
    });
    // ==============
    //Route to Specific Thread Titles pertaining to topic selected
    app.get("/forum/:topic", function(req, res) {
        if (req.isAuthenticated()) {

            db.Post.findAll({
                    where: {
                        topic: req.params.topic
                    }
                })
                .then(function(dbPosts) {
                    // res.json(dbPosts);
                    res.render("threads", {
                        post: dbPosts
                    });
                });
        } else {
            res.redirect('/login');
        }
    });
    // ==============================
    // GET  Route to all Posts by users under specific topic/ under specific thread title.
    app.get("/forum/:topic/:thread_title", function(req, res) {
        if (req.isAuthenticated()) {
            db.Post.findAll({
                where: {
                    topic: req.params.topic,
                    thread_title: req.params.thread_title
                }
            }).then(function(dbPosts) {
                res.render("posts", {
                    post: dbPosts
                });
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get("/newthread", function(req, res) {
        if (req.isAuthenticated()) {
            res.render("newthread");
        } else {
            res.redirect('/login');
        }
    });

    app.post('/threads', function(req, res) {
        console.log(req.body);
        db.Thread.create({
            thread_title: req.body.threadTitle,
            topic_name: req.body.topic,
            thread_message: req.body.threadMessage
        }).then(function(dbThreads) {
            res.render("posts", { post: dbThreads });
        });
    });
}
