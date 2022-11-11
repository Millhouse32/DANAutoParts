var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var addUserRouter = require('./routes/AddUser');
var loginRouter = require('./routes/Login');
var createCartRouter = require('./routes/CreateCart');
var dropCartRouter = require('./routes/DropCart');
var getAdminsRouter = require('./routes/GetAdmins');
var grantAccessRouter = require('./routes/GrantAccess');
var topSellersGeneralRouter = require('./routes/TopSellersGeneral');
var topSellersChickenRouter = require('./routes/TopSellersChicken');
var topSellersBeefRouter = require('./routes/TopSellersBeef');
var topSellersPorkRouter = require('./routes/TopSellersPork');
var getAllBeefRouter = require('./routes/GetAllBeef');
var getAllPorkRouter = require('./routes/GetAllPork');
var getAllChickenRouter = require('./routes/GetAllChicken');
var priceChangeRouter = require('./routes/PriceChange');
var searchAllRouter = require('./routes/SearchAll');
var searchBeefRouter = require('./routes/SearchBeef');
var searchChickenRouter = require('./routes/SearchChicken');
var searchPorkRouter = require('./routes/SearchPork');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/welcome', welcomeRouter);
app.use('/AddUser', addUserRouter);
app.use('/Login', loginRouter);
app.use('/createCart', createCartRouter);
app.use('/DropCart', dropCartRouter);
app.use('/GetAdmins', getAdminsRouter);
app.use('/GrantAccess', grantAccessRouter);
app.use('/TopSellersGeneral', topSellersGeneralRouter);
app.use('/TopSellersChicken', topSellersChickenRouter);
app.use('/TopSellersBeef', topSellersBeefRouter);
app.use('/TopSellersPork', topSellersPorkRouter);
app.use('/GetAllBeef', getAllBeefRouter);
app.use('/GetAllPork', getAllPorkRouter);
app.use('/GetAllChicken', getAllChickenRouter);
app.use('/PriceChange', priceChangeRouter);
app.use('/SearchAll', searchAllRouter);
app.use('/SearchBeef', searchBeefRouter);
app.use('/SearchPork', searchPorkRouter);
app.use('/SearchChicken', searchChickenRouter);


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
