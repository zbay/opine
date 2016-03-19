var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");

module.exports = function(app) {
    app.post("/addPosting", function(req, res){
    if(!req.body.question || !req.body.asker || !req.body.contact || !req.body.deadline || !req.body.category){
        res.json({"error": "Please fill out the entire form."});
    }
    var newPost = new Posting({"question": req.body.question, "asker": req.body.asker, "howToContact": req.body.contact, "deadline": req.body.deadline, "category": req.body.category});
    newPost.save(function(err, msg){
          res.json({"success": msg}); 
    });
});
}