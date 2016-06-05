var express = require('express');
var router = express.Router();
var sitesDao = require('../dao/sitesDao');

router.get('/dashboard', function (req, res) {
  if(req.cookies.islogin) {
    console.log('cookies:' + req.cookies.islogin);
    req.session.email = req.cookies.islogin;
  }
  if (req.session.email) {
    console.log('session:' + req.session.email);
    res.locals.email = req.session.email;
  } else {
    res.redirect('/signin');
    return;
  }   
  res.render('content/dashboard');
});

router.get('/sites',function (req, res, next) {
  if(req.cookies.islogin) {
    console.log('cookies:' + req.cookies.islogin);
    req.session.email = req.cookies.islogin;
  }
  if (req.session.email) {
    console.log('sessionSITES:' + req.session.email);
    res.locals.email = req.session.email;
  } else {
    res.redirect('/signin');
    return;
  }
  sitesDao.selectSite(req, res, next);
  res.render('content/sites');  
});

router.post('/insertSite', function (req, res, next) {
    console.log('sessionPOST:' + req.session.email);
    sitesDao.insertSite(req, res, next);
});

module.exports = router;
