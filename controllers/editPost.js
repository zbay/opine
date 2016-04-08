var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");

var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app) {
    
    app.post("/editPosting", sanitizeBody, function(req, res){
    if(!req.body.question || !req.body.asker || !req.body.howToContact || !req.body.deadline || !req.body.category){
        res.json({"error": "Please fill out the entire form."});
    }
    else{
        if(req.body.email){
            Posting.update({_id: req.body.id}, {$set: {question: req.body.question, asker: req.body.asker, howToContact: req.body.howToContact, 
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
app.post("/addFavorite", sanitizeBody, function(req, res){
    console.log("ID: " + req.body.postID);
    console.log("email: " + req.body.email);
    User.findOneAndUpdate({"email": req.body.email}, {$addToSet: {"favorites": req.body.postID}}, function(err, msg){
        if(err){
            res.json({"error": err});
        }
        else{
            res.json({"success": msg});
        }
    });
});
}