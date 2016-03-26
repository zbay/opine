"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
const perPage = 3;
const dailySeconds = 86400;

module.exports = function(app) {


app.get("/allPostings/:page", function(req, res){
    let page = Number(req.params.page) -1;
    let postings = [];
    let postingStream = Posting.find({"deadline": {$gte: (Date.now()/1000) - dailySeconds}}).skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream(); //less than or equal to in mongodb query
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/categoryPostings/:category/:page", function(req, res){
    let postings = [];
    let postCategory = req.params.category;
    let page = Number(req.params.page) - 1;
    let postingStream = Posting.find({"category": postCategory, "deadline": {$gte: (Date.now()/1000) - dailySeconds}})
    .skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/searchPostings/:searchQuery/:page", function(req, res){
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
app.get("/question/:id", function(req, res){ //get a question and it's comments
  let postID = ObjectId(req.params.id);
  var postingStream = Posting.findOne({_id: postID}, {comments: 0}).stream();
  postingStream.on("data", function(doc){
     res.json({"postData": doc});
  });
});
app.post("/favoritePostings", function(req, res){
    let postings = [];
    let page = req.body.page - 1;
    let beginning = perPage*page;
    let ending = (perPage*page) + perPage;
    let favorites = req.body.favorites;
    if(ending >= favorites.length){
        ending = favorites.length-1;
    }
    if(beginning >= favorites.length){
        res.json({"postings": []});
    }
    for(let i = beginning; i < ending; i++){
        Posting.findOne({_id: ObjectId(favorites[i])}).sort({timePosted: -1}).exec(function(err, question){
            if(err){
                res.json({error: err});
            }
            else{
                postings.push(question);   
                if(postings.length == ending-beginning){
                    res.json({"postings": postings});
                }
            }
        });
    }
});
app.get("/comments/:id", function(req, res){ //get a post's comments, on refresh only
  let postID = ObjectId(req.params.id);
  var postingStream = Posting.findOne({_id: postID}).stream();
  postingStream.on("data", function(doc){
     res.json({"postData": doc.comments});
  });
});
}