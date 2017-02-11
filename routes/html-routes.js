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

    // Login route
    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            console.log("HERE");
            console.log('RESPONSE ' + req.user);
            res.json(req.user);
        }
    );

    app.post('/register', function (req, res) {
        console.log(req.body);
        account.register(req.body.username, req.body.password, function (err, account) {
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