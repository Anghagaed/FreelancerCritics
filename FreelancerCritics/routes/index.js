// index.js - home page

var express = require('express');
var router = express.Router();

// main page
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/loginpage/', function(req, res) {
  res.render('loginpage');
});

module.exports = router;