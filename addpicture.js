var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

var picture =  {
                                    // keine id angeben, da diese per autoincrement erstellt wird
    story_id: 5,
    bild: "crime/bild3.jpg",
    bildtext: "",
    position: "",
    typ: ""
 }

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "INSERT INTO pictures SET ?", picture, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

});