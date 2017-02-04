var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Sets up Express to use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("./public"));

// Routes 
require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

require("./routes/html-routes.js")(app);