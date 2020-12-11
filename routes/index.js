const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('index',{
      user : req.user, //세션에 있는 user값 넘기기
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/join', isNotLoggedIn, async (req, res, next) => {
  try {
    res.render('auth',{
      user : req.user,
      type : 'Join us',
      isJoin : true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/login', isNotLoggedIn, async (req, res, next) => {
  try {
    res.render('auth',{
      user : req.user,
      type : 'Log in',
      isJoin : false,
      msg : req.session.msg,
    });
    req.session.msg = null; //비우기
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;