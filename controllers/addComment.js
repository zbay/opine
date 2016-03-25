var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");

module.exports = function(app) {
    
    app.post("/addComment", function(req, res){
        var newComment = {"text": req.body.commentText};
    if(!newComment.text){
        res.json({"error": "Please submit a comment."});
    }
    else{
       var commentStream = Posting.update({_id: req.body.postID}, {$addToSet: {comments: newComment}}).stream();
       commentStream.on("end", function(){
           res.json({"success": "Comment successfully posted!"});
       });
    }
});
}