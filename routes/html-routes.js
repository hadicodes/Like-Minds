var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

module.exports = function (app) {
    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    passport.use(new Strategy(function(username, password, cb) {
    	db.users.findByUsername(username, function(err, user) {
    		if (err) { return cb(err); }
	    	if (!user) { return cb(null, false); }
    		if (user.password != password) { return cb(null, false); }
	    	return cb(null, user);
    	});
  	}));
};