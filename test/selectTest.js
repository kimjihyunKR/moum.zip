var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  port     : 3306 ,
  user     : 'root',
  password : '1234',
  database : 'moumzip'
});
 
db.connect();

var userSql = "SELECT * from user";
var wordingSql = "SELECT * from wording";

db.query(userSql, function (error, results, fields) {
  if (error) throw error;
  console.log('TheResult is: ', results);
});

db.end();