const express = require('express');
const passport = require('passport');
const db = require('../config/db');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const users = require('../mapper/users');

const router = express.Router();

router.post('/join', isNotLoggedIn ,async (req, res, next) => {
  const { id, password, name } = req.body;
  try {
    db.query( users.selectByUserid ,[id], function (error, results, fields) {
      if (error) throw error;
      if(results[0]){
        req.session.msg = 'This id already exists.'
        return res.redirect('/join');
      }
    });
    
    db.query( users.insert ,[id, password, name,name], (error, results, fields) => {
      if (error) throw error;
      console.log('가입완료');
      res.redirect('/');
    })
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn ,(req, res, next) => {
  const { returnTo } = req.body;
  console.log(returnTo);
  // passport/localStrategy.js를 실행
  passport.authenticate('local', (authError, user, info) => { 
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.session.msg = info.message;
      return res.redirect('/login');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  console.log('logout 성공');
  res.redirect('/');
});

module.exports = router;