var mysql = require('mysql');
const db = require('../config/db');
 
db.connect();

db.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('TheResult is: ', results);
});

db.end();