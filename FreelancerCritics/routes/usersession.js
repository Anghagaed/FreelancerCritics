var cookie = require('cookie');
// default callback function
var cb_default = function(err) {
	if (err) throw err;
}

// handles user cookie
class userSession {
	// Constructor
    constructor () {
    	// stores no private information
    }
    // Starts a user session (generates a corresponding user cookie to keep track) (For testing purposes, it only lasts 1 min)
    StartSession (username, res) {
    	res.setHeader('Set-Cookie', cookie.serialize('username', String(username), {
	      httpOnly: true,
	      maxAge: 60 // currently lasts 1 min
	    }));
	    console.log("Successfully generated cookie");
    }
    // Checks whether a user exists or not
    // Returns the username if found or "" if not found
    FindSession (req) {
    	// Parse the cookies
  		var cookies = cookie.parse(req.headers.cookie || '');
  		// Get the visitor name set in the cookie 
  		var username = cookies.username;
  		// Check whether if a user cookie exists
  		if (username) {
  			console.log("user cookie found: " + username);
  			return username;
  		}
  		else {
  			console.log("user cookie not found");
  			return "";
  		}
    }
}
module.exports = userSession;