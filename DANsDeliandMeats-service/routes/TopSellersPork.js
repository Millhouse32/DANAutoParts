var express = require('express');
var dbTopSellersPork = require('../public/javascripts/DbTopSellersPork');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbTopSellersPork.queryTopSellersPork().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;