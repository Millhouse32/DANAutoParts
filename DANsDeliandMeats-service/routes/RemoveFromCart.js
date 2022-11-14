var express = require('express');
var dbRemoveFromCart = require('../public/javascripts/DbRemoveFromCart');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbRemoveFromCart.queryRemoveFromCart(req['body']['id'], req['body']['PLU']).then(
        response=> {
            res.json(response);
        }).catch(error => {
            res.status(500).json({});
        });
});

module.exports = router;