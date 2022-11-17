var express = require('express');
var dbGetPoundsSold = require('../public/javascripts/DbGetPoundsSold');
var router = express.Router();

router.post('/', function(req,res,next) {

    dbGetPoundsSold.queryGetQuantity(req['body']['PLU']).then (response => {
        res.json(response);
    }).catch(error => {
        res.status(500).json({});
    });
});

module.exports = router;