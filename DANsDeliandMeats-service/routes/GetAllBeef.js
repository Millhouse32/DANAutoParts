var express = require('express');
var dbGetAllBeef = require('../public/javascripts/DbGetAllBeef');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbGetAllBeef.queryGetAllBeef().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;