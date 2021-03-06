"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var Comment = require(process.cwd() + "/dbmodels/comment.js"); Comment = mongoose.model("Comment");
var User = require(process.cwd() + "/dbmodels/user.js"); User = mongoose.model("User");
var sanitizeBody = require("./helpers/sanitizeBody");
const perPage = 20;
const perPageComments = 100;

module.exports = function(app) {

app.post("/allPostings", sanitizeBody, function(req, res){ // retrieve the most recent questions, paginated
    let page = Number(req.body.page) -1;
    let postings = [];
    let postingStream = Posting.find().skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream(); //less than or equal to in mongodb query
    postingStream.on("data", function(doc){
            if(doc.userID && req.session.sessionID && (doc.userID == req.session.sessionID)){
                doc.editable = true;
                postings.push(doc);
            }
            else{
            postings.push(doc);
            }
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.post("/categoryPostings", sanitizeBody, function(req, res){ //retrieve the most recent questions in a certain category, paginated
    let postings = [];
    let postCategory = req.body.category;
    let page = Number(req.body.page) - 1;
    let postingStream = Posting.find({"category": postCategory})
    .skip(perPage * page).sort({"timePosted": -1}).limit(perPage).stream();
    postingStream.on("data", function(doc){
             if(doc.userID && req.session.sessionID && (doc.userID == req.session.sessionID)){
                doc["editable"] = true;
                postings.push(doc);
            }
            else{
            postings.push(doc);
            }
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.post("/searchPostings", sanitizeBody, function(req, res){ //retrieve the most relevant questions to a user search query, paginated
    let postings = [];
    let searchQuery = req.body.searchQuery;
    let page = req.body.page - 1;
    var postingStream = Posting.find({$text: {$search: searchQuery}}, {score: {$meta: "textScore"}})
    .sort({score: {$meta: "textScore"}, "timePosted": -1}).skip(perPage * page)
    .limit(perPage).stream();
    postingStream.on("data", function(doc){
             if(doc.userID && req.session.sessionID && (doc.userID == req.session.sessionID)){
                doc["editable"] = true;
                postings.push(doc);
            }
            else{
                postings.push(doc);
            }
    });
    postingStream.on("end", function(){
         res.json({"postings": postings});
    });
});
app.post("/myPostings", sanitizeBody, function(req, res){
  let postings = [];  
  let page = req.body.page - 1;
  let postingStream = Posting.find({"userID": ObjectId(req.session.sessionID)}).sort({"timePosted": -1}).skip(perPage * page).limit(perPage).stream();
  postingStream.on("data", function(doc){
            doc["editable"] = true;
            postings.push(doc);
    });
    postingStream.on("end", function(){
      res.json({"postings": postings});    
    });
});
app.post("/questionData", sanitizeBody, function(req, res){ // retrieve a question and its comments
  let postID = ObjectId(req.body.id);
  var postingStream = Posting.findOne({_id: postID}, {comments: 0}).stream();
  postingStream.on("data", function(doc){
             if(doc.userID && req.session.sessionID && (doc.userID == req.session.sessionID)){
                doc["editable"] = true;
                res.json({"postData": doc});
            }
            else{
                res.json({"postData": doc}); 
            }
  });
});
app.post("/favoritePostings", sanitizeBody, function(req, res){ //retrieve list of user favorites
let favesArray = [];
let numTraversed = 0;
    User.findOne({"_id": req.session.sessionID}, function(err, usr){
        if(err || !usr){
            res.json({"error": err});
        }
        else{
        if(usr.favorites){
        for(let i = 0; i < usr.favorites.length; i++){
            Posting.findOne({"_id": usr.favorites[i]}, function(err, doc){
                numTraversed++;
                if(doc){
                 favesArray.push(doc);
                }
                if(numTraversed >= usr.favorites.length || favesArray.length === 100){
                     res.json({"postings": favesArray});
                 }
            });
        }
        }
        else{
            res.json({"postings": []});
        }
        }
    });
});
app.post("/testIfFavorite", sanitizeBody, function(req, res){
    User.findOne({"_id": req.session.sessionID}, function(err, usr){
        if(err || !usr){
            res.json({"isFavorite": false});
        }
        else{
            if(usr.favorites.indexOf(req.body.postID) > -1){
                res.json({"isFavorite": true});
            }
            else{
                res.json({"isFavorite": false});
            }
        }
    });
});
app.post("/comments", sanitizeBody, function(req, res){ // retrieve a post's comments
  let commentData = [];
  let page = req.body.page - 1;
  var commentStream = Comment.find({postID: req.body.id}).sort({timePosted: -1}).skip(page*perPageComments).limit(perPageComments).stream();
  commentStream.on("data", function(doc){
          if(doc.userID == req.session.sessionID){
              doc["editable"] = true;
              commentData.push(doc);
          }
          else{
              commentData.push(doc);
          }
  });
  commentStream.on("end", function(){
      res.json({"commentData": commentData});
  });
});
}