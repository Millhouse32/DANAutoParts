var express = require('express');
var dbAddUserLayer = require('../public/javascripts/DbDropCart');
var router = express.Router();

router.post('/', function(req, res, next) {

    DbDropCart.queryDropCart(req["body"]["id"]).then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({});
    });
});

module.exports = router;