const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/db');
const users = require('../mapper/users');

module.exports = () => {
  passport.use(
    new LocalStrategy({
      //html 태그 name이랑 같아야함
      usernameField: 'id',
      passwordField: 'password',
    }, async (id, password, done) => {
    try {
      // DB에서 유저 찾기
      db.query( users.selectByUserid, [id], (error, results, fields) => {
        if (error) throw error; //에러처리
        
        if(results[0]) {//id가 있음
          db.query( users.selectByUseridAndPw ,[id, password], (error, results, fields) =>{
            if (error) throw error;
            if(results[0]){ //id, pw 모두 일치
              console.log('localStrategy에서 id,pw 조회 성공');
              console.log(`id=${id},pw=${password} 로그인 성공`);
              let user = results[0];
              done(null, user);
              //return res.send(`id=${id},pw=${password} 로그인 성공`); 
            } else {  //pw 모두 오류
              done(null, false, { message: 'Password Error' });
            }
          });
        } else {  //회원 가입 안 되어 있는 id
          done(null, false, { message: 'You are an unregistered member.' });
        }
      });
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};