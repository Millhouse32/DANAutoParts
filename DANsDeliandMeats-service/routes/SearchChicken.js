var express = require('express');
var dbSearchChicken = require('../public/javascripts/DbSearchChicken');
var router = express.Router();

router.post('/', function(req, res, next) {

    dbSearchChicken.querySearchChicken(req['body']['keyword']).then(response => {
        res.json(response);
    }).catch(error=> {
        res.status(500).json({});
    });
});

module.exports = router;