var profileQuery = function(req, res) {
	var userSession = require('./usersession.js');
  var session = new userSession();
  var username =session.FindSession(req);
  username = req.body.username;
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
	
	con.PrepQuery(" SELECT name, profileContent, phone, education, skills FROM User, Profile  WHERE User.ID=Profile.ID AND username=?;", [username],function (err, result){
		
console.log("SARAH IS TIRED.");

		if (err) console.log("THERE IS ERROR");

		if(result == undefined) {
			console.log("Invalid Query");
			res.redirect('/');
			return;
		}
    
    	var fs = require('fs');
    	var exec = require('child_process').exec;

    	if (result.length == 0) {
    		console.log("FOUND NOTHING");
    		var read3 = fs.readFileSync('./views/profile3', 'utf8');

    		res.redirect('/');
        return;
    	}
    	else {
    		console.log("FOUND SOMETHING");
	   	 	var read1 = fs.readFileSync('./views/profile1', 'utf8');
	    	var read2 = fs.readFileSync('./views/profile2', 'utf8');

	    	var formheader = "<tr><th>";
	    	var formEnder = "</th>";

	    	var body = "";
	    	
			var name= result[0].name.toString();
			var phone=result[0].phone.toString();
			var profileContent=result[0].profileContent.toString();
			var education=result[0].education.toString();
			var skills = result[0].skills.toString();

			body = body + "<th>" + name + "</th>";
			body = body + "<th>" + phone + "</th>";
			body = body + "<th>" + profileContent + "</th>";
			body = body + "<th>" + education + "</th>";
			body = body + "<th>" + skills + "</th>";

			var finalHTML = (read1 + body + read2).toString();
			console.log(finalHTML);
			res.send(finalHTML);
		}

		// close database connection
		con.CloseConnection(function(err) {
			if (err) throw err;
			console.log("successfully closed");
		});
	});

/*
    // Handles user sessions
    var userSession = require('./usersession.js');
    var username = document.cookie;

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

      con.PrepQuery("SELECT name, profileContent, phone, education, skills FROM User,Profile WHERE username = ? AND Profile.ID = User.ID", [username], function (err, result) {
        // check for errors
        console.log("THIS IS SARAH SPECIFIC");
        if(err) throw err;  // throw error when necessary

        if (result == undefined) {
          console.log("Query is not working");
          res.Redirects('/');
        }

        // row not found case
        if(result.length == 0) {
          console.log("username not found");
          console.log("redirecting to profilepage.html");
        res.redirect('profilepage.html');
          return;
        }
        
        console.log("username found");
        var names = result[0].name;
        var profileC = result[0].profileContent;
      var phone = result[0].phone;
        var education = result[0].education;
        var skills = result[0].skills;
        console.log("skills: " + skills);
        
      console.log("Finished running");
    });
    
    con.CloseConnection(function(err) {
      if (err) throw err;
      console.log("successfully closed");
    });

*/

}
module.exports = profileQuery;