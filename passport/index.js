const passport = require('passport');
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {   // req.login()에서 넘겨준 user값
    done(null, user);                     // user를 세션에 저장
  });

  // 메모리에 한번만 저장
  passport.deserializeUser((id, done) => {  
    // 매개변수 id는 세션에 저장됨 값(req.session.passport.user)
    done(null, id);
  });
  local();
};
