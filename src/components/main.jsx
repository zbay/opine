var React = require('react');
var Jumbotron = require("./jumbotron");
var PostingsList = require("./postingslist");

module.exports = React.createClass({
    render: function(){
        console.log(this.props.children);
        return (<div><Jumbotron />
       {this.props.children}
        </div>);
    }
});