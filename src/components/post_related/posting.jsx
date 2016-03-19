var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (<div className="posting">
        <div className="postQuestion">
        <h3>Question</h3>
        {this.props.postingData.question}</div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        {this.props.postingData.asker}</div>
        <div className="postQuestion">
        <h3>How can I opine?</h3>
        {this.props.postingData.howToContact}</div>
        <div className="postQuestion">
        <h3>Filed Under:</h3>
        {this.props.postingData.category}</div>
        </div>);
    }
});