// connect to mysql
// note: host, user, password may vary (but Hang and Yun have equal cred.)
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
    console.log("Dropped Old database");
  });
	// create database
	con.query("CREATE DATABASE app_db;", function (err, result) {
    if (err) throw err;
    console.log("Database is created");
  });
	// connect to database
	con.query("USE app_db;", function (err, result) {
    if (err) throw err;
    console.log("Database is being used");
  });
	// start: create_tables
	// note: check variable names (sanity check) and variable types like VARCHAR length
	// for common variable types, check: https://stackoverflow.com/questions/354763/common-mysql-fields-and-their-appropriate-data-types
	
	// create Profile (or ProfilePage) table
	con.query("CREATE TABLE Profile(ID INT NOT NULL UNIQUE, "
								+  "name VARCHAR(255) NOT NULL, "
								+  "profileContent VARCHAR(255) NOT NULL, "			// "aboutMe"
								+  "phone VARCHAR(10) NOT NULL, "					// "phoneNumber"(xxxxxxxxxx format)
								+  "email VARCHAR(254) NOT NULL, "
								+  "education VARCHAR(255) NOT NULL, "				// education level
								+  "skills VARCHAR(255) NOT NULL, "					// "specialization" (variable type is to be determined)
								+  "PRIMARY KEY(ID)"
								+  ");", function (err, result) {
  	if (err) throw err;
    console.log("Table Profile is created");
  });
	// create User table
	con.query("CREATE TABLE User(ID INT NOT NULL UNIQUE, " 
							+	"username VARCHAR(20) NOT NULL UNIQUE, "
							+	"profileID INT NOT NULL UNIQUE, "					// "profilePageID"
							+	"accountType VARCHAR(10) NOT NULL, "
							+	"creationDate TIMESTAMP NOT NULL, "					// "accountCreationDate"
							+	"PRIMARY KEY (ID), "
							+	"FOREIGN KEY (profileID) REFERENCES Profile(ID)"
							+ 	");", function (err, result) {
  	if (err) throw err;
    console.log("Table User is created");
  });
	// create Review table
	con.query("CREATE TABLE Review(ID INT NOT NULL, "
							+	  "reviewerID INT NOT NULL, "
							+	  "revieweeID INT NOT NULL, "
							+	  "contentFile VARCHAR(20) NOT NULL, "				// "contentFilename"
							+	  "date TIMESTAMP NOT NULL, "
							+	  "title VARCHAR(40) NOT NULL, "
							+	  "rating DECIMAL(3,2) UNSIGNED NOT NULL, "			// "ratingNumber"
							+	  "verfied BOOL NOT NULL, "							// "verification"
							+	  "PRIMARY KEY (ID), "
							+	  "FOREIGN KEY (reviewerID) REFERENCES User(ID), "
							+	  "FOREIGN KEY (revieweeID) REFERENCES User(ID)"
							+	  ");", function (err, result) {
  	if (err) throw err;
    console.log("Table Review is created");
  });
	// create History table
	con.query("CREATE TABLE History(ID INT NOT NULL, "
								+  "userID INT NOT NULL UNIQUE, "					// cannot have multiple primary keys
								+  "date TIMESTAMP NOT NULL, "
								+  "reviewID INT NOT NULL, "
								+  "PRIMARY KEY (ID), "
								+  "FOREIGN KEY (reviewID) REFERENCES Review(ID),"
								+  "FOREIGN KEY (userID) REFERENCES User(ID)"		// ^ solution
								+  ");", function (err, result) {
  	if (err) throw err;
    console.log("Table  is created");
  });
	// end: create_tables
	
	// start: display tables
	// Profile
	con.query("DESCRIBE Profile;", function (err, rows, fields) {
  	if (err) throw err;
  	console.log("Profile:start");
    console.log(rows);
    console.log("Profile:end");
  });
	// User
	con.query("DESCRIBE User;", function (err, rows, result) {
  	if (err) throw err;
  	console.log("User:start");
    console.log(rows);
    console.log("User:end");
  });
	// Reivew
	con.query("DESCRIBE Review;", function (err, rows, result) {
  	if (err) throw err;
  	console.log("Review:start");
    console.log(rows);
    console.log("Review:end");
  });
	// History
	con.query("DESCRIBE History;", function (err, rows, result) {
  	if (err) throw err;
  	console.log("History:start");
    console.log(rows);
    console.log("History:end");
  });
	// end: create_db

	// start: insert_vars

	// end: insert_vars
});