var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var account = db.account;
var User = db.User;

module.exports = function (app) {
    app.get("/login", function (req, res) {
        //this is a duplicate route - we should change it
        res.sendFile(path.join(__dirname + "/../public/landing.html"));
    });


    //landing Page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/landing.html"));
    });


    // Login route
    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            res.json(req.user);
        }
    );

    app.post('/register', function (req, res) {
        var newUsername = req.body.username;
        console.log(newUsername);
        findUsername(newUsername);

        function findUsername(newUsername) {
            account.findOne({
                where: {
                    username: newUsername
                }
            }).then(function (resDB) {
                console.log("SEQ RES " + resDB);
                if (!resDB) {
                    User.create({
                        username: req.body.username,
                        email: req.body.email,
                        location: req.body.location,
                        interests: req.body.interests
                    });

                    account.register(req.body.username, req.body.password, function (err, account) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                        req.login(account, function (err) {
                            if (err) {
                                res.json(err);
                            }
                            res.json(req.user);
                        });
                    });
                } else {
                    res.json(false);
                }
            });
        }
    });

    // ===========================
    // Get HTML route  to forum. Filters  forum topics by Topic

    app.get("/forum", function (req, res) {
        if (req.isAuthenticated()) {
            db.Post.aggregate(
                'topic',
                'DISTINCT', {
                    plain: false
                }
            ).then(function (dbTopics) {
                res.render("forum", {
                    topic: dbTopics
                });
            });
        } else {
            res.redirect('/login');
        }
    });
    // ==============
    //Route to Specific Thread Titles pertaining to topic selected
    app.get("/forum/:topic", function (req, res) {
        if (req.isAuthenticated()) {
            db.Thread.aggregate(
                'thread_title',
                'DISTINCT', {
                    plain: false,
                    where: {
                        topic_name: req.params.topic
                    }
                }).then(function (dbResults) {
                res.render('threads', {
                    thread: dbResults,
                    helpers: {
                        last: function () {
                            return req.params.topic;
                        }
                    }

                });
            });
        } else {
            res.redirect('/login');
        }
    });
    // ==============================
    // GET  Route to all Posts by users under specific topic/ under specific thread title.

    app.get("/forum/:topic/:thread_title", function (req, res) {
        if (true) { //req.isAuthenticated()
            db.Thread.findOne({
                where: {
                    topic_name: req.params.topic,
                    thread_title: req.params.thread_title
                }
            }).then(function (dbThread) {
                //find all of the posts for this thread 
                //what happens if there aren't topics? We are still trying post
                db.Post.findAll({
                    where: {
                        topic: dbThread.topic_name,
                        thread_title: dbThread.thread_title
                    }
                }).then(function (dbPosts) {
                    res.render("posts", {
                        post: dbPosts,
                        topic: dbThread.topic_name,
                        thread_title: dbThread.thread_title
                    });
                });
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get("/newthread", function (req, res) {
        if (req.isAuthenticated()) {
            res.render("newthread");
        } else {
            res.redirect('/login');
        }
    });

    app.post('/threads', function (req, res) {
        if (req.isAuthenticated()) {
            db.Thread.create({
                thread_title: req.body.threadTitle,
                topic_name: req.body.topic,
                thread_message: req.body.threadMessage
            }).then(function (dbThreads) {
                var thread = [{
                    DISTINCT: dbThreads.thread_title,
                }];
                res.render("threads", {
                    thread: thread,
                    helpers: {
                        last: function () {
                            return req.body.topic;
                        }
                    }
                });
            });
        } else {
            res.redirect('/');
        }
    });

    app.post("/post", function (req, res) {
        if (req.isAuthenticated()) {
            db.Post.create({
                author: req.body.author,
                topic: req.body.topic,
                thread_title: req.body.thread_title,
                thread_message: req.body.thread_message
            }).then(function (dbNewPost) {
                res.redirect("/forum/" + req.body.topic + "/" + req.body.thread_title);
            });

        } else {
            res.redirect('/');
        }
    });

};