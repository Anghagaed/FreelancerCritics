// Handles password change

		
var edit_authentication = function(req, res) {
	var username = "billydoe1";
	var password = "";
	var currentpass = req.body.currpass;
	var anewpass = req.body.apass;
	var confirmpass = req.body.bpass;
	if(currentpass != anewpass &&(anewpass ===confirmpass)){ 
	password = confirmpass;
	console.log("username: " + username + " \npassword: " + password);

	// create database connection
    var mysql = require('mysql');
    var con = mysql.createConnection({
  		host: "localhost",
  		user: "root",
  		password: "CSE120Project"
	});
	// connect to database
	con.connect(function(err) {
		if (err) throw err;		// throw error when necessary
		console.log("connected!")
		// run query
		con.query("USE app_db;", function (err, result) {
	    	if (err) throw err;
	    	console.log("using app_db");
	  	});
	  	var query1 = con.query("SELECT ID,email FROM User WHERE username = ?", [username], function (err, result) {
	  		// check for errors
	  		if(err) throw err;	// throw error when necessary
	  		// row not found case
	  		if(result.length == 0) {
	  			console.log("username not found");
	  			console.log("redirecting to edit.html");
				res.redirect('edit.html');
	  			return;
	  		}
	  		console.log("username found");
			//generate new ciphertext
			var CryptoJS = require("crypto-js");
	  		var ID = result[0].ID;
	  		var email = result[0].email;
			var newciphertext = CryptoJS.AES.encrypt(username+ID+email+password, password);
            //console.log("message: " + newciphertext);
            var query2 = con.query('UPDATE User SET ciphertext=? WHERE username=?',[newciphertext.toString(),username] ,function (err, result) {
	    	if (err) throw err;
            //console.log("messages:" + newciphertext.toString());
	    	console.log("Updated User table. Redirecting to profilepage!");
                
             //close connection
            con.end(function(err) {
		      if (err) throw err;
                console.log("successfully closed");
		    });
                
            //redirect to profile page 
            res.redirect('profilepage.html');
	  	});//ends query2
	  	});//ends query1 
        
	});//ends con
        
        //close connection
     //   con.end(function(err) {
		//	if (err) throw err;
		//	console.log("successfully closed");
		//	});
        

	}
}
module.exports = edit_authentication;

