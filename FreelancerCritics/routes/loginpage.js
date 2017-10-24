// Handles Login Auth Shit Done by Yun
var x = function(req, res) {
	var username = req.body.username;
	var userpass = req.body.userpass;
	console.log("username: " + username + " \npassword: " + userpass);
	
	// Do something. I currently prints hello world. U can redirect to loginpage or any other page base on conditions 
	// which is base on database
	// aka shit done by yun.
	res.send("hello world");
	//res.redirect('loginpage.html');
}

module.exports = x;