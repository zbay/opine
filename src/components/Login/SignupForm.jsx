var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var ReactRedux = require("react-redux");
var FormAlert = require("../Alerts/FormAlert");

var SignupForm = React.createClass({
    getInitialState: function(){
      return {
          email: null,
          password: null,
          confirmPassword: null,
          name: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    render: function(){
        return (<div><form id="signupForm" onSubmit={this.signup}>
        <div id="loginNotice">Have an account?&nbsp;
        <Link to="login">Log in here.</Link>
        </div>
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Name:</label><br />
        <input name="name" value={this.state.name} onChange={this.onChange}/><br /><br />
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <label>Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <label>Confirm Password:</label><br />
        <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange}/><br /><br />
        <button type="submit">Sign Up</button>
        </form>
        <div id="signupBlurb"><h3>Why register with Opine?</h3>
        </div>
        </div>);
    },
    signup: function(e){
         e.preventDefault();
         let that = this;
         if(!this.props.loggedIn){
         if(that.state.password === that.state.confirmPassword){
         if(that.state.email && that.state.password && that.state.confirmPassword && that.state.name){
            let signupData = {
             email: that.state.email,
             password: that.state.password,
             name: that.state.name,
             loggedIn: that.props.loggedIn
         };   
         axios.post("/signup", signupData).then(function(response){
             // set state with redux
              if(!response.data.error){
                  BrowserHistory.push("/login/signedUp");
                  //remember to add a way to indicate successful account creation at the login page. Redux state, preferably.
              }
              else{
                  that.setState({"errorMessage": JSON.stringify(response.data.error)});
              }
         });
         }
         else{ // if email, passwords, and name are not all filled out
             that.setState({"errorMessage": "Please fill out your name, email, and a password!"});
         }
         }
         else{ //if password !== confirmPassword
             that.setState({"errorMessage": "Your passwords do not match! Try again."});
         }
         }
         else{ //if already logged in
            that.setState({"errorMessage": "You're already logged in! Log out, first, if you want to make a new account."});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn};
};

module.exports = ReactRedux.connect(mapStateToProps)(SignupForm);