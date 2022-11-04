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
        console.error('Error connection: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
    connected = true;
});

async function queryLogin(email, password) {
    if (connected) {

        let jsonResponse = { };
        jsonResponse = await new Promise (function(resolve, reject) {
            let sql = 'CALL LogIn(?,?)';
            connection.query(sql, [email, password], function(err, rows){
                if (err){
                    console.log(err);
                    throw err;
                }
                else {
                    jsonResponse = rows[0];
                    resolve(jsonResponse);
                }
            });
        });
        return jsonResponse;

    //     let jsonResponse = {

    //     };

    //     // attempt login
    //     let sql = 'CALL LogIn(?,?)';
    //     console.log(sql);
    //     jsonResponse = await new Promise (function(resolve, reject) {
    //     connection.query(sql, [email, password], function(error, rows, fields) {
    //         if (error) {
    //             return console.error(error.message);
    //         }
    //         console.log(rows[0]);
    //         return rows[0];
    //     });
    // }
    
    }
    else {
        return null;
    }

}

module.exports = { queryLogin };