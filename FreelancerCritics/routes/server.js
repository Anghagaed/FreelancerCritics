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

// Profile Function 
var displayProfile = require('./profilepage');

// GET home page.
router.get('/', function(req, res) {
	var userSession = require('./usersession.js');
	var session = new userSession();
	session.StartSession(String(""), res, req);
	console.log("index: "+session.FindSession(req));
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
	var username = "billydoe1";
	session.StartSession(String(username), res, req);
	displayProfile(req,res);
});

// Search Redirects to Profile
router.post('/redirectProfile', function(req, res) {
	console.log(req.body.username);
   displayProfile(req,res);
});

//Detects edit confirmation
router.post('/edit_authentication', function (req, res) {
	editAuth(req, res);
});

// Detects search request
router.post('/searchInput', function(req, res) {
	var userSession = require('./usersession.js');
	var session = new userSession();
	console.log('search: '+session.FindSession(req));
	console.log("Search GET IS CALLED");
	displaySearch(req, res);
});

// Detects profile page request
router.post('/displayProfile', function(req, res) {
	console.log("DisplayProfile T IS CALLED");
	displayProfile(req, res);
});

router.post('/gotoprofile', function(req, res) {
	console.log("gotoprofile IS CALLED");
	displayProfile(req, res);
});

module.exports = router;
