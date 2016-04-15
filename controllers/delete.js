var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Comment = require(process.cwd() + "/dbmodels/comment.js"); Comment = mongoose.model("Comment");
var sanitizeBody = require("./helpers/sanitizeBody");
var requireLogin = require("./helpers/requireLogin");

module.exports = function(app) {
    
    app.post("/deletePosting", requireLogin, sanitizeBody, function(req, res){
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
    app.post("/deleteComment", requireLogin, sanitizeBody, function(req, res){
        if(req.body.commentID){
            Comment.remove({_id: req.body.commentID}, function(err, doc){
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