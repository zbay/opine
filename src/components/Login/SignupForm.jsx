var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

var SignupForm = React.createClass({
    getInitialState: function(){
      return {
          email: null,
          password: null,
          confirmPassword: null,
          username: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    render: function(){
        return (<div className="container">
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <form id="signupForm" onSubmit={this.signup}>
        <div id="loginNotice">Have an account?&nbsp;
        <Link to="login">Log in here.</Link>
        </div>
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Username (unique):</label><br />
        <input name="username" value={this.state.username} onChange={this.onChange}/><br /><br />
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <label>Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <label>Confirm Password:</label><br />
        <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange}/><br /><br />
        <button type="submit">Sign Up</button>
        </form>
        </div></div></div>);
    },
    signup: function(e){
         e.preventDefault();
         let that = this;
         if(that.state.password === that.state.confirmPassword){
         if(that.state.email && that.state.password && that.state.confirmPassword && that.state.username){
            let signupData = {
             email: that.state.email,
             password: that.state.password,
             username: that.state.username
         };   
         axios.post("/signup", signupData).then(function(response){
             // set state with redux
              if(!response.data.error){
                  BrowserHistory.push("/login/signedUp");
              }
              else{
                  that.setState({"errorMessage": JSON.stringify(response.data.error)});
              }
         });
         }
         else{ // if email, passwords, and name are not all filled out
             that.setState({"errorMessage": "Please fill out your username, email, and a password!"});
         }
         }
         else{ //if password !== confirmPassword
             that.setState({"errorMessage": "Your passwords do not match! Try again."});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = SignupForm;