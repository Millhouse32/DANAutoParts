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
            connection.query("select * from cards", function(err, rows){
          if(err) {
            throw err;
          } else {
            setValue(rows);

            var temp = rows;
            for (var i = 0; i < temp.length; i++) {
                let handsetElement = {};
                handsetElement['imageName'] = temp[i]['imageName'];
                handsetElement['title'] = temp[i]['title'];
                handsetElement['rows'] = temp[i]['handsetRows'];
                handsetElement['cols'] = temp[i]['handsetCols'];
                handsetElement['content'] = temp[i]['content'];
                handsetElement['contentType'] = temp[i]['contentype'];
                jsonResponse.handsetCards.push(handsetElement);

                let webElement = {};
                webElement['imageName'] = temp[i]['imageName'];
                webElement['title'] = temp[i]['title'];
                webElement['rows'] = temp[i]['webRows'];
                webElement['cols'] = temp[i]['webCols'];
                webElement['content'] = temp[i]['content'];
                webElement['contentType'] = temp[i]['contentype'];
                jsonResponse.webCards.push(webElement);
            }
            resolve(jsonResponse);     
          }
        });
    });
        connection.end();
        return jsonResponse;
    }
    else {
        connection.end();
        return null;
    }
}

function setValue(value) {
  response = value;
  //console.log(response);
}

module.exports = { queryCardsCollection };