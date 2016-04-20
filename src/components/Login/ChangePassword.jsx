var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

var ChangePassword = React.createClass({
    getInitialState: function(){
      return {
          username: null,
          oldPassword: null,
          newPassword: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    render: function(){
        return (<div><form id="signupForm" onSubmit={this.changePassword}>
        <div className="container"><div className="row"><div className="col-sm-12">
        Here, you can change your password if you know your email and the old password.
        </div></div></div>
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Username:</label><br />
        <input name="username" value={this.state.username} onChange={this.onChange}/><br /><br />
        <label>Old Password:</label><br />
        <input name="oldPassword" type="password" value={this.state.oldPassword} onChange={this.onChange}/><br /><br />
        <label>New Password:</label><br />
        <input name="newPassword" type="password" value={this.state.newPassword} onChange={this.onChange}/><br /><br />
        <button type="submit">Reset Password</button>
        <br />
        <br />
        </form>
        </div>);
    },
    changePassword: function(e){
         e.preventDefault();
         let that = this;
         if(that.state.username && that.state.oldPassword && that.state.newPassword){
            let resetData = {
             email: that.state.username,
             oldPassword: that.state.oldPassword,
             newPassword: that.state.newPassword
         };   
         axios.post("/newPassword", resetData).then(function(response){
             // set state with redux
              if(!response.data.error){
                  BrowserHistory.push("/reset");
              }
              else{
                  that.setState({"errorMessage": response.data.error});
              }
         });
         }
         else{ // if email, passwords, are not all filled out
             that.setState({"errorMessage": "Please fill out your username, old password, and a new password!"});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = ChangePassword;