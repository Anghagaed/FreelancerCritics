// handles signup 
var signup_confirmation = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var default_bio = "This is a profile bio.";
	console.log("username: " + username + " \npassword: " + password + "\nemail: " + email);
	// create database connection
    var mysql = require('mysql');
    var con = mysql.createConnection({
  		host: "localhost",
  		user: "root",
  		password: "CSE120Project"
	});
	// connect to db server
	con.connect(function(err) {
		if (err) throw err;		// throw error when necessary
		console.log("connected!")
	});
	// use app_db for database
	con.query("USE app_db;", function (err, result) {
	   	if (err) throw err;
	   	console.log("using app_db");
	});
	con.query("SELECT * FROM User WHERE username = ? OR email = ?", [username, email], function (err, result) {
		if (err) throw err;
		// check if duplicate(s) is/are found
		if(result != 0) {
	  		// duplicate found... reset the page
	  		console.log("username or email found");
	  		console.log("redirecting to signuppage.html");
			res.redirect('signuppage.html');
	  		return;
	  	}
	  	else {
	  		// no duplicates found... start creating the account
	  		console.log("username and email not found");
	  		console.log("creating an account");
	  		// temporary ID scheme (fix later)
	  		con.query("SELECT MAX(ID) AS max FROM User;", function (err, result) {
	  			var ID = result[0].max+1;
				// encrypt
				var CryptoJS = require("crypto-js");
				var ciphertext = CryptoJS.AES.encrypt(username+ID+email+password, password);
				// prepared statement
				var query = con.query('INSERT INTO User (ID,username,email,ciphertext,profileBio)'
			  								+ ' values (?, ?, ?, ?, ?)', [ID,username,email,ciphertext.toString(),default_bio], function(err, results) {
					if (err) throw err;
				});
		  		// account is successfully created
		  		console.log("account is successfully created")
		  		console.log("redirecting to index.html");
		  		res.redirect('index.html');
		  	});
	  	}
	});
}
module.exports = signup_confirmation;