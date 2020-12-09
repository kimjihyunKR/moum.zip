const express = require('express');
const router = express.Router();

router.get('/join', (req, res) => {
  res.render('join');
});

router.get('/', async (req, res, next) => {
  try {
    res.render('test');
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;