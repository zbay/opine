var React = require('react');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var actions = require("../../actions");
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

var LoginForm = React.createClass({
    propTypes: {
         reduxLogin: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
      return {
          email: null,
          password: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    render: function(){
        return (<form id="loginForm" onSubmit={this.login}>
        {this.props.justSignedUp ? (<div id="signupNotice">Account successfully created!</div>): (<div id="signupNotice">Don't have an account?&nbsp;
        <Link to="/signup">Sign up here.</Link></div>)}
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <label>Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <button type="submit">Log In</button><br /><br />
        </form>);
    },
    login: function(e){
         e.preventDefault();
         let that = this;
          // load loggedIn from the appropriate Redux store
         if(!that.props.loggedIn){
         if(that.state.email && that.state.password){
            let loginData = {
             email: that.state.email,
             password: that.state.password,
             loggedIn: that.props.loggedIn
         };   
         axios.post("/login", loginData).then(function(response){
             console.log("login response");
                  if(!response.data.error){
                    that.props.reduxLogin(that.state.email);
                    BrowserHistory.push("/all/1");
              }
              else{
                 that.setState({"errorMessage": response.data.error});
              }
         });
         }
         else{
             that.setState({"errorMessage": "Please fill out both the username and the password!"});
         }
         }
         else{
              that.setState({"errorMessage": "You're already logged in! Log out, first, if you want to sign in with a different account."});
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

var mapDispatchToProps = function(dispatch){
    return {
        reduxLogin: function(email){ dispatch(actions.login(email)); }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginForm);