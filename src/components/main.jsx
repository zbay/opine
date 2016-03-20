var React = require('react');
var Jumbotron = require("./dumb/jumbotron");
var Footer = require("./dumb/footer");

module.exports = React.createClass({
    render: function(){
        return (<div><Jumbotron />
       {this.props.children}
       <Footer />
        </div>);
    }
});