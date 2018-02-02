var mongoose = require("mongoose");

var storySchema = new mongoose.Schema({
   name: String,
  // image: String,
   description: String,
   createdAt: { type: Date, default: Date.now },
   
   image1: String,
    desc1: String,

   image2: String,
    desc2: String,

   image3: String,
    desc3: String,

   image4: String,
    desc4: String,

   image5: String,
    desc5: String,

   image6: String,
    desc6: String,

   image7: String,
    desc7: String,

   image8: String,
    desc8: String,

   image9: String,
    desc9: String,

   image10: String,
    desc10: String,

   image11: String,
    desc11: String,

   image12: String,
    desc12: String,

   image13: String,
    desc13: String,

   image14: String,
    desc14: String,

   image15: String,
    desc15: String,

   image16: String,
    desc16: String,

   image17: String,
    desc17: String,

   image18: String,
    desc18: String,

   image19: String,
    desc19: String,

   image20: String,
    desc20: String,

   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   
   
   
   
   images: String, 
     
   
});

module.exports = mongoose.model("Story", storySchema);