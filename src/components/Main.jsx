var React = require('react');
var Jumbotron = require("./StatelessUI/Jumbotron");
var Footer = require("./StatelessUI/Footer");
var ActionBar = require("./Navigation/ActionBar");

var Main = React.createClass({
    render: function(){
        return (<div>
        <Jumbotron />
        <ActionBar />
       {this.props.children}
       <Footer />
        </div>);
    }
});

module.exports = Main;