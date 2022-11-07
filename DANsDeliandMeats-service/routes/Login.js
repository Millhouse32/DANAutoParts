var express = require ('express');
var dbLogin = require('../public/javascripts/DbLoginLayer');
var router = express.Router();

// POST login
router.post ('/', function(req, res, next){

    dbLogin.queryLogin(req["body"]["email"], req["body"]["password"]).then(response=>{
        console.log(response);
        res.json(response);
      }).catch(error=>{
        res.status(500).json({});
      });
});


module.exports = router;