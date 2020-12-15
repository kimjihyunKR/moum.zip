const express = require('express');
const db = require('../config/db');
const users = require('../mapper/users');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/mypage/:id', isLoggedIn, async (req, res, next) => {
  res.render('mypage',{
    user : req.user
  });
});

//비밀번호 업데이트
router.post('/update', async (req, res, next) => {
  const { user_id, password2 } = req.body;
  db.query( users.updatePassword ,[ password2, user_id ],(error,results,fields) => {
    if(error) if (error) throw error;
    if(results){
      res.redirect('/');
    }
  });
});

//탈퇴
router.post('/delete', async (req, res, next) => {
  const { user_id } = req.body;
  db.query( users.delete ,[user_id],(error,results,fields) => {
    if(error) if (error) throw error;
    if(results){
      res.redirect('/auth/logout');
    }
  });
});

module.exports = router;