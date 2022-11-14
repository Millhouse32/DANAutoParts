var express = require('express');
var dbGetCart = require('../public/javascripts/DbGetCart');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbGetCart.queryGetCart(req['body']['id']).then(response =>{
        res.json(response);
    }).catch(error => {
        res.status(500).json({});
    });
});

module.exports = router;