const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.post('/join', async (req, res, next) => {
  console.log(req.body);
  const { id, password, name } = req.body;
  try {
    //const exUser = await User.findOne({ where: { email } });
    let sql = 'SELECT user_id FROM users WHERE user_id=?';
    db.connect();
    db.query(sql,[id], function (error, results, fields) {
      if (error) throw error;
      if(results[0]){
        return res.send('이미 있는 아이디');
      }
    });
    
    let sql2 = 'INSERT INTO users (user_id, password, name, nickname) VALUES (?,?,?,?);';
    db.query(sql2,[id, password, name,name], (error, results, fields) => {
      if (error) throw error;
      return res.send('가입완료');
    })
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', (req, res, next) => {
  const { id, password } = req.body;
  let sql = 'SELECT * FROM users WHERE user_id=? AND password=?';
  
  db.query(sql,[id, password], (error, results, fields) => {
    if (error) throw error; //에러처리
    if(results[0]){ //사용자가 있을 때 
      return res.send(`id=${id},pw=${password} 로그인 성공`);
    } else {
      return res.send('로그인 실패');
    }
  })
  // passport.authenticate('local', (authError, user, info) => {
  //   if (authError) {
  //     console.error(authError);
  //     return next(authError);
  //   }
  //   if (!user) {
  //     return res.redirect(`/?loginError=${info.message}`);
  //   }
  //   return req.login(user, (loginError) => {
  //     if (loginError) {
  //       console.error(loginError);
  //       return next(loginError);
  //     }
  //     return res.redirect('/');
  //   });
  // })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.

});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;