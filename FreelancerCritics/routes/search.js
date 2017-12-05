var displaySearchQuery = function(req, res) {
	// Display Result of Query
	if (req.body == undefined || req.body.searchInputs == undefined) {
		// Handle case where request is undefined
		console.log("Error Body or SearchInputs is undefined");
		res.redirect('/');
		return;
	}
	
	var queryString = req.body.searchInputs.toString();
	if (queryString == "") {
		// Handle case where queryString is empty by going back to index
		res.redirect('/');
		return;
	}
	console.log("queryString: " + queryString);
	var queryArray = (queryString.split(" ")).filter(e => e !== "");
	
	
	if (queryArray.length == 0) {
		// Invalid query
		console.log("Query of all spaces");
		res.redirect('/');
		return;
	}
	var i, len;
	for (i = 0, len = queryArray.length; i < len; ++i) {
		console.log("queryArray[" + i + "] is " + queryArray[i]);
	}
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
	con.Query("SELECT * FROM user", function (err, result){
		if(result.length == 0) {
			console.log("Nothing was found");
			res.redirect('/');
			return;
		}
		var lenR;
		for (i = 0, lenR = result.length; i < lenR; ++i) {
			var username = result[i].username;
			var ID = result[i].ID;
			var email = result[i].email;
			var ciphertext = result[i].ciphertext;
			/*
			res.write(ID.toString() + "\n");
			res.write(email.toString());
			res.write(username.toString());
			res.write(ciphertext.toString());
			*/
			var table = '<table><tr><td>hi!</td></tr></table>';
			console.log("username: " + username + " ID: " + ID + " email: " + email + " ciphertext: " + ciphertext);
		}
		
		res.end();
	});
	
	// close database connection
	con.CloseConnection(function(err) {
		if (err) throw err;
		console.log("successfully closed");
	});
	

	
	/*
	var table = '<table><tr><td>hi!</td></tr></table>';
	res.write(table);
	res.end();
	*/
	console.log("Redirecting back to / after all operations finish");
	//res.redirect('/');
}
module.exports = displaySearchQuery;