var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Comment = require(process.cwd() + "/dbmodels/comment.js"); Comment = mongoose.model("Comment");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");

var sanitizeBody = require("./helpers/sanitizeBody");
var requireLogin = require("./helpers/requireLogin");

module.exports = function(app) {
    
    app.post("/editPosting", requireLogin, sanitizeBody, function(req, res){
    if(!req.body.question || !req.body.asker || !req.body.howToContact || !req.body.deadline || !req.body.category){
        res.json({"error": "Please fill out the entire form."});
    }
    else{
        if(req.session.sessionID){
            Posting.update({_id: req.body.id}, {$set: {question: req.body.question.trim().substr(0, 1000), asker: req.body.asker.trim().substr(0, 500),
            howToContact: req.body.howToContact.trim().substr(0, 500), 
            deadline: req.body.deadline, category: req.body.category, timePosted: Date.now()}}, function(err, msg){
                if(err){
                    res.json({"error": msg});
                }
                else{
                  res.json({"success": msg});    
                }   
            });
        }
        else{
            res.json({"error": "You are not signed in. You must be signed in to edit a post."});
        }
    }
});
app.post("/addFavorite", requireLogin, sanitizeBody, function(req, res){
    User.findOneAndUpdate({"_id": req.session.sessionID}, {$addToSet: {"favorites": req.body.postID}}, function(err, msg){
        if(err){
            res.json({"error": err});
        }
        else{
            res.json({"success": msg});
        }
    });
});
app.post("/removeFavorite", requireLogin, sanitizeBody, function(req, res){
    User.findOneAndUpdate({"_id": req.session.sessionID}, {$pull: {"favorites": req.body.postID}}, function(err, msg){
        if(err){
            res.json({"error": err});
        }
        else{
            res.json({"success": msg});
        }
    });    
});
app.post("/editComment", requireLogin, sanitizeBody, function(req, res){
    if(!req.body.text){
        res.json({"error": "Please fill out the comment field"});
    }
    else{
        Comment.findOneAndUpdate({_id: req.body.commentID}, {$set: {"text": req.body.text.trim().substr(0, 1000)}}, function(err, msg){
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