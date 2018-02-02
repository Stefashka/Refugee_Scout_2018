var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

var bestimmteperson = 1; // In der Endversion muss hier der gesuchte Author ausgewählt werden

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "SELECT * FROM  author WHERE id = ?", bestimmteperson, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

});