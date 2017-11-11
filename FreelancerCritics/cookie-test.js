var cookie = require('cookie');
var escapeHtml = require('escape-html');
var express = require('express');
var url = require('url');
var app = express();

app.get('/', function(req, res){
  // Parse the query string 
  var query = url.parse(req.url, true, true).query;
 
  if (query && query.name) {
    // Set a new cookie with the name 
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week 
    }));
 
    // Redirect back after setting cookie 
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');
    res.end();
    return;
  }
 
  // Parse the cookies on the request 
  var cookies = cookie.parse(req.headers.cookie || '');
 
  // Get the visitor name set in the cookie 
  var name = cookies.name;
 
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
 
  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }
 
  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
});

// Start server
var server = app.listen(4000, function () {
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