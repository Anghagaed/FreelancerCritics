var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

// Login Function
var loginAuth = require('./loginpage');
var signupConfirm = require('./signuppage');

// GET home page.
router.get('/', function(req, res) {
	console.log("Yun is a cookie: ");
	console.log("Im a fking a goku");
  res.sendFile(__dirname + '/views/index.html');
});

// GET 

// Detects login verification
router.post('/login_authentication', function (req, res) {
	loginAuth(req, res);
});

// Detects signup confirmation
router.post('/signup_confirmation', function (req, res) {
	signupConfirm(req, res);
});

module.exports = router;