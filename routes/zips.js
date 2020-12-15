const express = require('express');
const db = require('../config/db');
const quotes = require('../mapper/quotes');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();


// 모든 zips보기
router.get('/', (req, res, next) => {
  db.query( quotes.selectAll , (error, results, fields) => {
    if (error) throw error;
    res.render('zips',{
      user : req.user,
      type : 'list of Wordings',
      quotes : results,
    });
  })
});

// 특정 id의 zips보기
var zipsCount = 0;
router.get('/:user_id', isLoggedIn,(req, res, next) => {
  let userid = req.params.user_id;
  let order = req.query.order;
  
  if(order == 'time' || order == undefined){
    db.query( quotes.selectByUserid , [userid], (error, results, fields) => {
      if (error) throw error;
      zipsCount = results.length
      res.render('selectZip',{
        user : req.user,
        user_id :userid,
        zipsCount : zipsCount,
        quotes : results,
      });
    });
  } else if(order == 'book'){
    db.query(quotes.selectKindOfBook,[userid],(error,results,fields)=>{
      if (error) throw error;
      res.render('selectZip',{
        user : req.user,
        user_id :userid,
        zipsCount : zipsCount,
        books : results,
      });
    })   
  }
});

// zip 등록하기
router.post('/post', isLoggedIn, (req, res, next) => {
  let user_id = req.user.user_id;
  const { bookname, content, page } = req.body;
  db.query( quotes.insert , [ user_id, bookname, content, parseInt(page) ],(error, results, fields) => {
    if (error) throw error;
    res.redirect('/zips');
  })
});

// zip 수정화면으로 이동
router.post('/edit', isLoggedIn, (req, res, next) => {
  const { quote_id , returnTo} = req.body;
  db.query( quotes.selectByQuoteId , [ quote_id ],(error, results, fields) => {
    if (error) throw error;
    res.render('edit',{
      user : req.user,
      msg : req.session.msg,
      data : results[0],
      returnTo : returnTo,
    })
  })
});

// zip 수정하기
router.post('/modify', isLoggedIn, (req, res, next) => {
  const { bookname, content, page , quote_id } = req.body;
  db.query( quotes.update , [ bookname, content, parseInt(page), quote_id ],(error, results, fields) => {
    if (error) throw error;
    res.redirect('/zips');
  })
});

// zip 삭제하기
router.post('/delete', isLoggedIn, (req, res, next) => {
  const { quote_id , returnTo} = req.body;
  console.log(returnTo);
  db.query( quotes.delete , [ quote_id ],(error, results, fields) => {
    if (error) throw error;
    res.redirect(returnTo);
  })
});

module.exports = router;