var React = require('react');
var ReactRedux = require('react-redux');
var axios = require('axios');
var actions = require("../../actions");
var localStorage = localStorage || window.localStorage;

var Logout = React.createClass({
    propTypes: {
        logout: React.PropTypes.func.isRequired 
    },
    componentWillMount: function(){
         localStorage.removeItem("loggedIn");
         this.props.logout();
    },
    render: function(){
        return (<div className="container">
        <div id="loggedOut" className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {this.props.loggedIn ? ("Logging out. Please wait!"): ("You have been logged out. Come back soon!")}
        </div>
        </div><br /></div>);
    }
});

var mapStateToProps = function(state){
    return {loggedIn: state.loggedIn.loggedIn};
};
var mapDispatchToProps = function(dispatch){
    return {
        logout: function(){ 
            axios.post("/logout", {});
            dispatch(actions.logout()); }
    }
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Logout);