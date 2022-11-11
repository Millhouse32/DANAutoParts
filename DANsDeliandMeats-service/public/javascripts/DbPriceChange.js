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

async function queryPriceChange(table, PLU, price) {
    if (connected) {
        let jsonResponse = { };
        jsonReponse = await new Promise (function(resolve, reject) {
            let sql = 'CALL PriceChange(?,?,?)';
            connection.query(sql, [table, PLU, price], function(err, rows) {
                if (err) {
                    jsonResponse = {"success" : false};
                    resolve(jsonResponse);
                }
                else {
                    jsonResponse = {"success": true};
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

module.exports = { queryPriceChange };