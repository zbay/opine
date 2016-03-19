var React = require('react');
module.exports = React.createClass({
    render: function(){
            return (<button id="toggleForm" onClick={this.props.toggleVisible}>{this.props.visible ? "Hide Form" : "Ask Something"}</button>);
    }
});