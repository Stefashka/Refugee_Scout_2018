var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

var storyid = 5; // Hier sollen beispielhaft die Bilder der Story mit der ID 5 angezeigt werden

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "SELECT * FROM  pictures WHERE story_id = ?", storyid, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

});