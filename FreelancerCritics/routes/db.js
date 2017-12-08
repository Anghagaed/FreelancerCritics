// connect to mysql
var mysql = require('mysql');

var DatabaseServer;
var PreparedStatement;
var Server;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CSE120Project"
});


// Hang adding data to user table

con.connect(function(err) {
	con.query("USE app_db;", function (err, result) {
		if (err) throw err;
		console.log("Database is being used");
	});
	
	var userNameTemp = "billydoe";
	var IDTemp = 0;
	var profileIDTemp = 0;
	var passTemp = "CSETest";
	var accountType = "Test";
	
	var query = "INSERT INTO User (ID,username,profileID,password, accountType, creationDate) VALUES (?, ?, ?, ?, ?, '2017-10-07  03:14:07.72');";
	var sql = "INSERT INTO User (ID,username,profileID,password,accountType,creationDate) VALUES (1,'Cindy45',1,'drinkham4','Freelancer','2017-10-07  03:14:07.72');";
	
	
	var i, maxLen;
	i = 0;
	///*
	//for (i = 0, maxLen = 20; i < maxLen; ++i) {
		var userName = userNameTemp + i;
		var ID = IDTemp + i;
		var profileID = profileIDTemp + i;
		var pass = passTemp + i;
		
		var query = con.query(sql, function(err, results) {
			console.log("Completing query");
			if (err) {
				console.log("Found error");
			}
		});
	//}
	//*/
	
	/*
	Notable Link: 
	https://stackoverflow.com/questions/39811509/how-to-display-data-on-a-table-without-refreshing-html-page-using-nodejs-mysq
	
	https://stackoverflow.com/questions/40258816/js-nodejs-read-table-from-db-with-ajax-and-display-in-table
	
	https://www.sitepoint.com/community/t/how-to-properly-populate-html-table-with-jquery-ajax-using-json-formatted-data/202187
	
	https://www.npmjs.com/package/jquery
	
	*/
	///*
	sql = "SELECT * FROM User;";
	con.query(sql, function (err, results) {
		console.log("Start displaying the inserted User");
		if (err) throw err;
		console.log("1st record in User:\n",results[0]);
		console.log("End displaying the inserted User");
	});
	//*/
	console.log("Done with loop sent");
});

/*
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
		  					+   "password  VARCHAR(15) NOT NULL,"
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
    console.log("Table History is created");
  });
	// end: create_tables
	
	// start: display_tables
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
	// end: display_tables

	// start: insert_vars
    // insert profile
    var sql = "INSERT INTO Profile (ID,name,profileContent,phone,email,education,skills) VALUES (1,'Cindy Candy','I like candies and ham. Message me if you want me to eat them for you.','3336669999','supermachoeater@abc.com','middle school','eating');";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted in Profile");
	});
	// insert user
	sql = "INSERT INTO User (ID,username,profileID,password,accountType,creationDate) VALUES (1,'Cindy45',1,'drinkham4','Freelancer','2017-10-07  03:14:07.72');";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted in User");
	});
	// display result
	// display profile
	sql = "SELECT * FROM Profile;";
	con.query(sql, function (err, results) {
		console.log("Start displaying the inserted Profile");
		if (err) throw err;
		console.log("1st record in Profile:\n",results[0]);
		console.log("End displaying the inserted Profile");
	});
	// display user
	sql = "SELECT * FROM User;";
	con.query(sql, function (err, results) {
		console.log("Start displaying the inserted User");
		if (err) throw err;
		console.log("1st record in User:\n",results[0]);
		console.log("End displaying the inserted User");
	});
	// end: insert_vars
    
    // start: update_vars
    sql = "UPDATE Profile SET education = 'high school' WHERE ID = 1";
    con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Profile (education) was updated");
	});
	sql = "UPDATE User SET password = 'ham<3-c@ndy' WHERE ID = 1;";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("User (password) was updated");
	});
	// display result
	// display profile
	sql = "SELECT * FROM Profile;";
	con.query(sql, function (err, results) {
		console.log("Start displaying the updated Profile");
		if (err) throw err;
		console.log("1st record in Profile:\n",results[0]);
		console.log("End displaying the updated Profile");
	});
	// display user
	sql = "SELECT * FROM User;";
	con.query(sql, function (err, results) {
		console.log("Start displaying the updated User");
		if (err) throw err;
		console.log("1st record in User:\n",results[0]);
		console.log("End displaying the updated User");
	});
    // end: update_vars

    // start: delete_vars
    // delete user
	/*
	sql = "DELETE FROM User WHERE ID = 1;";
	con.query(sql, function (err, results) {
		if (err) throw err;
		console.log("Delete User was successful");
	});
	// delete profile
    sql = "DELETE FROM Profile WHERE ID = 1;";
	con.query(sql, function (err, results) {
		if (err) throw err;
		console.log("Delete Profile was successful");
	});
	* /
	// display result
	// display profile
	sql = "SELECT COUNT(ID) FROM Profile;";
	con.query(sql, function (err, results) {
		if (err) throw err;
		console.log("# of records in Profile:\n",results[0]);
	});
	// display user
	sql = "SELECT COUNT(ID) FROM User;";
	con.query(sql, function (err, results) {
		if (err) throw err;
		console.log("# of records in User:\n",results[0]);
	});
    // end: delete_vars
}); //ends connection
*/

