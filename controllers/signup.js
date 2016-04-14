module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var mongoose = require('mongoose');
    var User = require("../dbmodels/user.js"); User = mongoose.model("User");

app.post('/signup', function(req, res){ //submit new account info
	if(req.session.sessionID){
		res.json({"error": "You are already logged in! Sign out before making a new account."});
	}
else{
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password.trim().substr(0, 200);
  var hashedPassword = bcrypt.hashSync(password, 10);
  var emailRegex = /@/;
  
  if(username && email && password && username.length > 0 && email.match(emailRegex) && password.length > 6 && email.length > 3){
      
   var newUser = new User({"username": username.trim().substr(0, 100), "email": email.trim().substr(0, 150), "password": hashedPassword}); 
   newUser.save(function(err, message){
   	if(!err)
   	{
        res.json({"success": "New account created!"});
   	}
   	else{
   		res.json({"error": err});
   	}
   });

  }
  else{
  	res.json({"error": "Error: invalid information. Enter a valid email, a unique name, and a password longer than 6 characters."});
  }
}
});
}