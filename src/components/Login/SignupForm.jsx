var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var ReactRedux = require("react-redux");

var SignupForm = React.createClass({
    getInitialState: function(){
      return {
          email: null,
          password: null,
          name: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    render: function(){
        return (<div><form id="signupForm" onSubmit={this.signup}>
        <div id="formAlert">
        {this.state.successMessage ? (<div id="formSuccess">{this.state.successMessage}</div>): (<span></span>)}
        {this.state.errorMessage ? ( <div id="formError">{this.state.errorMessage}</div>): (<span></span>)}
        </div><br />
        <div id="loginNotice">Have an account? 
        <Link to="login">Log in here.</Link>
        </div>
        <label>Name:</label><br />
        <input name="name" value={this.state.name} onChange={this.onChange}/><br /><br />
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <label>Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <button type="submit">Sign Up</button>
        </form>
        <div><h3>Why register with us?</h3>
        <ol>
            <li>You can edit your posts</li>
            <li>You can delete your posts</li>
            <li>You can still post on the site, even if an anonymous user on your IP address has been banned</li>
            <li>You can save your list of favorites directly to our database, instead of as a browser cookie</li>
        </ol>
        </div>
        </div>);
    },
    signup: function(e){
         e.preventDefault();
         let that = this;
         if(that.state.email && that.state.password && that.state.name){
            let signupData = {
             email: that.state.email,
             password: that.state.password,
             name: that.state.name,
             loggedIn: that.props.loggedIn
         };   
         axios.post("/signup", signupData).then(function(response){
             // set state with redux
              if(!response.data.error){
                  BrowserHistory.push("/login");
                  //remember to add a way to indicate successful account creation at the login page. Redux state, preferably.
              }
              else{
                  this.setState({"errorMessage": response.data.error});
              }
         });
         }
         else{
             this.setState({"errorMessage": "Please fill out your name, email, and a password!"});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = SignupForm;