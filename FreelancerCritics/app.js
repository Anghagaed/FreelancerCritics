// Initial Modules stuff
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// Serving static files
app.use(express.static('views'));
app.use(express.static('routes'));
app.use(express.static('public'));

// Use for post body parsing to work
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

// Start
var start = require('./routes/index');
// Login Function
var loginAuth = require('./routes/loginpage');

// Handles Post Methods for Login. Not sure how to delegate this to another file
app.post('/login_verification', function (req, res) {
	loginAuth(req, res);
})

// Handles Index
app.use('/', start);

// Start App
var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("FreelancerCritics app listening at http://%s:%s", host, port)

})

// Export for bin/www
module.exports = app;