// Handles loging authentication
var loginAuthentication = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log("username: " + username + " \npassword: " + password);

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
  	var loginSuccess = false;
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
		// console.log("Ciphered text:\t" + ciphertext_db);
		// console.log("Deciphered text:\t" + plaintext_db);
		if(plaintext_db == message) {
			console.log("Login is successful");
			loginSuccess = true;
		}
		else {
			console.log("Login is unsuccessful");
		}
		console.log("Finished running");
		if(loginSuccess == true) {
			console.log("redirecting to redirect.html");
			res.redirect('redirect.html');
		}
		else {
			console.log("redirecting to loginpage.html");
			res.redirect('loginpage.html');
		}
	});
	
	con.CloseConnection(function(err) {
		if (err) throw err;
		console.log("successfully closed");
	});

	// con.connect(function(err) {
	// 	if (err) throw err;		// throw error when necessary
	// 	console.log("connected!")
	// 	// run query
	// 	con.query("USE app_db;", function (err, result) {
	//     	if (err) throw err;
	//     	console.log("using app_db");
	//   	});
	  	// var loginSuccess = false;
	  	// con.query("SELECT ID,email,ciphertext FROM User WHERE username = ?", [username], function (err, result) {
	  	// 	// check for errors
	  	// 	if(err) throw err;	// throw error when necessary
	  	// 	// row not found case
	  	// 	if(result.length == 0) {
	  	// 		console.log("username not found");
	  	// 		console.log("redirecting to loginpage.html");
				// res.redirect('loginpage.html');
	  	// 		return;
	  	// 	}
	  // 		console.log("username found");
	  // 		var CryptoJS = require("crypto-js");
	  // 		var ID = result[0].ID;
	  // 		var email = result[0].email;
	  // 		var ciphertext_db = result[0].ciphertext;
	  // 		var bytes = CryptoJS.AES.decrypt(ciphertext_db, password);
	  // 		var plaintext_db = bytes.toString(CryptoJS.enc.Utf8);
			// var message = username+ID+email+password;
			// // console.log("Ciphered text:\t" + ciphertext_db);
			// // console.log("Deciphered text:\t" + plaintext_db);
			// if(plaintext_db == message) {
			// 	console.log("Login is successful");
			// 	loginSuccess = true;
			// }
			// else {
			// 	console.log("Login is unsuccessful");
			// }
			// console.log("Finished running");
			// if(loginSuccess == true) {
			// 	console.log("redirecting to redirect.html");
			// 	res.redirect('redirect.html');
			// }
			// else {
			// 	console.log("redirecting to loginpage.html");
			// 	res.redirect('loginpage.html');
			// }
	//   	});
	//   	// close connection
	// 	con.end(function(err) {
	// 		if (err) throw err;
	// 		console.log("successfully closed");
	// 	});
	// });
}
var generateCookie = function() {
	
}
module.exports = loginAuthentication;