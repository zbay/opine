var React = require('react');
var ReactRedux = require('react-redux');
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
        return (<div>
        <div id="loggedOut">
        {this.props.loggedIn ? ("Logging out. Please wait!"): ("You have been logged out. Come back soon!")}
        </div><br /></div>);
    }
});

var mapStateToProps = function(state){
    return {loggedIn: state.loggedIn.loggedIn};
};
var mapDispatchToProps = function(dispatch){
    return {
        logout: function(){ dispatch(actions.logout()); }
    }
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Logout);