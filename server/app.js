var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var bodyParser = require('body-parser')


var app = express();
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// route files
var authRouter = require('./routes/auth');
var feedRouter = require('./routes/feed');
var userRouter = require('./routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const standardRoute = '/api/';
app.use(standardRoute + 'auth/', authRouter);
app.use(standardRoute + 'feed/', feedRouter);
app.use(standardRoute + 'user/', userRouter);

app.use(standardRoute + 'image/:name', (req, res)=>{
  res.sendFile(__dirname + `/images/${req.params.name}`)
});
app.use(standardRoute + 'user/image/:name', (req, res)=>{
  res.sendFile(__dirname + `/users/${req.params.name}`)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
