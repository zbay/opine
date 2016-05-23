var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Comment = require(process.cwd() + "/dbmodels/comment.js"); Comment = mongoose.model("Comment");
var Banning = require(process.cwd() + "/dbmodels/banning.js"); Banning = mongoose.model("Banning");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app) {
    
    app.post("/addComment", sanitizeBody, function(req, res){
    if(!req.body.commentText || !req.body.questionID){
        res.json({"error": "Please submit a valid comment."});
    }
    else{
       Banning.findOne({"IP": req.body.IP || "dummy"}, function(err, doc){
       if(doc === null || req.body.userID){
          console.log("IP: " + req.body.IP);
       var newComment = new Comment({text: req.body.commentText.trim().substr(0, 1000), author: req.body.author.trim().substr(0, 100),
       IP: req.body.IP, userID: req.session.sessionID, postID: req.body.questionID});
       newComment.save(function(err){
           if(err){
              res.json({"error": err});  
           }
           else{
              res.json({"success": "Comment successfully posted."});
           }    
       });
       }
       else{
           res.json({"error": "You must have been a little naughty. Anonymous posting is currently banned for this IP address. Please log in."});
       }
       });
    }
});
/*app.post("/addChildComment", sanitizeBody, function(req, res){
    if(!req.body.commentText || !req.body.questionID || !req.body.parentID){
        res.json({"error": "Please submit a valid comment."});
    }    
    else{
       Banning.findOne({"IP": req.body.IP}, function(err, doc){
       if(doc === null || req.body.userID){
       var newComment = new Comment({text: req.body.commentText.trim().substr(0, 1000), IP: req.body.IP, userID: req.session.sessionID, postID: req.body.questionID,
           isChild: true
       });
       newComment.save(function(error, newComment){
           if(err){
              res.json({"error": err});  
           }
           else{
              Comment.findOneAndUpdate({_id: req.body.questionID}, {$addToSet: {childComments: newComment._id}}, function(error2, confirmation){
                  if(!error2){
                   res.json({"success": "Comment successfully posted."});   
                  }
              });
           }    
       });
       }
       else{
           res.json({"error": "You must have been a little naughty. Anonymous posting is currently banned for this IP address. Please log in."});
       }
       });
    }
});*/
}
