var express = require('express');
var dbAddUserLayer = require('../public/javascripts/DbAddUserLayer');
var router = express.Router();

/* POST new user. */
router.post('/', function(req, res, next) {

    dbAddUserLayer.queryAddUser(req["body"]["email"], req["body"]["firstname"], 
    req["body"]["lastname"], req["body"]["password"]).then(response=>{
        res.json(response);
    }).catch(error=>{
        res.status(500).json({});
    });
});

module.exports = router;