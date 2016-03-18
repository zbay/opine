var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongo = require('mongodb');
var session = require('client-sessions');
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");

mongoose.connect('mongodb://localhost:27017/opine', function (err, db)
//mongoose.connect(process.env.MONGOLAB_URI, function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

app.use(express.static(path.join(__dirname, 'public')));
var public_dir = './public/';

app.get('/', function(req, res) {
  console.log("home page");
  res.sendfile(public_dir + "/index.html");
});
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
app.post("/addPosting", function(req, res){
    if(!req.body.question || !req.body.asker || !req.body.contact || !req.body.deadline || !req.body.category){
        res.json({"error": "Please fill out the entire form."});
    }
    var newPost = {"question": req.body.question, "asker": req.body.asker, "howToContact": req.body.contact, "deadline": req.body.deadline, "category": req.body.category};
    Posting.insert(newPost, function(err, msg){
        res.json({"success": true});
    });
});

console.log("Listening on Port 8080");
app.listen(8080);
}
});