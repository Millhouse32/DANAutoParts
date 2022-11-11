const { json } = require('express');
var mysql = require('mysql');

var connected = false;

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

async function querySearchChicken(keyword) {
    if (connection) {
        let jsonResponse = { };
        jsonResponse = await new Promise (function(resolve, reject) {
            let sql = 'CALL SearchChicken(?)';
            connection.query(sql, [keyword], function(err, rows) {
                if (err) {
                    console.log(err);
                    jsonResponse = err;
                    resolve(jsonResponse);
                }
                else {
                    jsonResponse = rows;
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

module.exports = { querySearchChicken };