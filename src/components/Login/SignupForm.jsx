var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var ReactRedux = require("react-redux");
var FormAlert = require("../Alerts/FormAlert");

var SignupForm = React.createClass({
    propTypes: {
         loggedIn: React.PropTypes.bool.isRequired 
    },
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
        <button type="submit">Sign Up</button>
        </form>
        <div><h3>Why register with Opine?</h3>
        <ol>
            <li>You'll be able to edit your posts</li>
            <li>You'll be able to delete your posts</li>
            <li>You'll still be able to post on the site, even if an anonymous user on your IP address has been banned</li>
            <li>You'll save your list of favorites directly to our database, instead of as a browser cookie</li>
        </ol>
        </div>
        </div>);
    },
    signup: function(e){
         e.preventDefault();
         let that = this;
         if(!this.props.loggedIn){
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
         }
         else{
            this.setState({"errorMessage": "You're already logged in! Log out, first, if you want to make a new account."});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn};
};

module.exports = ReactRedux.connect(mapStateToProps)(SignupForm);