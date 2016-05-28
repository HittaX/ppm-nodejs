var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var bootstrap = require('express-bootstrap-service');
var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
}
var app = express();

// http.createServer(app).listen(80);
// app.engine('html',require('ejs').renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('public/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(cookieParser('ppm'));
app.use(session({
  secret: 'wilson'
}));

//Setting Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var content = require('./routes/content');
var logout = require('./routes/logout');

app.use('/', routes);
app.use('/users', users);
app.use('/content', content);
app.use('/logout', logout);

// https.createServer(options,app).listen(443);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(8000);
https.createServer(options,app).listen(8001);

module.exports = app;
