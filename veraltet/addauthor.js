var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

var author =  {
                                    // keine id angeben, da diese per autoincrement erstellt wird
    name: 'Max Mustermann',
    email: "Maxi99@mm.de",                      // Beispieldaten
    password: "12345"
 }

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "INSERT INTO author SET ?", author, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

});