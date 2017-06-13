var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'what the hell is going on?' });
});


router.get('/test', function(req, res, next) {
  res.render('index', { title: 'aa' });
});

module.exports = router;
