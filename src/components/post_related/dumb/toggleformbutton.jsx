var React = require('react');
module.exports = React.createClass({
    propTypes: {
      visible: React.PropTypes.boolean,
      toggleVisible: React.PropTypes.func.isRequired
    },
    render: function(){
            return (<button id="toggleForm" onClick={this.props.toggleVisible}>{this.props.visible ? "Hide Form" : "Ask Something"}</button>);
    }
});