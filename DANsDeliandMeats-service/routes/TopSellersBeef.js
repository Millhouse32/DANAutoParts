var express = require('express');
var dbTopSellersBeef = require('../public/javascripts/DbTopSellersBeef');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbTopSellersBeef.queryTopSellersBeef().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;