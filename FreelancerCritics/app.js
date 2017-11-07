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

// Start at the server
var server = require('./routes/server');
app.use('/', server);

// Start server
var server = app.listen(4000, function () {
	// :: is a IPv6 literals and should be surrounded by []
    // Source: https://stackoverflow.com/questions/33853695/node-js-server-address-address-returns
    var host = server.address().address;
    var port = server.address().port;
    // check whether server address is a IPv6 literal
    if(host == "::")
    	console.log("FreelancerCritics app listening at http://[%s]:%s", host, port);
    else
    	console.log("FreelancerCritics app listening at http://%s:%s", host, port);
});

// Export for bin/www
module.exports = app;