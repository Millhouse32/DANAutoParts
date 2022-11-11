var express = require('express');
var dbTopSellersGeneral = require('../public/javascripts/DbTopSellersGeneral');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbTopSellersGeneral.queryTopSellersGeneral().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;