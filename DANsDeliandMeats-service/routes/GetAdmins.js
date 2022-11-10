var express = require ('express');
var dbLogin = require('../public/javascripts/DbGetAdmins');
var router = express.Router();

// POST login
router.get ('/', function(req, res, next){

    dbLogin.queryGetAdmins().then(response=>{
        console.log(response);
        res.json(response);
      }).catch(error=>{
        res.status(500).json({});
      });
});


module.exports = router;