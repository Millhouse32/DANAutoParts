var express = require('express');
var dbPriceChange = require('../public/javascripts/DbPriceChange');
var router = express.Router();

router.post('/', function(req, res, next) {
    dbPriceChange.queryPriceChange(req["body"]["table"], req["body"]["PLU"],
    req["body"]["price"]).then(response => {
        res.json(response);
        console.log(response);
    }).catch(error =>{
        res.status(500).json({error});
    });
});

module.exports = router;