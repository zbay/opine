var mongoose = require('mongoose');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");

module.exports = function(app) {

app.get("/allPostings", function(req, res){
  console.log("postings accessed");
    var postings = [];
    var postingStream = Posting.find().sort({"timePosted": -1}).limit(50).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/category/:category", function(req, res){
  console.log("category postings accessed");
    var postings = [];
    var postCategory = this.params.category;
    var postingStream = Posting.find({"category": postCategory}).sort({"timePosted": -1}).limit(50).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.get("/search/:searchQuery", function(req, res){
  console.log("category postings accessed");
    var postings = [];
    var searchQuery = this.params.searchQuery;
    //figure out how to best do searches in mongo
    /*
    var postingStream = Posting.find({"categories": searchQuery}).sort({"timePosted": -1}).limit(50).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });*/
});
}