var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
   pfad: String,
   description: String,
   picturenum: String,
    position: String,
   createdAt: { type: Date, default: Date.now },
   story: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "story"
      },
      name: String
   },
});

module.exports = mongoose.model("Image", imageSchema);