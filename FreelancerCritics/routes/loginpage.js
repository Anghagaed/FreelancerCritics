// Handles loging authentication
var loginAuthentication = function(req, res) {
	// Handles user sessions
	var userSession = require('./usersession.js');
	var session = new userSession();
	var username = req.body.username;
	var password = req.body.password;
	console.log("username: " + username + " \npassword: " + password);
	// Handles db operations
	var DB = require('./DBClass.js');
	// Make the new class
	var con = new DB();
	// create database connection
    con.OpenConnection(function(err) {
    	if(err) throw err;
    	console.log("connected!");
    });
    con.Query("USE app_db;", function (err, result) {
    	if (err) throw err;
    	console.log("using app_db");
  	});
  	con.PrepQuery("SELECT ID,email,ciphertext FROM User WHERE username = ?", [username], function (err, result) {
  		// check for errors
  		if(err) throw err;	// throw error when necessary
  		// row not found case
  		if(result.length == 0) {
  			console.log("username not found");
  			console.log("redirecting to loginpage.html");
			res.redirect('loginpage.html');
  			return;
  		}
  		console.log("username found");
  		var CryptoJS = require("crypto-js");
  		var ID = result[0].ID;
  		var email = result[0].email;
  		var ciphertext_db = result[0].ciphertext;
  		var bytes = CryptoJS.AES.decrypt(ciphertext_db, password);
  		var plaintext_db = bytes.toString(CryptoJS.enc.Utf8);
		var message = username+ID+email+password;
		if(plaintext_db == message) {
			console.log("Login is successful. Generating a user session for " + username);
			session.StartSession(String(username), res, req);
			console.log("redirecting to profilepage.html");
			res.redirect('profilepage.html');
			res.end();
		}
		else {
			console.log("Login is unsuccessful");
			console.log("redirecting to loginpage.html");
			res.redirect('loginpage.html');
			res.end();
		}
		console.log("Finished running");
	});
	
	con.CloseConnection(function(err) {
		if (err) throw err;
		console.log("successfully closed");
	});
}
module.exports = loginAuthentication;