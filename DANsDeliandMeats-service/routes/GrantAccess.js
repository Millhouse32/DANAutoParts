var express = require ('express');
var dbLogin = require('../public/javascripts/DbGrantAccess');
var router = express.Router();

// POST login
router.post ('/', function(req, res, next){

    dbLogin.queryGrantAccess(req["body"]["email"]).then(response=>{
        var body = {
            "success" : true
        };
        res.json(body);
      }).catch(error=>{
        var body = {
            "success" : false
        };
        res.status(500).json({});
      });
});


module.exports = router;