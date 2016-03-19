var React = require('react');
var Jumbotron = require("./dumb/jumbotron");
var PostingsList = require("./post_related/postingslist");

module.exports = React.createClass({
    render: function(){
        console.log(this.props.children);
        return (<div><Jumbotron />
       {this.props.children}
        </div>);
    }
});