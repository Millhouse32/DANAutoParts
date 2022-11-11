var express = require('express');
var dbGetAllPork = require('../public/javascripts/DbGetAllPork');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbGetAllPork.queryGetAllPork().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;