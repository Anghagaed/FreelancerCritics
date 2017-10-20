// var express = require('express');
// var router = express.Router();


// /* GET login page. */
// router.get('/', function(req, res, next) {
//     res.render('loginpage', { title: 'Login Page' });
// });

// module.exports = router;

function handleLogin(userid, passid){
    var username = document.getElementById(userid).value;
    var password = document.getElementById(passid).value;
    // var username = "billydoe1";
    // var password = "taco123";
    // create database connection
    var mysql = require('mysql');
    var con = mysql.createConnection({
  		host: "localhost",
  		user: "root",
  		password: "CSE120Project"
	});
	con.connect(function(err) {
		// connect to database
		con.query("USE app_db;", function (err, result) {
	    	if (err) throw err;
	  	});
	  	con.query("SELECT ID,email,ciphertext FROM User WHERE username = ?", [username], function (err, result) {
	  		if(err) throw err;
	  		console.log("username: " + username + " password: " + password);
	  		var CryptoJS = require("crypto-js");
	  		var ID = result[0].ID;
	  		var email = result[0].email;
	  		var ciphertext_db = result[0].ciphertext;
	  		var bytes = CryptoJS.AES.decrypt(ciphertext_db, password);
	  		var plaintext_db = bytes.toString(CryptoJS.enc.Utf8);
			var message = username+ID+email+password;
			console.log("Ciphered text:\t" + ciphertext_db);
			console.log("Deciphered text:\t" + plaintext_db);
			//var ciphertext_user = CryptoJS.AES.encrypt(username+ID+email+password, password);
			//bytes = CryptoJS.AES.decrypt(ciphertext_user.toString(), password);
	  		//var plaintextuser = bytes.toString(CryptoJS.enc.Utf8);
			if(plaintext_db == message) {
				alert("Login is successful");
				console.log("Login is successful");
			}
			else {
				alert("Login is unsuccessful");
				console.log("Login is unsuccessful");
			}
	  	});
	  	console.log("Finished running");
	});
}

/*
function RememberUsername(){
    
}

function RememberPassword(){
    
}*/
