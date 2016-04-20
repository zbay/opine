var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

var RequestPassword = React.createClass({
    getInitialState: function(){
      return {
          email: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    render: function(){
        return (<div><form id="signupForm" onSubmit={this.requestReset}>
        <div className="container">
        <div className="row">
        <div className="col-sm-12">
        Here, you can request your username and a new password with your email address. This doesn't work if you used a fake email to register with us.
        </div></div></div>
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <button type="submit">Request New Password</button>
        <br />
        <br />
        <br />
        </form>
        </div>);
    },
    requestReset: function(e){
         e.preventDefault();
         let that = this;
         if(that.state.email && that.state.email.length > 2){
         axios.post("/requestPasswordReset", {email: that.state.email}).then(function(response){
             console.log(response.data.error);
              if(!response.data.error){
                 that.setState({"successMessage": "Check your email inbox. We've sent you your username and a link for changing your password.", "email": ""});
              }
              else{
                  that.setState({"errorMessage": response.data.error});
              }
         });
         }
         else{ // if email, passwords, are not all filled out
             that.setState({"errorMessage": "Please fill out an email address!"});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = RequestPassword;