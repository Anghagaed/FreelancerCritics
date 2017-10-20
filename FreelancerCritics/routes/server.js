// global variables?
var express = require('express');
var app = express();
//var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

// routes
//var index = require('./index.js');

// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define routes
//app.use('/', index);

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, '../views'));

// Set view engine to use, in this case 'some_template_engine_name'
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '../views'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

/// GET OPERATIONS ///
// main page
app.get('/', function(req, res) {
  //res.send("This is the home page");
  res.render('index');
});

// login page
app.get('/loginpage', function(req, res) {
  res.render('loginpage');
});

// /// POST OPERATIONS ///
// login page
app.post('/loginpage', function(req, res) {
  console.log("something has been sent");
});

//module.exports = router;

// server is working on port 3000
app.listen(3000, function() {
  console.log('FreelancerCritics app listening on http://localhost:3000 !');
});