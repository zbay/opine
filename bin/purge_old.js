// this script will delete every post more than 24 hours old, once every 24 hours, as configured with Heroku Scheduler
"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Posting = require(process.cwd() + "/dbmodels/posting.js"); Posting = mongoose.model("Posting");
var dailySeconds = 86400;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/opine', function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

var now = Date.now()/1000;
var iterated = 0;

Posting.find({}, function(error, docs){
    if(docs && !err){
    for(let i = 0; i < docs.length; i++){
     let then = (new Date(docs[i].deadline).getTime())/1000;
     if((now - then) > dailySeconds){
        console.log("should delete: " + docs[i]._id);
        Posting.remove({_id: ObjectId(docs[i]._id)}, function(err, msg){
            console.log("err: " + err);
            console.log("msg: " + msg);
            });
        }
        iterated++;
      if(iterated == docs.length-1){
          process.exit();
      }  
    }   
    }
    else{
        console.log("error: " + error);
        process.exit();
    }
});

    /*PostingStream.on("data", function(doc){
        console.log("started streaming");
        var then = (new Date(doc.deadline).getTime())/1000;
        console.log("now - then: " + (now - then));
            if((now - then) > dailySeconds){
                console.log("should delete: " + doc._id);
                Posting.remove({_id: ObjectId(doc._id)}, function(err, msg){
                    console.log("err: " + err);
                    console.log("msg: " + msg);
                });
            }
    });
    PostingStream.on("end", function(){
        console.log("Done checking?");
        process.exit();
    });*/
}
});