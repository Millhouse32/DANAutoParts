var express = require('express');
var dbSearchBeef = require('../public/javascripts/DbSearchBeef');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbSearchBeef.querySearchBeef(req['body']['keyword']).then(response => {
        res.json(response);
    }).catch(error=> {
        res.status(500).json({});
    });
});

module.exports = router;