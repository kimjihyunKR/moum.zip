const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.post('/post', (req, res, next) => {
  console.log(req.body);
  const { user_id, bookname, content } = req.body;
  let sql = 'INSERT INTO wordings (user_id, bookname, content) VALUES ((SELECT user_id FROM users WHERE user_id=?),?,?)';
  db.query(sql, [ user_id, bookname, content ],(error, results, fields) => {
    if (error) throw error;
    res.render('showTest',{
      wordings : results,
    });
  })
});

router.get('/show', (req, res, next) => {
  let sql = 'SELECT * FROM wordings';
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.render('showTest',{
      type : 'All Wordings',
      wordings : results,
    });
  })
});

router.get('/:user_id', (req, res, next) => {
  
  let sql = 'SELECT * FROM wordings where user_id=?';
  db.query(sql, [req.params.user_id], (error, results, fields) => {
    if (error) throw error;
    res.render('showTest',{
      type : 'Wordings of @' + req.params.user_id,
      wordings : results,
    });
  })
});

module.exports = router;