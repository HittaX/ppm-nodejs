var express = require('express');
var router = express.Router();
var sitesDao = require('../dao/sitesDao');
var bankcardsDao = require('../dao/bankcardsDao');
var serversDao = require('../dao/serversDao');
var databasesDao = require('../dao/databasesDao');

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
    // res.render('content/sites');
});

router.post('/insertSite', function (req, res, next) {
    console.log('sessionPOST:' + req.session.email);
    sitesDao.insertSite(req, res, next);
});

router.get('/bankcards',function (req, res, next) {
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
    bankcardsDao.selectBankcard(req, res, next);
    // res.render('content/sites');
});

router.post('/insertBankcard', function (req, res, next) {
    console.log('sessionPOST:' + req.session.email);
    bankcardsDao.insertBankcard(req, res, next);
});

// router.get('/identities',function (req, res, next) {
//     if(req.cookies.islogin) {
//       console.log('cookies:' + req.cookies.islogin);
//       req.session.email = req.cookies.islogin;
//     }
//     if (req.session.email) {
//       console.log('sessionSITES:' + req.session.email);
//       res.locals.email = req.session.email;
//     } else {
//       res.redirect('/signin');
//       return;
//     }
//     sitesDao.selectSite(req, res, next);
//     // res.render('content/sites');
// });

router.get('/servers',function (req, res, next) {
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
    serversDao.selectServer(req, res, next);
    // res.render('content/sites');
});

router.post('/insertServer', function (req, res, next) {
    console.log('sessionPOST:' + req.session.email);
    serversDao.insertServer(req, res, next);
});

router.get('/databases',function (req, res, next) {
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
    databasesDao.selectDatabase(req, res, next);
    // res.render('content/databases');
});

router.post('/insertDatabase',function (req, res, next) {
    console.log('sessionPOST:' + req.session.email);
    databasesDao.insertDatabase(req, res, next);
});

module.exports = router;
