var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CSE120Project"
});

con.connect(function(err) {
	// start: create_db
	// drop old database
	con.query("DROP DATABASE IF EXISTS app_db;", function (err, result) {
    	if (err) throw err;
	});
	// create database
	con.query("CREATE DATABASE app_db;", function (err, result) {
    	if (err) throw err;
	});
	// connect to database
	con.query("USE app_db;", function (err, result) {
    	if (err) throw err;
  	});
	// //create user table (temporary schema)
	con.query("CREATE TABLE User(ID INT NOT NULL UNIQUE, " 
							+	"username VARCHAR(20) NOT NULL UNIQUE, "
		  					+	"email VARCHAR(254) NOT NULL, "
		  					+	"ciphertext VARCHAR(255) NOT NULL, "
							+	"PRIMARY KEY (ID) "
							+ 	");", function (err, result) {
		if (err) throw err;
	});
	con.query("CREATE TABLE Profile(ID INT NOT NULL UNIQUE, "
								+  "name VARCHAR(255) NOT NULL, "
								+  "profileContent VARCHAR(255) NOT NULL, "			// "aboutMe"
								+  "phone VARCHAR(10) NOT NULL, "					// "phoneNumber"(xxxxxxxxxx format)
								+  "education VARCHAR(255) NOT NULL, "				// education level
								+  "skills VARCHAR(255) NOT NULL, "					// "specialization" (variable type is to be determined)
								+  "PRIMARY KEY(ID)"
								+  ");", function (err, result) {
  	if (err) throw err;
    console.log("Table Profile is created");
  });
	// user
	var ID = 1;
	var username = "billydoe1";
	var password = "taco123";
	var email = "bdoe@abc.net";
	// profile
	var name = "Billy Doe";
	var profileContent = "This is profile.";
	var phone = "1112223333";
	var education = "Some Education";
	var skills = "Some skills";

	// encrypt
	var CryptoJS = require("crypto-js");
	var ciphertext = CryptoJS.AES.encrypt(username+ID+email+password, password);
	// prepared statement
	var query = con.query('INSERT INTO User (ID,username,email,ciphertext)'
  								+ ' values (?, ?, ?, ?)', [ID,username,email,ciphertext.toString()], function(err, results) {
		if (err) throw err;
	});
	var query = con.query('INSERT INTO Profile (ID,name,profileContent,phone,education,skills)'
  								+ ' values (?, ?, ?, ?, ?, ?)', [ID,name,profileContent,phone,education,skills], function(err, results) {
		if (err) throw err;
	});
});
