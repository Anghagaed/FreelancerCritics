
/*
// Testing read file
var displaySearchQuery = function(req, res) { 
  var fs = require('fs');
  var exec = require('child_process').exec;
  var y = fs.readFileSync('./views/search1', 'utf8');
  res.write(y);
  var z = fs.readFileSync('./views/search2', 'utf8');
  res.write(z);
  res.end();
  
}
*/
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
	
	con.Query("SELECT * FROM User, Profile WHERE User.ID=Profile.ID", function (err, result){
		

		if(result.length == 0) {
			console.log("Nothing was found");
			res.redirect('/');
			return;
		}
    
    	var fs = require('fs');
    	var exec = require('child_process').exec;
    
   	 	var read1 = fs.readFileSync('./views/search1', 'utf8');
    	var read2 = fs.readFileSync('./views/search2', 'utf8');
    
    	var formheader = "<form id='searchBar' action='/redirectProfile' method='POST' name='redirectProfile'>";
    
    	var hiddenValue0 = "<input type='hidden' id='Username' name='Username= value='";
    	var hiddenValue1 = "";
    	var hiddenValue2 = "'>";

    	var submitValue0 = "<input type='submit' value='";
    	var submitValue1 = "";
    	var submitValue2 = "'>";

    	var body = "";
    
		for (i = 0, lenR = result.length; i < lenR; ++i) {
			console.log(result[i]);
			//hiddenValue1 = result[i].
		}
		var finalHTML = (read1 + body + read2).toString();
		res.send(finalHTML);
	});
	
	// close database connection
	con.CloseConnection(function(err) {
		if (err) throw err;
		console.log("successfully closed");
	});

	console.log("Redirecting back to / after all operations finish");
	//res.redirect('/');
}

module.exports = displaySearchQuery;