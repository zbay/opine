var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Comment = require(process.cwd() + "/dbmodels/comment.js"); Comment = mongoose.model("Comment");
var sanitizeBody = require("./helpers/sanitizeBody");
var requireLogin = require("./helpers/requireLogin");

module.exports = function(app) {
    
    app.post("/deletePosting", requireLogin, sanitizeBody, function(req, res){
    if(req.body.id){
           Posting.findByIdAndRemove(req.body.id, function(err, doc){
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
            Comment.findById(req.body.commentID, function(err, doc){
            if(doc && !err){
              if(doc.childComments.length > 0){
                  Comment.findOneAndUpdate({_id: req.body.commentID}, {$set: {text: "[Deleted]", userID: null, editable: false}}, function(erra, doca){
                      if(!erra){
                          res.json({"success": doca});
                      }
                  });
              }
              else{
               Comment.findByIdAndRemove(req.body.commentID, function(errb, msg){
               if(err){
                   console.log("error" + errb);
                   res.json({"error": errb});
               }
               else{
                   if(doc.isChild){
                     Comment.findOneAndUpdate({_id: req.body.parentID}, {$pull: {childComments: req.body.commentID}}, function(errc, docc){
                         if(!errc){
                          res.json({"success": docc});   
                         }
                         else{
                             res.json({"error": errc});
                         }
                     });       
                   }
                   else{
                    console.log("doc: " + msg);
                     res.json({"success": msg});   
                   }
               }
            }); 
              }
            }   
            else{
                
            }
            });
        }
    });
}