var express = require('express');
var dbSearchAll = require('../public/javascripts/DbSearchAll');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbSearchAll.querySearchAll(req['body']['keyword']).then(response => {
        res.json(response);
    }).catch(error=> {
        res.status(500).json({});
    });
});

module.exports = router;