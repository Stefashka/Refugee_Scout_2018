var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "SELECT * FROM  story WHERE author_id = 1", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            //console.log("Result: " , result);
            //console.log("Result: " + rows[0])
        });

});