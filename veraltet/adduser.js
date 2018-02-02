var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

var user =  {
                                    // keine id angeben, da diese per autoincrement erstellt wird
    name: 'Max Mustermann',
    author_id: 2                    // in der endversion muss hier die id des eingeloggten users verwendet werden
 }

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "INSERT INTO story SET ?", story, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

});