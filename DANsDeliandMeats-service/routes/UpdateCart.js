var express = require('express');
var dbUpdateCart = require('../public/javascripts/DbUpdateCart');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbUpdateCart.queryUpdateCart(req['body']['id'], req['body']['PLU'], req['body']['quantity'])
    .then(response => {
        res.json(response);
    }).catch(error => {
        res.status(500).json({});
    });
});

module.exports = router;