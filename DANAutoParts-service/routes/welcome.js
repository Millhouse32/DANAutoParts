var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  setTimeout(() => {
      let jsonResponse = {
    "handsetCards" : [
        { imageName: 'test1', title: 'Test 1', cols: 2, rows: 1 },
        { imageName: 'test2',title: 'Test 2', cols: 2, rows: 1 },
        { imageName: 'test3',title: 'Test 3', cols: 2, rows: 1 },
        { imageName: 'test4',title: 'Test 4', cols: 2, rows: 1 }
      ],
    "webCards" : [
        { imageName: 'test1',title: 'Test 1', cols: 2, rows: 1 },
        { imageName: 'test2',title: 'Test 2', cols: 1, rows: 1 },
        { imageName: 'test3',title: 'Test 3', cols: 1, rows: 2 },
        { imageName: 'test4',title: 'Test 4', cols: 1, rows: 1 }
      ]
  };

    res.json(jsonResponse);

  }, 3000);
});

module.exports = router;
