var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

// Login Function
var loginAuth = require('./loginpage');

// GET home page.
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// GET 

// Detects login verification
router.post('/login_authentication', function (req, res) {
	loginAuth(req, res);
});

module.exports = router;