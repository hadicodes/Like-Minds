var express = require('express');
var exphbs = require('express-handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require("./models");
var path = require('path');
var account = db.account;

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('connect-multiparty')());
app.use(session({
    secret: 'super-secret'
}));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

// Sets up Express to use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(account.createStrategy());
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());




// Static directory
app.use(express.static(path.join(__dirname, 'public')));

//require handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");



// Routes 
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
