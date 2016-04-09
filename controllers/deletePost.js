var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app) {
    
    app.post("/deletePosting", sanitizeBody, function(req, res){
    if(req.body.id){
           Posting.remove({_id: req.body.id}, function(err, doc){
               if(err){
                   res.json({"error": err});
               }
               else{
                   res.json({"success": doc});
               }
           });
    }
});
    app.post("/deleteComment", sanitizeBody, function(req, res){
        //console.log("commentID: "+ req.body.commentID);
        if(req.body.postID && req.body.commentID){
            Posting.findOneAndUpdate({_id: req.body.postID}, {$pull: {comments: {_id: req.body.commentID}}}, function(err, doc){
               if(err){
                   console.log("err" + err);
                   res.json({"error": err});
               }
               else{
                   console.log("doc: " + doc);
                   res.json({"success": doc});
               }
            });
        }
    });
}