var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  port     : 3306 ,
  user     : 'root',
  password : '1234',
  database : 'moumzip'
});
 
db.connect();

db.query('SELECT * from wording', function (error, results, fields) {
  if (error) throw error;
  console.log('TheResult is: ', results);
});

db.end();