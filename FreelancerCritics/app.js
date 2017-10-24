var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('views'));
app.use(express.static('routes'));
app.use(express.static('public'));


var start = require('./routes/index');

app.use('/', start);

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("FreelancerCritics app listening at http://%s:%s", host, port)

})

module.exports = app;