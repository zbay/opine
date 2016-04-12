module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var mongoose = require('mongoose');
    var sanitizeBody = require("./helpers/sanitizeBody");
    var User = require("../dbmodels/user.js"); User = mongoose.model("User");
    var PasswordReset = require("../dbmodels/passwordReset.js"); PasswordReset = mongoose.model("PasswordReset");
    var nodemailer = require('nodemailer');
    //var transporter = nodemailer.createTransport('smtps://usgmail.com:pass@smtp.gmail.com');
    
app.post('/login', sanitizeBody, function(req, res){ //submit new account info
	if(req.body.loggedIn && req.session.sessionID){
		res.json({"error": "You are already logged in!"});
	}
else{
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({"email": email}, function(err, doc){
  	if(!err && doc != null){
  		var hashedPassword = doc.password;
  		if(bcrypt.compareSync(password, hashedPassword)){
  		      req.session.sessionID = doc._id;
            res.json({"userID": doc._id});
  		}
  		else{
            res.json({"error": "Wrong password!"});
    }
  	}
    else{
    	res.json({"error": "Error: that email is not registered with an account. Try again."});
    }
  });
}
});

app.post('/logout', sanitizeBody, function(req, res){
  req.session.reset();
  res.json({success: "Logged out!"});
});

app.post('/requestReset', sanitizeBody, function(req, res){
  User.findOne({email: req.body.email}, function(err, doc){
    if(doc && !err){
      var NewPasswordReset = new PasswordReset({email: req.body.email});
      NewPasswordReset.save(function(err, msg){
        
        res.json({success: "Check your email. We sent you a link to reset your password."});
      }); 
    }
    else{
      res.json({error: "That email is not in our system!"});
    }
  });
});

app.post('/resetPassword', sanitizeBody, function(req, res){
  User.update({email: req.body.email}, {$set: {password: bcrypt.hashSync(req.body.password, 10)}}, function(err, msg){
    if(err){
      res.json({error: err});
    }
    else{
      res.json({success: msg});
    }
  });
});
}