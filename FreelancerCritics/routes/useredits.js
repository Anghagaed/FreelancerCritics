var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CSE120Project"
});



//delete user
con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM User WHERE username = 'Cindy45'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

//insert user
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO User (ID,username,profileID,password,accountType,creationDate) VALUES (1,'Tommy56',546,'shootingstars4','Customer','10/06/17')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
//update user password 
con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE User SET password = 'kanyon45' WHERE username = 'Tom345'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});
	