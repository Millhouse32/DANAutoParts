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

        let sql = 'CALL AddUser(?)'
        connection.query(sql, true, (error, result, email, firstname, lastname, password) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results[0]);
        });
    }
    else {
        console.log("Data received");
        console.log(email);
        console.log(firstname);
        console.log(lastname);
        console.log(password);
    }
}

module.exports = { queryAddUser };