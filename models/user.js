const mysql = require('mysql');
const db = require('../config/db');
const table = 'user';
const con = mysql.createConnection(db);
var returnValue;

module.exports = {

  getAllUsers : () => {
      db.connect();
      let sql = 'select * from user';
      db.query(sql, (err,results, fields) => {
        if (err) throw err;
        returnValue = results;
      });
      db.end();
      return returnValue;
    },
    selectUserById : (id) => {
      db.connect();
      let sql = 'select user_id from user where user_id = ?';
      db.query(sql, [id],(err, results, fields) => {
        if(err) throw err;
        returnValue = results[0].name;
      });
      db.end();
      return returnValue;
    }
}