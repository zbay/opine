var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
    render: function(){
        return (
        <div id="formAlert">
        {this.props.successMessage ? (<div id="formSuccess">{this.props.successMessage}&nbsp;&nbsp;<Link to={this.props.newPostURL}>View it now.</Link></div>): (<span></span>)}
        {this.props.errorMessage ? ( <div id="formError">{this.props.errorMessage}</div>): (<span></span>)}
        </div>);
    }
});