var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

// Login Function
var loginAuth = require('./loginpage');

// Signup Function
var signupConfirm = require('./signuppage');

//Edit Function
var editAuth = require('./edit');

// Search Function
var displaySearch = require('./search');

// GET home page.
router.get('/', function(req, res) {
	var userSession = require('./usersession.js');
	session.StartSession(String(""), res, req);
  	res.sendFile(__dirname + '/views/index.html');
});

// GET login page
router.get('/gotologin', function (req, res) {
	console.log("GET IS CALLED");
	res.redirect('loginpage.html')
});

// GET signup page
router.get('/gotosignup', function (req, res) {
	console.log("GET IS CALLED");
	res.redirect('signuppage.html')
});

// Detects login verification
router.post('/login_authentication', function (req, res) {
	loginAuth(req, res);
});

// Detects signup confirmation
router.post('/signup_confirmation', function (req, res) {
	signupConfirm(req, res);
});

// Detects master login
router.post('/master_login', function (req, res) {
	// Generate user session cookie
	var userSession = require('./usersession.js');
	var session = new userSession();
	var username = "billydoe1"
	session.StartSession(String(username), res, req);
	// Redirect
	res.redirect('profilepage.html');
});

// Search Redirects to Profile
router.post('/redirectProfile', function(req, res) {
  var x = req.body.Username;
  var y = req.body.Name;
  
  console.log(x);
  console.log(y);
  res.redirect('/');
});

//Detects edit confirmation
router.post('/edit_authentication', function (req, res) {
	editAuth(req, res);
});

// Detects search request
router.post('/searchInput', function(req, res) {
	console.log("Search GET IS CALLED");
	displaySearch(req, res);
});

module.exports = router;
