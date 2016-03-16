var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongo = require('mongodb');
var session = require('client-sessions');
var Posting = require("./dbmodels/posting.js");

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
app.get("/postings", function(req, res){
  console.log("postings accessed");
    var postings = [];
    var postingStream = Posting.find({}).limit(50).stream();
    postingStream.on("data", function(doc){
            postings.push(doc);
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});

console.log("Listening on Port 8080");
app.listen(8080);
}
});