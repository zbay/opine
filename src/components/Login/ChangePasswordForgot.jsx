var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

var ChangePasswordForgot = React.createClass({
    getInitialState: function(){
      return {
          email: null,
          password: null,
          confirmPassword: null,
          successMessage: null,
          errorMessage: null
      };  
    },
    componentDidMount: function(){ //if the URL doesn't correspond with a valid reset ID, redirect to the password request page instead of the actual reset page
        let that = this;
        axios.post("/checkValidReset", {resetID: that.props.resetID}).then(function(response){
            if(response.data.error){
                BrowserHistory.push("/password_request");
            }
        });
    },
    render: function(){
        return (<div><form id="signupForm" onSubmit={this.changePassword}>
        <div className="container"><div className="row"><div className="col-sm-12">Please input your email and a new password.</div></div></div>
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/><br />
        <label>Email:</label><br />
        <input name="email" value={this.state.email} onChange={this.onChange}/><br /><br />
        <label>New Password:</label><br />
        <input name="password" type="password" value={this.state.password} onChange={this.onChange}/><br /><br />
        <label>Confirm New Password:</label><br />
        <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange}/><br /><br />
        <button type="submit">Change password</button>
        <br />
        <br />
        </form>
        </div>);
    },
    changePassword: function(e){
        let that = this;
         e.preventDefault();
         if(that.state.password && that.state.confirmPassword && that.state.email && that.state.password === that.state.confirmPassword){
         axios.post("/newPasswordForgot", {email: that.state.email, password: that.state.password, resetID: that.props.resetID}).then(function(response){
            if(response.data.error || !response.data.success){
                that.setState({errorMessage: response.data.error});
                BrowserHistory.push("/password_reset");
            }
            else{
                that.setState({successMessage: response.data.success});
                BrowserHistory.push("/login/reset");
            }
        }); //Pick up here. Remember to include username in the email   
         }
         else{
             that.setState({errorMessage: "Please fill out all three fields and make sure that your passwords match."});
         }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = ChangePasswordForgot;