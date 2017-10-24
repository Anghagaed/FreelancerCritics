var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

module.exports = router;


