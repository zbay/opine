module.exports = function(app) {
    var bcrypt = require("bcrypt");
    var util = require("util");
    var mongoose = require('mongoose');
    var Reset = require("../dbmodels/reset.js"); Reset = mongoose.model("Reset");
    var User = require("../dbmodels/user.js"); User = mongoose.model("User");
    var randomID = require("./helpers/idGenerator");
    var emailjs = require("emailjs/email");
    var sanitizeBody = require('./helpers/sanitizeBody');
    var dotenv = require('dotenv');
    var emailServer  = emailjs.server.connect({
        user: process.env.RESET_EMAIL, 
        password: process.env.RESET_EMAIL_PASSWORD, 
        host:    "smtp.gmail.com", 
        ssl:     true
    });

app.post('/requestPasswordReset', sanitizeBody, function(req, res){
            var newResetID = randomID();
            User.findOne({email: req.body.email}, function(error, user){
            if(error || !user){
                res.json({"error": "No account could be found with that email address."});
            }
            else{
            var NewReset = new Reset({resetID: newResetID, email: req.body.email});
            NewReset.save(function(errCreate, msgCreate){
                if(errCreate){
                    res.json({"error": errCreate});
                }
                else{
                var message = {
                    text: "Hi, valued Opine user. Apparently, you've asked to reset the password for your account! Your username is: " + user.username + ". Please visit the following link, within 6 hours of this email being sent, to save a new password: " + process.env.ROOT_URL + "reset/" + newResetID, 
                    from: "Opine " + process.env.RESET_EMAIL, 
                    to: req.body.email,
                    subject: "Opine Password Change Request",
                    attachment: 
                    [
                        {data:"<html>Hi, valued Opine user. Apparently, you've asked to reset the password for your account! Your username is: " + user.username + ". Please visit <a href='" + process.env.ROOT_URL + "change_password_forgot/" + newResetID + "'>this link</a>, within 6 hours of this email being sent, to save a new password.</html>", alternative:true},
                    ]
                };
                emailServer.send(message, function(err, msg){  
                    if(err){
                        res.json({"error": "Password change request failed. Try again in a few minutes."});
                    }
                    else{
                      res.json({"success": "Your password change request has been processed! Check your email soon; the request will expire in 6 hours."});    
                    }
                });
                }
            }); 
            }
            });
});
app.post('/checkValidReset', sanitizeBody, function(req, res){ //make sure the request is a valid one (is currently in the database)
    Reset.findOne({resetID: req.body.resetID}, function(err, doc){
        console.log("err: " + err);
        if(doc && !err){
            res.json({"success": "That's a valid password reset ID."});
        }
        else{
            res.json({"error": "That's not a valid password reset ID."});
        }
    });
});

app.post('/newPasswordForgot', sanitizeBody, function(req, res){
  Reset.find({resetID: req.body.resetID}, function(err, doc){
    if(doc && !err){
    User.findOneAndUpdate({email: req.body.email}, {password: bcrypt.hashSync(req.body.password, 10)}, function(error, user){
    if(user && !error){
      Reset.remove({resetID: req.body.resetID}, function(){
          res.json({"success": "Your password was successfully changed! You can now log in."}); 
      });
    }
  }); 
    }
    else{
      res.json({"error": "Reset ID could not be found. Redirecting."});
    }
  });
});
}