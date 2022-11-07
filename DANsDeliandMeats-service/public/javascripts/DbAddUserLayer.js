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



async function queryAddUser(email, firstname, lastname, password) {
    if (connected) {
        // attempt to add user

        let jsonResponse = { };
        jsonResponse = await new Promise (function(resolve, reject) {
            let sql = 'CALL AddUser(?,?,?,?)';
            connection.query(sql, [email, firstname, lastname, password], function(err, rows){
                if (err) {
                    console.log(err);
                    jsonResponse = {"error":"user already exists!"};
                    resolve(jsonResponse);
                }
                else {
                    jsonResponse = {"success": "user created!"};
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

module.exports = { queryAddUser };