module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var mongoose = require('mongoose');
    var User = require("../dbmodels/user.js"); User = mongoose.model("User");

app.post('/signup', function(req, res){ //submit new account info
	if(req.body.loggedIn){
		res.json({"error": "You are already logged in! Sign out before making a new account."});
	}
else{
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = bcrypt.hashSync(password, 10);
  var emailRegex = /@/;
  
  if(name && email && password && name.length > 2 && email.match(emailRegex) && password.length > 6){
   var newUser = new User({"name": name, "email":email, "password": hashedPassword}); 
   newUser.save(function(err, message){
   	if(!err)
   	{
        res.json({"success": message});
   	}
   	else{
   		res.json({"error": "An account already exists with this email address! Use another one."});
   	}
   });

  }
  else{
  	res.json({"error": "Error: invalid information. Enter a valid email, a name longer than 2 characters, and a password longer than 6 characters."});
  }
}
});
}