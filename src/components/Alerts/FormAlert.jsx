var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (
        <div id="formAlert">
        {this.props.successMessage ? (<div id="formSuccess">{this.props.successMessage}</div>): (<span></span>)}
        {this.props.errorMessage ? ( <div id="formError">{this.props.errorMessage}</div>): (<span></span>)}
        </div>);
    }
});