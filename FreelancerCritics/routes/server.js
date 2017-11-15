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

// GET home page.
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Detects login verification
router.post('/login_authentication', function (req, res) {
	loginAuth(req, res);
});

// Detects signup confirmation
router.post('/signup_confirmation', function (req, res) {
	signupConfirm(req, res);
});

//Detects edit confirmation
router.post('/edit_authentication', function (req, res) {
	editAuth(req, res);
});

module.exports = router;
