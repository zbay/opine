var React = require('react');
var Jumbotron = require("./dumb/jumbotron");
var Footer = require("./dumb/footer");

module.exports = React.createClass({
    render: function(){
        console.log(this.props.children);
        return (<div><Jumbotron />
       {this.props.children}
       <Footer />
        </div>);
    }
});