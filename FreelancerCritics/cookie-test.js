//var cookie = require('cookie');
var express = require('express');
var url = require('url');
var escapeHtml = require('escape-html'); // used for html script
var app = express();

var userSession = require('./routes/usersession.js');
var session = new userSession();

app.get('/', function(req, res){
  // Parse the query string 
  var query = url.parse(req.url, true, true).query;
  if (query && query.name) {
    // Set a new cookie with the name 
 	session.StartSession(String(query.name),res, req);
    // Redirect back after setting cookie 
    // res.statusCode = 302;
    // res.setHeader('Location', req.headers.referer || '/');
    //res.end();
    return;
  }
  // Get the visitor name set in the cookie 
  var name = session.FindSession(req);
 
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
 
  if (name) {
  	console.log("found name: " + name);
  	// page for returning user
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
  	console.log("name not found");
  	// page for new user
    res.write('<p>Hello, new visitor!</p>');
  }
  // button
  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
});

// Start server
var server = app.listen(5000, function () {
  // :: is a IPv6 literals and should be surrounded by []
    // Source: https://stackoverflow.com/questions/33853695/node-js-server-address-address-returns
    var host = server.address().address;
    var port = server.address().port;
    // check whether server address is a IPv6 literal
    if(host == "::")
      console.log("listening at http://[%s]:%s", host, port);
    else
      console.log("listening at http://%s:%s", host, port);
});