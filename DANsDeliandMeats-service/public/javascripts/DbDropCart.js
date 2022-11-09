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

async function queryDropCart(id) {
    if (connected) {
        // attempt to create cart for user

        let jsonResponse = { };
        jsonResponse = await new Promise (function(resolve, reject) {
            let sql = 'CALL DropCart(?)';
            connection.query(sql, [id], function(err, rows){
                if (err) {
                    console.log(err);
                    jsonResponse = {"error":"Cart Table not dropped for user with id: " + id};
                    resolve(jsonResponse);
                }
                else {
                    jsonResponse = {"success": "Cart Table dropped for user with id: " + id};
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

module.exports = { queryDropCart };