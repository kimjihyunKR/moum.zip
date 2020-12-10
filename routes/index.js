const express = require('express');
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

router.get('/join', async (req, res, next) => {
  try {
    res.render('auth',{
      type : 'Join us',
      isJoin : true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/login', async (req, res, next) => {
  try {
    res.render('auth',{
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