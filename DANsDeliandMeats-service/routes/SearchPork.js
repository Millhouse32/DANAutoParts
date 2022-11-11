var express = require('express');
var dbSearchPork = require('../public/javascripts/DbSearchPork');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbSearchPork.querySearchPork(req['body']['keyword']).then(response => {
        res.json(response);
    }).catch(error=> {
        res.status(500).json({});
    });
});

module.exports = router;