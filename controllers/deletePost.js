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
}