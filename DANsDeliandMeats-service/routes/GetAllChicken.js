var express = require('express');
var dbGetAllChicken = require('../public/javascripts/DbGetAllChicken');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbGetAllChicken.queryGetAllChicken().then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({'error': error});
    });
});

module.exports = router;