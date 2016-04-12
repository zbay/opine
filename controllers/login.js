module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var mongoose = require('mongoose');
    var sanitizeBody = require("./helpers/sanitizeBody");
    var User = require("../dbmodels/user.js"); User = mongoose.model("User");

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
}