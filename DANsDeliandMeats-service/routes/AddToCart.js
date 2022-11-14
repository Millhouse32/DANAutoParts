var express = require('express');
var dbAddToCart = require('../public/javascripts/DbAddToCart');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbAddToCart.queryAddToCart(req['body']['id'], req['body']['PLU'], req['body']['item'],
    req['body']['quantity'], req['body']['price']).then(response=> {
        res.json(response);
    }).catch(error =>{
        res.status(500).json({});
    });
});

module.exports = router;