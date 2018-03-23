var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', routesApi);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// !@#qweASDzxc
// !@#qweASDzxc


// db.locations.save({
//   name: 'God\'s love',
//   address: 'Adiok Uno fie, Akpan Andem , Ikot ekpene, Ak State',
//   rating: 3,
//   facilities: ['Hot food', 'Food', 'Premium wifi'],
//   coords: [-0.9690884, 51.455041],
//   openingTimes: [{
//     days: 'Monday - Friday',
//     opening: '7:00am',
//     closing: '7:00pm',
//     closed: false
//   }, {
//     days: 'Saturday',
//     opening: '8:00am',
//     closing: '5:00pm',
//     closed: false
//   }, {
//     days: 'Sunday',
//     closed: true
//   }],
//   reviews: {
//     author: 'Blarcmann',
//     id: ObjectId(),
//     rating: 5,
//     timestamp: new Date("Jul 16, 2013"),
//     reviewText: "What a great place. I can't say enough good things about it."
//   }
// })


