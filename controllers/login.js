module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var mongoose = require('mongoose');
    var sanitizeBody = require("./helpers/sanitizeBody");
    var User = require("../dbmodels/user.js"); User = mongoose.model("User");
    var requireLogin = require("./helpers/requireLogin");
    var bcrypt = require("bcrypt");

app.post('/login', sanitizeBody, function(req, res){ //submit new account info
	if(req.body.loggedIn && req.session.sessionID){
		res.json({"error": "You are already logged in!"});
	}
else{
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({"username": username}, function(err, doc){
  	if(!err && doc != null){
  		var hashedPassword = doc.password;
  		if(bcrypt.compareSync(password, hashedPassword)){
  		      req.session.sessionID = doc._id;
            res.json({"userID": doc._id});
  		}
  		else{
            res.json({"error": "Wrong username or password!"});
    }
  	}
    else{
    	res.json({"error": "Error: that username is not registered with an account. Try again."});
    }
  });
}
});

app.post('/logout', sanitizeBody, function(req, res){
  req.session.reset();
  res.json({success: "Logged out!"});
});

app.post('/newPassword', requireLogin, sanitizeBody, function(req, res){
  User.findOne({username: req.body.username}, function(err, doc){
    if(doc && !err){
      if(bcrypt.compareSync(req.body.oldPassword, doc.password)){
       User.findOneAndUpdate({username: req.body.username}, {$set: {password: bcrypt.hashSync(req.body.newPassword, 10)}}, function(error, msg){
         if(msg && !error){
           res.json({success: "Password successfully changed!"});   
         }
         else{
           res.json({error: error});
         }
       }); 
      }
    else{
      res.json({error: "Wrong username or password! Try again."});
    }
    }
    else{
      res.json({error: err});
    }
  });
});

app.post('/testLoggedIn', function(req, res){ //check if there is a session in progress
  if(req.session.sessionID){
    res.json({"loggedIn": true});
  }
  else{
    res.json({"loggedIn": false});
  }
});
}