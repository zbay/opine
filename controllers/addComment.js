var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Banning = require(process.cwd() + "/dbmodels/banning.js"); Banning = mongoose.model("Banning");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app) {
    
    app.post("/addComment", sanitizeBody, function(req, res){
    if(!req.body.commentText || !req.body.questionID){
        res.json({"error": "Please submit a comment."});
    }
    else{
       Banning.findOne({"IP": req.body.IP}, function(err, doc){
       if(doc === null || req.body.userID){
       Posting.update({_id: ObjectId(req.body.questionID)}, {$addToSet: {comments: 
            {text: req.body.commentText, IP: req.body.IP, userID: req.body.userID}}}).lean().exec(function(err, msg){
           if(err){
              res.json({"error": err});  
           }
           else{
              res.json({"success": msg});
           }
       });
       }
       else{
           res.json({"error": "You must have been a little naughty. Posting is currently banned from this IP address."});
       }
       });
    }
});
}