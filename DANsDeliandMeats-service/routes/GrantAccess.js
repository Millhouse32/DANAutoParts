var express = require ('express');
var dbLogin = require('../public/javascripts/DbGrantAccess');
var router = express.Router();

// POST login
router.post ('/', function(req, res, next){

    dbLogin.queryGrantAccess(req["body"]["email"]).then(response=>{
        console.log(response);
        if (response[0]['email'] == null) {
          console.log('error');
        }
        else {
          console.log('pass');
          res.json({success : true });
        }
      }).catch(error=>{
        res.status(500).json({error});
      });
});


module.exports = router;