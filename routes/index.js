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
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;