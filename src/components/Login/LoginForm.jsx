var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');

var LoginForm = React.createClass({
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
        <div id="signupNotice">Don't have an account?&nbsp;
        <Link to="/signup">Sign up here.</Link>
        </div>
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <label>Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <button type="submit">Log In</button>
        </form>);
    },
    login: function(e){
         e.preventDefault();
         let that = this;
          // load loggedIn from the appropriate Redux store
         if(that.state.email && that.state.password){
            let loginData = {
             email: that.state.email,
             password: that.state.password,
             loggedIn: that.props.loggedIn
         };   
         axios.post("/login", loginData).then(function(response){
                  if(!response.data.error){
                    this.props.login();
                    BrowserHistory.push("/all/1");
              }
              else{
                 this.setState({"errorMessage": response.data.error});
              }
         });
         }
         else{
             this.setState({"errorMessage": "Please fill out both the username and the password!"});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = LoginForm;