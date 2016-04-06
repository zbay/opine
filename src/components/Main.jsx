var React = require('react');
var Jumbotron = require("./StatelessUI/Jumbotron");
var Footer = require("./StatelessUI/Footer");
var ActionBar = require("./Navigation/ActionBar");
var ReactRedux = require("react-redux");

var Main = React.createClass({
    propTypes: {
        loggedIn: React.PropTypes.bool.isRequired  
    },
    render: function(){
         console.log("loggedIn:" + this.props.loggedIn);
        return (<div>
        <Jumbotron />
        <ActionBar loggedIn={this.props.loggedIn} />
       {this.props.children}
       <Footer />
        </div>);
    }
});

var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn};
};
module.exports = ReactRedux.connect(mapStateToProps)(Main);