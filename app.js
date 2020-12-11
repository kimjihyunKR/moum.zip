const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const passportConfig = require("./passport");  // passport/index.js

const indexRouter = require('./routes'); //index생략
const authRouter = require('./routes/auth');
const zipsRouter = require('./routes/zips');
const userRouter = require('./routes/user');

const app = express();
passportConfig(); //passport 설정
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html'); //view engine 설정
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));
app.use('/static', express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, '/public'))); //정적 폴더 설정
app.use(express.urlencoded({ extended: false }));
//console.log(process.env.COOKIE_SECRET);
app.use(cookieParser('moumzipsecret'));

app.use(session({ //세션 설정
  resave: false,
  saveUninitialized: true,
  secret: 'moumzipsecret',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

//라우터 처리
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/zips', zipsRouter);
app.use('/user', userRouter);


// 에러처리
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});