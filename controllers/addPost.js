var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Banning = require(process.cwd() + "/dbmodels/banning.js"); Banning = mongoose.model("Banning");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app) {
    
    app.post("/addPosting", sanitizeBody, function(req, res){
    if(!req.body.question || !req.body.asker || !req.body.contact || !req.body.deadline || !req.body.category){
        res.json({"error": "Please fill out the entire form."});
    }
    else{
    Banning.findOne({"IP": req.body.IP}, function(err, doc){ 
        if(doc === null || req.session.sessionID){ // prevent posting if the user is not logged in and the IP address is banned
            var newPost = new Posting({"question": req.body.question.trim().substr(0, 1000), "asker": req.body.asker.trim().substr(0, 500),
            "howToContact": req.body.contact.trim().substr(0, 500),
            "deadline": new Date(req.body.deadline) + 43200, "category": req.body.category, "IP": req.body.IP, "userID": req.session.sessionID});
            newPost.save(function(err, msg){
                if(err){
                    res.json({"error": msg});
                }
                else{
                  res.json({"success": msg._id});    //supplies the new post's ID, to offer the post's URL to the user after it is made
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