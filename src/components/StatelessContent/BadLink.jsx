var React = require('react');
var ActionBar = require('../Navigation/ActionBar');

module.exports = React.createClass({
    render: function(){
        return (<div>
        <ActionBar />
        <div id="fourohfour">
        Error 404: File not found! Try another URL.
        </div></div>);
    }
});