var express = require("express");
var router  = express.Router();
var Story = require("../models/story");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var formidable = require('formidable');
var http = require('http');
var Image = require("../models/Image");


const fs = require('fs');


var multer = require('multer');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

var bildpfad = "start";
var wa_bildpfad = "wa_start";

var geschichtenname = "gesch";


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(req.params.id);

        console.log(geschichtenname);

        callback(null, "./public/WebApp/images/" + geschichtenname);
    },
    filename: function (req, file, callback) {
       // callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
       // callback(null, Story.findById(req.params.id)._id + "_" + Story.findById(req.params.id).name);
       // console.log(Story.findById(req.params.id)._id);
        console.log(file.originalname);
        callback(null, file.originalname);
        bildpfad = ("/WebApp/images/" + geschichtenname + "/" + file.originalname);
        wa_bildpfad = (geschichtenname + "/" + file.originalname);
        console.log(bildpfad);
        console.log(wa_bildpfad);

    }
});

function create()
{
    var myObject, newfolder;
}

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
//var upload = multer().single('avatar');

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all stories
router.get("/", function(req, res){
  if(req.query.search && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all stories from DB
      story.find({name: regex}, function(err, allStories){
         if(err){
            console.log(err);
         } else {
            res.status(200).json(allStories);
         }
      });
  } else {
      // Get all stories from DB
      Story.find({}, function(err, allStories){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allStories);
            } else {
              res.render("stories/myprofile",{stories: allStories, page: 'stories'});
            }
         }
      });
  }
});

//CREATE - add new story to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to stories array
  var name = req.body.name;

  var image = req.body.image;


  var desc = req.body.description;


  var author = {
      id: req.user._id,
      username: req.user.username
  }


    var newStory = {name: name, image: image, description: desc, author:author,};

    // Create a new story and save to DB
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to stories page
            console.log(newlyCreated);

            var dir = "./public/WebApp/images/" + name ;

            fs.mkdirSync(dir);

            console.log(newStory);

            console.log(newlyCreated);

            res.redirect("/stories/" + newlyCreated._id);
        }
    });

});

//NEW - show form to create new story
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("stories/new");
});

// SHOW - shows more info about one story
router.get("/:id", function(req, res){
    //find the story with provided ID
    Story.findById(req.params.id).populate("comments").exec(function(err, foundStory){
        if(err){
          console.log(err);
        } else {
          console.log(foundStory)
          //render show template with that story
          res.render("stories/show", {story: foundStory});
        }
    });
});

router.get("/:id/edit", middleware.checkUserStory, function(req, res){
    //find the story with provided ID
    Story.findById(req.params.id, function(err, foundStory){
        if(err){
            console.log(err);
			console.log(req.params.id);
        } else {
            //render show template with that story
			console.log(req.params.id);
            res.render("stories/edit", {story: foundStory});
        }
    });
});

router.put("/:id", function(req, res){

    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, };

    Story.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, story){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/stories/" + story._id);
        }
    });

});

router.delete("/:id", function(req, res) {
  Story.findByIdAndRemove(req.params.id, function(err, story) {
    Comment.remove({
      _id: {
        $in: story.comments
      }
    }, function(err, comments) {
      req.flash('error', story.name + ' deleted!');
      res.redirect('/stories');
    })
  });
});

//TEst Bildupload

//CREATE - add new image to DB
router.post("/:id/api/Upload", middleware.checkUserStory, function(req, res){

    console.log(req.params.id);

    Story.findById(req.params.id, function(err, foundStory){
        if(err){
            console.log(err);
            console.log(req.params.id);
        } else {
            //render show template with that story
            console.log("FoundStory:");
            console.log(foundStory);
            geschichtenname = foundStory.name;

            upload(req, res, function (err) {
                if (err) {
                    return res.end("Something went wrong!");
                }
                console.log(bildpfad);

                // get data from form and add to stories array
                var image = bildpfad;
                var wa_image = wa_bildpfad;
                console.log(image);
                var desc = req.body.description;
                var nummer = req.body.picture_nr;
                console.log(desc);

                var story = {
                    id: req.params.id,
                };

                console.log(req.params.id);
                console.log(bildpfad);


                var newImage = {pfad: image, description: desc, story:story ,picturenum: nummer};

                // Create a new story and save to DB
                Image.create(newImage, function(err, newlyCreated){

                    if(err){
                        console.log(err);
                    } else {
                        //redirect back to stories page
                        console.log(newlyCreated);

                        //bild in story eintragen

                        var imagenummer = "image" + nummer;
                        var wa_imagenummer = "wa_image" + nummer;
                        var descnummer = "desc" + nummer;

                        console.log(imagenummer);
                        console.log("image" + nummer);

                        var newData = {images: newlyCreated.id};
                        newData[imagenummer]= image;
                        newData[wa_imagenummer]= wa_image;
                        newData[descnummer]= desc;

                        Story.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, story){
                            if(err){
                                req.flash("error", err.message);




                                res.redirect("back");
                            } else {

                                Story.findById(req.params.id, function(err, foundStory){
                                    if(err){
                                        console.log(err);
                                        console.log(req.params.id);
                                    } else {
                                        //render show template with that story
                                        console.log(req.params.id);

                                        console.log(foundStory);

                                        var jsondatei = {

                                            "author": {
                                                "ID":foundStory.author.id,
                                                "nickname":foundStory.author.username,
                                                "e-mail":"" //Problem: Wie kommen wir an die Verknüpften Objekte
                                            }};

                                        for(var i = 0 ; i<20; i++) {

                                            jsondatei["storypart" + (i+1)] = {
                                                "URL": foundStory["wa_image" + (i + 1)],
                                                "description": foundStory["desc" + (i + 1)],
                                                "position": "bottom",
                                                "type": ""
                                            };

                                        }

                                        console.log(jsondatei)

                                        var data = JSON.stringify(jsondatei);
                                        fs.writeFileSync("./public/WebApp/json/"+ foundStory.id + ".json",data);

                                    }
                                });

                            }
                        });
                        res.redirect("/stories/" + foundStory._id);
                        console.log(bildpfad);
                    }

                });

            });









        }
    });


  //
  //  geschichtenname = foundStory.name;
  //  console.log(geschichtenname);



});


module.exports = router;

