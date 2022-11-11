var express = require('express');
var dbTopSellersChicken = require('../public/javascripts/DbTopSellersChicken');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbTopSellersChicken.queryTopSellersChicken().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;