var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Banning = require(process.cwd() + "/dbmodels/banning.js"); Banning = mongoose.model("Banning");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app) {
    
    app.post("/editPosting", sanitizeBody, function(req, res){
    if(!req.body.question || !req.body.asker || !req.body.contact || !req.body.deadline || !req.body.category){
        res.json({"error": "Please fill out the entire form."});
    }
    Banning.findOne({"IP": req.body.IP}, function(err, doc){
        if(doc === null || req.body.loggedIn){
            var newPost = new Posting({"question": req.body.question, "asker": req.body.asker, "howToContact": req.body.contact,
            "deadline": req.body.deadline, "category": req.body.category, "IP": req.body.IP});
            newPost.save(function(err, msg){
                if(err){
                    res.json({"error": msg});
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
});
}