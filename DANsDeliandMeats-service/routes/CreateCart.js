var express = require('express');
var dbAddUserLayer = require('../public/javascripts/DbCreateCart');
var router = express.Router();

/* POST new user. */
router.post('/', function(req, res, next) {

    dbAddUserLayer.queryCreateCart(req["body"]["id"]).then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({});
    });
});

module.exports = router;