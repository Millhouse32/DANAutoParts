var express = require('express');
var dbUpdatePoundsSold = require('../public/javascripts/DbUpdatePoundsSold');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbUpdatePoundsSold.queryUpdatePoundsSold(req['body']['PLU'], req['body']['val'])
    .then(response => {
        res.json(response);
    }).catch(error => {
        res.status(500).json({});
    });
});

module.exports = router;