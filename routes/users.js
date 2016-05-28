var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function (req, res, next) {
  return userDao.login(req, res, next);
});

router.post('/signup', function (req, res, next) {
  return userDao.insert(req, res, next);
});

module.exports = router;
