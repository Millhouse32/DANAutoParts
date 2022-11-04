var express = require('express');
var router = express.Router();

/* sendd home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
