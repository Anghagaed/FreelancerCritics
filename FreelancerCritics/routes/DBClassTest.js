var express = require('express');
var app = express();
// Get the class, the class is now named DB
var DB = require('./DBClass.js');

// Make the new class
var x = new DB();

// Use as needed
x.OpenConnection();
x.Query("SELECT ID,email,ciphertext FROM app_db.User", function(err, result) {
	console.log(result);
});
x.CloseConnection();


