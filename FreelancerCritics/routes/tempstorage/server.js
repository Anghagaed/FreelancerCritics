// global variables
var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
//start:idk_these
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
//var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
//end:idk_these
// routes
//var routes = require('./routes/index');
//var users = require('./routes/users');

// view engine
app.set('views', path.join(__dirname, '../views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// connect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CSE120Project"
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));


app.listen(3000);