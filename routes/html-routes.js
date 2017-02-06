var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models');
var User = db.User;

module.exports = function(app) {
    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    passport.use(new Strategy(function(username, password, cb) {
        db.users.findByUsername(username, function(err, user) {
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
};
app.post('/login',
    passport.authenticate('local', {
            successRedirect: '/forum',
            failureRedirect: '/login'
                // If this function gets called, authentication was successful.
                // `req.user` contains the authenticated user.
                // res.redirect('/users/' + req.user.username);
        },
        function(req, res) {
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
