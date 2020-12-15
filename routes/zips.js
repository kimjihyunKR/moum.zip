const express = require('express');
const db = require('../config/db');
const qoutes = require('../mapper/qoutes');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();


// 모든 zips보기
router.get('/', (req, res, next) => {
  db.query( qoutes.selectAll , (error, results, fields) => {
    if (error) throw error;
    res.render('zips',{
      user : req.user,
      type : 'list of Wordings',
      qoutes : results,
    });
  })
});

// 특정 id의 zips보기
var zipsCount = 0;
router.get('/:user_id', isLoggedIn,(req, res, next) => {
  let userid = req.params.user_id;
  let order = req.query.order;
  
  if(order == 'time' || order == undefined){
    db.query( qoutes.selectByUserid , [userid], (error, results, fields) => {
      if (error) throw error;
      zipsCount = results.length
      res.render('selectZip',{
        user : req.user,
        user_id :userid,
        zipsCount : zipsCount,
        qoutes : results,
      });
    });
  } else if(order == 'book'){
    db.query(qoutes.selectKindOfBook,[userid],(error,results,fields)=>{
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
  db.query( qoutes.insert , [ user_id, bookname, content, parseInt(page) ],(error, results, fields) => {
    if (error) throw error;
    res.redirect('/zips');
  })
});

// zip 수정화면으로 이동
router.post('/edit', isLoggedIn, (req, res, next) => {
  const { qoute_id , returnTo} = req.body;
  db.query( qoutes.selectByQouteId , [ qoute_id ],(error, results, fields) => {
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
  const { bookname, content, page , qoute_id } = req.body;
  db.query( qoutes.update , [ bookname, content, parseInt(page), qoute_id ],(error, results, fields) => {
    if (error) throw error;
    res.redirect('/zips');
  })
});

// zip 삭제하기
router.post('/delete', isLoggedIn, (req, res, next) => {
  const { qoute_id , returnTo } = req.body;
  db.query( qoutes.delete , [ qoute_id ],(error, results, fields) => {
    if (error) throw error;
    res.redirect(returnTo);
  })
});

module.exports = router;