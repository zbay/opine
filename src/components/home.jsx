var React = require('react');
var Jumbotron = require("./jumbotron");
var PostingsList = require("./postingslist");

module.exports = React.createClass({
    render: function(){
        return (<div><Jumbotron />
        <PostingsList criteria="all" />
        Testing homepage 123</div>);
    }
});