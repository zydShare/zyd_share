var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'haha' });
});

module.exports = router;
