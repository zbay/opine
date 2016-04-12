var React = require('react');
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");

module.exports = React.createClass({
    getInitialState: function(){
      return {email: null, errorMessage: null, successMessage: null}  
    },
    render: function(){
        return (<div>
        <form onSubmit={this.requestChange}>
        <FormAlert errorMessage={this.state.errorMessage} successMessage={this.state.errorMessage}/>
        <input name="email" value={this.state.email} onChange={this.onChange}/>
        <button type="submit">Request New Password</button>
        </form>
        </div>);
    },
    requestChange: function(){
        let that = this;
       axios.post("/requestReset", {email: that.state.email}).then(function(response){
           if(response.data.success){
               that.setState({successMessage: response.data.success});
               
           }
           if(response.data.error){
               that.setState({errorMessage: response.data.error});
           }
       }); 
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});