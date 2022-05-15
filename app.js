var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./config/connection');
const utilOperation = require('./utils/util_operation') 
var cors = require('cors')

connection.authenticate().then(() => {
  console.log('Successfully connected to DB');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});



// var usersRouter = require('./routes/users');
var userRouter = require('./server/user');
var orderRouter = require('./server/orders');

var app = express();

// module.exports.middleware = function(app){
//   app.use(function (req, res, next) {
//     req.logId = parseInt(utilOperation.randomString(8, '#'))
//     next();
//   })
// }
// this.middleware(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function myCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'authorization,Access-Control-Allow-Origin,Content-Type, Accept, Accept-Language, Origin, User-Agent');
  res.header('Access-Control-Allow-Credentials', true);
  if(req.method === 'OPTIONS') {
      res.sendStatus(204);
  }
  else {
    next();
  }
}
// channel-id,authorization,
app.use(myCors)

// app.use('/', indexRouter);
app.use('/',userRouter);
app.use('/order',orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
