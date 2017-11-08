var mysql = require('mysql');
var cb_default = function(err) {
	if (err) throw err;
}
class mySQLDB {
	// If value not passed, get defaulted
	// If value is passed, uses those values
    constructor (host, user, password) {
		// Super bad, why am i writing our db password in here xD
		if (host == undefined) {
			host = "localhost";
		}
		if (user == undefined) {
			user = "root";
		}
		if (password == undefined) {
			password = "CSE120Project";
		}
		this.host = host;
		this.user = user;
		this.password = password;
		this.CreateConnection();
    }
	// Creates Connection
	CreateConnection() {
		this.con = mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password
		});
	}
	// Prints Connection
	printCon() {
		console.log (this.con);
	}
	// Prints Connection State
	printState() {
		console.log(this.con.state);
	}
	// Opens Connection
	OpenConnection(cb) {
		if(cb == undefined) {
			cb = cb_default;
		}
		this.con.connect(cb);
	}
	// Close Connection
	CloseConnection(cb) {
		if(cb == undefined) {
			cb = cb_default;
		}
		this.con.end(cb);
	}
	// Execute query q with callback function cb
	Query(q, cb) {
		this.con.query(q, cb);
	}
	PrepQuery(q, pa, cb) {
		this.con.query(q, pa, cb);
	}
}

// Examples on how it works
/*
const DBCon = new mySQLDB(); // or const DBCon = new mySQLDB(...);
DBCon.OpenConnection();
DBCon.Query("SELECT ID,email,ciphertext FROM app_db.User", function(err, result) {
	console.log(result);
});
DBCon.CloseConnection();
*/

module.exports = mySQLDB;