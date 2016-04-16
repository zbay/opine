var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (
        <div id="formAlert">
        {this.props.successMessage ? (<div id="formSuccess">{this.props.successMessage}&nbsp;&nbsp;
        {this.props.newPostURL ? 
        (<a href={this.props.newPostURL} target="_blank">View it now.</a>):
        (<span></span>)}</div>): (<span></span>)}
        {this.props.errorMessage ? ( <div id="formError">{this.props.errorMessage}</div>): (<span></span>)}
        </div>);
    }
});
