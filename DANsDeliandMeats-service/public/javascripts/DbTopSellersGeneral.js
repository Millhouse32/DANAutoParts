const { json } = require('express');
var mysql = require('mysql');

var connected = false;
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

async function queryTopSellersGeneral() {
    if (connected) {
        let jsonResponse = { };
        jsonResponse = await new Promise (function(resolve, reject) {
            let sql = 'CALL TopSellers()';
            connection.query(sql, function(err, rows){
                if (err) {
                    console.log(err);
                }
                else {
                    jsonResponse = rows[0];
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

module.exports = { queryTopSellersGeneral };