var React = require('react');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var actions = require("../../actions");
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");
var localStorage = localStorage || window.localStorage;

var LoginForm = React.createClass({
    propTypes: {
         reduxLogin: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
      return {
          username: null,
          password: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    // <div id="resetNotice"><Link to="/password_request">Forgot your password?</Link></div>
    render: function(){
        return (
        <div className="container">
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <form id="loginForm" onSubmit={this.login}>
        {this.props.redirectMessage ? (<div id="signupNotice">{this.props.redirectMessage}</div>): (<div id="signupNotice">Don't have an account?&nbsp;
        <Link to="/signup">Sign up here.</Link><br /><br />Forgot your username or password? <Link to="/password_request">Request them here</Link>.</div>)}
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Username:</label><br />
        <input name="username" value={this.state.username} onChange={this.onChange}/><br /><br />
        <label>Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <button type="submit">Log In</button><br /><br />
        </form>
        </div></div></div>);
    },
    login: function(e){
         e.preventDefault();
         let that = this;
         if(!that.props.loggedIn){
         if(that.state.username && that.state.password){
            let loginData = {
             username: that.state.username,
             password: that.state.password,
             loggedIn: that.props.loggedIn
         };   
         axios.post("/login", loginData).then(function(response){
                  if(!response.data.error){
                    if(localStorage){
                        localStorage.setItem("loggedIn", JSON.stringify({userID: response.data.userID}));
                    }
                    that.props.reduxLogin(response.data.userID);
                    BrowserHistory.push("/");
              }
              else{
                 that.setState({"errorMessage": response.data.error});
              }
         });
         }
         else{
             that.setState({"errorMessage": "Please fill out your username and password!"});
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
        reduxLogin: function(userID){ 
            dispatch(actions.login(userID)); }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginForm);