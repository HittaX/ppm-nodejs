var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('basic/signin');
  // next();
});

router.get('/signin', function(req, res) {
  res.render('basic/signin');
  // next();
});

router.get('/signup',function (req, res) {
  res.render('basic/signup');
});

module.exports = router;
