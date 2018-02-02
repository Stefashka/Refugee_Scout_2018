var express = require("express");
var router  = express.Router({mergeParams: true});
var Story = require("../models/story");
var Image = require("../models/Image");
var middleware = require("../middleware");

//Image New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find story by id
    console.log(req.params.id);
    Story.findById(req.params.id, function(err, story){
        if(err){
            console.log(err);
        } else {
             res.render("image/new", {story: story});
        }
    })
});

//Image Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup story using ID
   Story.findById(req.params.id, function(err, story){
       if(err){
           console.log(err);
           res.redirect("/stories");
       } else {
        Image.create(req.body.image, function(err, image){
           if(err){
               console.log(err);
           } else {
               //add story and id to image
               image.author.id = req.user._id;
               image.author.username = req.user.username;
               //save image
               image.save();
               story.image.push(comment);
               story.save();
               console.log(comment);
               req.flash('success', 'Created a comment!');
               res.redirect('/stories/' + story._id);
           }
        });
       }
   });
});

router.get("/:imageId/edit", middleware.isLoggedIn, function(req, res){
    // find story by id
    Image.findById(req.params.imageId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {story_id: req.params.id, image: image});
        }
    })
});

router.put("/:imageId", function(req, res){
   Image.findByIdAndUpdate(req.params.imageId, req.body.image, function(err, comment){
       if(err){
          console.log(err);
           res.render("edit");
       } else {
           res.redirect("/stories/" + req.params.id);
       }
   }); 
});

router.delete("/:commentId",middleware.checkUserComment, function(req, res){
    Image.findByIdAndRemove(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
            Image.findByIdAndUpdate(req.params.id, {
              $pull: {
                images: image.id
              }
            }, function(err) {
              if(err){ 
                console.log(err)
              } else {
                req.flash('error', 'Image deleted!');
                res.redirect("/stories/" + req.params.id);
              }
            });
        }
    });
});

module.exports = router;