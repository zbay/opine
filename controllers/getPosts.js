"use strict";
var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
const perPage = 3;

module.exports = function(app) {


app.get("/allPostings/:page", function(req, res){
    let page = Number(req.params.page) -1;
    let postings = [];
    let postingStream = Posting.find({"deadline": {$gte: Date.now()}}).skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream(); //less than or equal to in mongodb query
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
    let postingStream = Posting.find({"category": postCategory, "deadline": {$gte: Date.now()}}).skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream();
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
}