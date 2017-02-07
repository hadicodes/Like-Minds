// api-routes.js - this file offers a set of routes for displaying and saving data to the db


// Dependencies
// =========================
// Requiring our models
// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    // app.get("/api/posts/", function(req, res) {
    //     db.Post.findAll({})
    //         .then(function(dbPosts) {
    //             res.json(dbPost);
    //         });
    // });

    // GET route for returning posts of a specific topic
    app.get("/api/posts/", function (req, res) {
        db.Post.findAll({
                where: {
                    topic: req.params.topic
                }
            })
            .then(function (dbPosts) {
                res.json(dbPosts);
            });
    });

    // POST route for saving a new post message
    app.post("/newpost", function (req, res) {
        console.log(req.body);
        db.Post.create({
                author: req.body.author,
                topic: req.body.topic,
                post_date: req.body.post_date,
                post_message: req.body.body

            })
            .then(function (dbPost) {
                res.json(dbPost);
            }).catch(function (err) {
                console.log(err);
            });
    });


    // GET route for retrieving a single post
    // app.get("/api/posts/:id", function(req, res) {
    //     db.Post.findOne({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //         .then(function(dbPost) {
    //             res.json(dbPost);
    //         });
    // });



    // // DELETE route for deleting posts
    // app.delete("/api/posts/:id", function(req, res) {
    //     db.Post.destroy({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //         .then(function(dbPost) {
    //             res.json(dbPost);
    //         });
    // });

    // PUT route for updating posts
    // app.put("/api/posts", function(req, res) {
    //     db.Post.update(req.body, {
    //             where: {
    //                 id: req.body.id
    //             }
    //         })
    //         .then(function(dbPost) {
    //             res.json(dbPost);
    //         });
    // });
};