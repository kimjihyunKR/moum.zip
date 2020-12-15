var mysql      = require('mysql');

var db = mysql.createConnection({
  host     : '127.0.0.1',
  port     : 3306 ,
  user     : 'root',
  password : '1234',
  database : 'moumzip',
  dateStrings : 'date',
});

module.exports = db;