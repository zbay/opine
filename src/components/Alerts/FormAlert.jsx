var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
    render: function(){
        return (
        <div id="formAlert">
        {this.props.successMessage ? (<div id="formSuccess">{this.props.successMessage}&nbsp;&nbsp;
        {this.props.newPostURL ? (<Link to={this.props.newPostURL}>View it now.</Link>): (<span></span>)}</div>): (<span></span>)}
        {this.props.errorMessage ? ( <div id="formError">{this.props.errorMessage}</div>): (<span></span>)}
        </div>);
    }
});