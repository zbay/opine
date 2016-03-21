var React = require('react');
var Jumbotron = require("./ui_dumb/jumbotron");
var Footer = require("./ui_dumb/footer");

module.exports = React.createClass({
    render: function(){
        return (<div><Jumbotron />
       {this.props.children}
       <Footer />
        </div>);
    }
});