var React = require('react');
var axios = require('axios');
var Jumbotron = require("./StatelessUI/Jumbotron");
var Footer = require("./StatelessUI/Footer");
var ActionBar = require("./Navigation/ActionBar");
var ReactRedux = require('react-redux');
var actions = require("../actions");
var localStorage = localStorage || window.localStorage;

var Main = React.createClass({
    componentDidMount: function(){
        let that = this;
        axios.post("/testLoggedIn").then(function(response){
            if(!response.data.loggedIn){
                localStorage.removeItem("loggedIn");
                that.props.logout();
            }
            else{
        if(!that.props.userID && localStorage && localStorage.getItem("loggedIn")){
            that.props.reduxLogin(JSON.parse(localStorage.getItem("loggedIn")).userID);
        }                   
            }
        });
    },
    render: function(){
        return (<div>
        <Jumbotron />
        <ActionBar />
       {this.props.children}
       <Footer />
        </div>);
    }
});

var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, userID:state.loggedIn.userID};
};
var mapDispatchToProps = function(dispatch){
    return {
        reduxLogin: function(userID){ 
            dispatch(actions.login(userID)); },
        logout: function(){
            dispatch(actions.logout());
        }
    }
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Main);