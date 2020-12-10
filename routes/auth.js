const express = require('express');
const passport = require('passport');
const db = require('../config/db');
const router = express.Router();

router.post('/join', async (req, res, next) => {
  console.log(req.body);
  const { id, password, name } = req.body;
  try {
    //const exUser = await User.findOne({ where: { email } });
    let sql = 'SELECT user_id FROM users WHERE user_id=?';
    // db.connect();
    db.query(sql,[id], function (error, results, fields) {
      if (error) throw error;
      if(results[0]){
        return res.send('이미 있는 아이디');
      }
    });
    
    let sql2 = 'INSERT INTO users (user_id, password, name, nickname) VALUES (?,?,?,?);';
    db.query(sql2,[id, password, name,name], (error, results, fields) => {
      if (error) throw error;
      console.log('가입완료');
      res.redirect('/');
    })
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', (req, res, next) => {
  // passport/localStrategy.js를 실행
  passport.authenticate('local', (authError, user, info) => { 

    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
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
  console.log(req.user.user_id + 'logout 성공');
  res.redirect('/');
});

module.exports = router;