"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var sanitizeBody = require("./helpers/sanitizeBody");
const perPage = 20;

module.exports = function(app) {


app.get("/allPostings/:page", sanitizeBody, function(req, res){
    let page = Number(req.params.page) -1;
    let postings = [];
    let postingStream = Posting.find().skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream(); //less than or equal to in mongodb query
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/categoryPostings/:category/:page", sanitizeBody, function(req, res){
    let postings = [];
    let postCategory = req.params.category;
    let page = Number(req.params.page) - 1;
    let postingStream = Posting.find({"category": postCategory})
    .skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/searchPostings/:searchQuery/:page", sanitizeBody, function(req, res){
    let postings = [];
    let searchQuery = req.params.searchQuery;
    let page = req.params.page - 1;
    var postingStream = Posting.find({$text: {$search: searchQuery}}, {score: {$meta: "textScore"}})
    .sort({score: {$meta: "textScore"}, "timePosted": -1}).skip(perPage * page)
    .limit(perPage).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/questionData/:id", sanitizeBody, function(req, res){ //get a question and it's comments
  let postID = ObjectId(req.params.id);
  var postingStream = Posting.findOne({_id: postID}, {comments: 0}).stream();
  postingStream.on("data", function(doc){
     res.json({"postData": doc});
  });
});
app.post("/favoritePostings", sanitizeBody, function(req, res){
    let postings = [];
    let iterateCount = 0;
    let favorites = req.body.favorites;
    for(let i = favorites.length-1; i >= 0; i--){
        Posting.findOne({_id: ObjectId(favorites[i])}, function(err, question){
             if(err){
                res.json({error: err});
            }
            else{
                if(question !== null){
                 postings.push(question);   
                }
                iterateCount++;
                if(iterateCount == req.body.favorites.length){
                    res.json({"postings": postings});
                }
            }           
        });
    }
});
app.get("/comments/:id", sanitizeBody, function(req, res){ //get a post's comments, on refresh only
  let postID = ObjectId(req.params.id);
  var postingStream = Posting.findOne({_id: postID}).stream();
  postingStream.on("data", function(doc){
     res.json({"postData": doc.comments});
  });
});
}