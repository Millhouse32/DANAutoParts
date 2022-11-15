var express = require('express');
var dbGetAllProducts = require('../public/javascripts/DbGetAllProducts');
var router = express.Router();

router.get('/', function(req, res, next) {
    dbGetAllProducts.queryGetAllProducts().then(response=>{
        res.json(response);
    }).catch(error=> {
        res.status(500).json({'error':error});
    });
});

module.exports = router;