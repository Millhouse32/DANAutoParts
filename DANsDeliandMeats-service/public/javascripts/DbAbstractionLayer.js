const { json } = require('express');
var mysql = require('mysql');

var connected = false;
var db = null;
var response = [];

var connection = mysql.createConnection({
    host     : '76.189.175.178',
    port     : '65323',
    database : 'danautoparts',
    user     : 'root',
    password : 'DANAutoParts!',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
    connected = true;
});

async function queryCardsCollection() {

    if (connected) {
        // get data from db

        let jsonResponse = {
            "handsetCards": [],
            "webCards": [],
        };

        jsonResponse = await new Promise (function(resolve, reject) {
            connection.query("CALL GetCards()", function(err, rows){
          if(err) {
            console.log(err);
          } else {
            setValue(rows);

            var temp = rows;
            for (var i = 0; i < temp[0].length; i++) {
                let handsetElement = {};
                handsetElement['imageName'] = temp[0][i]['imageName'];
                handsetElement['title'] = temp[0][i]['title'];
                handsetElement['rows'] = temp[0][i]['handsetRows'];
                handsetElement['cols'] = temp[0][i]['handsetCols'];
                handsetElement['content'] = temp[0][i]['content'];
                handsetElement['contentType'] = temp[0][i]['contentype'];
                jsonResponse.handsetCards.push(handsetElement);

                let webElement = {};
                webElement['imageName'] = temp[0][i]['imageName'];
                webElement['title'] = temp[0][i]['title'];
                webElement['rows'] = temp[0][i]['webRows'];
                webElement['cols'] = temp[0][i]['webCols'];
                webElement['content'] = temp[0][i]['content'];
                webElement['contentType'] = temp[0][i]['contentype'];
                jsonResponse.webCards.push(webElement);
            }
            resolve(jsonResponse);     
          }
        });
    });
        return jsonResponse;
    }
    else {
        return null;
    }
}

function setValue(value) {
  response = value;
  //console.log(response);
}

module.exports = { queryCardsCollection };