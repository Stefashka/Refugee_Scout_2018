//Import the necessary libraries/declare the necessary objects
/** Variable für das laden von Express */
var express = require("express");

var session = require('express-session')

/** Variable für das Laden von Bodyparser */
var myParser = require("body-parser");
/** Variable für ??? */
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

app.use(session({secret: 'ssshhhhh'}));

var sess;
app.get('/',function(req,res){
    sess=req.session;

    sess.email;
    sess.username;

});

// const express = require('express');
const fileUpload = require('express-fileupload');
// const app = express();

//TEst Bildupload

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
// Ende Test Bildupload




//TESTTTTT!!!++

/*

//var express = require('express');
//var session = require('express-session');
//var bodyParser = require('body-parser');
//var app = express();

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.get('/',function(req,res){
    sess = req.session;
//Session set when user Request our app via URL
    if(sess.email) {
        /*
        * This line check Session existence.
        * If it existed will do some action.
        */
/*        res.redirect('/admin');
    }
    else {
        res.render('index.html');
    }
});

app.post('/login',function(req,res){
    sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
    sess.email=req.body.email;
    res.end('done');
});

app.get('/admin',function(req,res){
    sess = req.session;
    if(sess.email) {
        res.write('
            <h1>Hello '+sess.email+'</h1>
        ');
        res.end('<a href="+">Logout</a>');
    } else {
        res.write('
            <h1>Please login first.</h1>
        ');
        res.end('<a href="+">Login</a>');
    }
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

});
app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});

*/
//ENDE TEST!!!!






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
//oder exports.register = function(req,res){ ??
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
		//oder console.log("req",req.body);
	  // var today = new Date();


	  var users= {
	    "username":request.body.username,
	    "email":request.body.email,
	    "password":request.body.password,
	   // "created":today,
	   // "modified":today
	  } //Strichpunkt?

	  connection.query('INSERT INTO author SET ?',users, function (error, results, fields) { //wo ist fields?
	  	if (error) {
	    	console.log("error ocurred",error);
	    	response.send({
	      	"code":400,
					"failed":"error ocurred"
    		}) //Strichpunkt?
			} //Strichpunkt?
			else {
    	console.log('The solution is: ', results);
    		response.send({
      	"code":200,
      	"success":"user registered sucessfully"
                //window.location='newUrl.html';
                //oder window.location.href="";
                //oder res.redirect ('/userpage');
        });
  		} //Strichpunkt?
  	}); //Zu was gehört die normale Klammerzu?
});

//login abgleichen

app.post("/loginuser", function(request, response) {
// oder exports.login = function(req,res){ ??

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

         // HIER BESTEHT UNKLARHEIT WARUM DIE PASSWÖRTER  NICHT ÜBEREINSTIMMEN!!!

        console.log(results[0].password);
        console.log(password);


      if(results[0].password === password){

          response.sendFile('C:/users/elisabeth/Refugee_Scout_2018/myprofile.html');


       // response.send({
       //   "code":200,
       //   "success":"login sucessfull"

           // window.location='C:/Medienprojekt/refugee_authoring_tool/myprofile.html';

           // response.redirect('C:/Medienprojekt/refugee_authoring_tool/myprofile.html')

           // function Weiterleitung()
           // {
           //     location.href="C:/Medienprojekt/refugee_authoring_tool/myprofile.html"
           // }
           // window.setTimeout("Weiterleitung()",1000)

       // });
      }

      else{
        response.send({
          "code":204,
          "success":"Email and password does not match"

            // HIER BESTEHT UNKLARHEIT DARÜBER WIE WIR AUF EINE ANDERE HTML SEITE ÜBERLEITEN!!!
            //

            // response.redirect('C:/Medienprojekt/refugee_authoring_tool/myprofile.html')

            //  location = "C:/Medienprojekt/refugee_authoring_tool/myprofile.html";

          //function Weiterleitung()
          //{
          //    location.href="C:/Medienprojekt/refugee_authoring_tool/myprofile.html"
          //}
          //window.setTimeout("Weiterleitung()",1000)
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


// dem Entsprechend
// Auf richtige HTML Seite mit richtigem, eingeloggtem USer verbinden
// Oder Fehler anzeigen



//Start the server and make it listen for connections on port 8080

app.listen(8080);
