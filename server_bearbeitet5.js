//Import the necessary libraries/declare the necessary objects


var express = require("express");
var session = require('express-session')
var myParser = require("body-parser");
var app = express();
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "refugee_db"
});

//CODE Inspiriert von https://medium.com/technoetics/handling-user-login-and-registration-using-nodejs-and-mysql-81b146e37419

/** Bodyparser wird verwendet? */
app.use(myParser.urlencoded({extended : true}));

//Session Versuch

console.log ('Session Stelle 1 wird gestartet');

app.use(session({

    secret: 'ssshhhhh',
    // name: cookie_name,
    // store: sessionStore,
    proxy: true,
    resave: true,
    saveUninitialized: true

}));

console.log (session);

var sess;


//Bilderupload
const fileUpload = require('express-fileupload');

app.get("/upload", function(request, response) {
    console.log("upload");
    response.sendFile('C:/users/elisabeth/Refugee_Scout_2018/testindex.html');
});

app.use(fileUpload());

app.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('C:/users/elisabeth/Refugee_Scout_2018/storyimages/filename.jpg', function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});


//Loginseite

/** Abruf von login.html, webb /login aufgerufen wird */

app.get("/login", function(request, response) {
	console.log("login");
	response.sendFile('C:/users/elisabeth/Refugee_Scout_2018/index.html');
});

/** Zurückschicken der eingegebenen Daten vom Browser zum Server (Bei KLick auf register) */
// Nutzereingabe in 2 Variablen überführen: BENUTZERNAME & PASSWORT
// 2 Variablen mit Datenbank abgleichen
//Anpassen an unsere Datenbank notwendig!!

//registration
app.post("/registeruser", function(request, response) {

    console.log(request.body); //This prints the JSON document received (if it is a JSON document)

	  var users= {
	    "username":request.body.username,
	    "email":request.body.email,
	    "password":request.body.password,
	  }

	  connection.query('INSERT INTO author SET ?',users, function (error, results, fields) { //wo ist fields?

	  	if (error) {
	    	console.log("error ocurred",error);
	    	response.send({
	      	"code":400,
					"failed":"error ocurred"
    		})
			}

			else {
    	console.log('The solution is: ', results);
    		response.send({
      	"code":200,
      	"success":"user registered sucessfully"
        });
  		}
  	});
});

//login abgleichen

app.post("/loginuser", function(request, response) {

  var username = request.body.username;
  var password = request.body.password;

  connection.query('SELECT password FROM author WHERE username = ?',username, function (error, results, fields) {

      if (error) {
    // console.log("error ocurred",error);
    response.send({
      "code":400,
      "failed":"error ocurred"
    })
  }

  else {

     console.log('The solution is: ', results);
     console.log(password);

    if(results.length > 0){

        console.log(results[0].password);
        console.log(password);


        // Hier Session erstellen, da Nutzer eingeloggt wird

        var sess = request.session;

        sess.email = username;

        console.log("Session wird angelegt:");
        console.log(sess);

        app.use(session({
            secret: 'ssshhhhh',
           // name: cookie_name,
           // store: sessionStore,
            proxy: true,
            resave: true,
            saveUninitialized: true

        }));
       // app.use(bodyParser.json());
       // app.use(bodyParser.urlencoded({extended: true}));

        app.get('/',function(request,response){
            sess = request.session;

        //Session set when user Request our app via URL
            if(sess.email) {
                /*
                * This line check Session existence.
                * If it existed will do some action.
                */
                res.redirect('/admin');
            }
            else {
                res.render('index.html');
            }
        });



        app.post('/login',function(request,response){
            sess = request.session;

            //In this we are assigning email to sess.email variable.
            //email comes from HTML page.

            sess.email=request.body.email;
            response.end('done');
        });



        app.get('/admin',function(request,response){
            sess = request.session;
            if(sess.email) {
                response.write('<h1>Hello '+sess.email+'</h1>');
                response.end('<a href="+">Logout</a>');
            } else {
                response.write('<h1>Please login first.</h1>');
                response.end('<a href="+">Login</a>');
            }
        });

        app.get('/logout',function(request,response){
            request.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    response.redirect('/');
                }
            });

        });





      // Passwortüberprüfung

      if(results[0].password === password){

          response.sendFile('C:/users/elisabeth/Refugee_Scout_2018/myprofile.html');

}

      else{
        response.send({
          "code":204,
          "success":"Email and password does not match"

        });
      }
    }

    else{
      response.send({
        "code":204,
        "success":"Email does not exits"
      });
    }
  }
  });
});


//Start the server and make it listen for connections on port 8080

app.listen(8080);
