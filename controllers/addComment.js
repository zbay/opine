var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");

module.exports = function(app) {
    
    app.post("/addComment", function(req, res){
    if(!req.body.commentText || !req.body.questionID){
        res.json({"error": "Please submit a comment."});
    }
    else{
       Posting.update({_id: ObjectId(req.body.questionID)}, {$addToSet: {comments: {text: req.body.commentText}}}).lean().exec(function(err, msg){
           if(err){
              res.json({"error": err});  
           }
           else{
              res.json({"success": msg});
           }
       });
    }
});
}