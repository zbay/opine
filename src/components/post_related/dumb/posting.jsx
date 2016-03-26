var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    propTypes: {
        postingData: React.PropTypes.object.isRequired
    },
    render: function(){
        return (<div className="posting">
        <div className="postQuestion">
        <h3><Link to={"question/" + this.props.postingData._id}>Question</Link></h3>
        {this.props.postingData.question}</div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        {this.props.postingData.asker}</div>
        <div className="postContact">
        <h3>How can I opine?</h3>
        {this.props.postingData.howToContact}</div>
        <div className="postCategory">
        <h3>Filed Under:</h3>
        {this.props.postingData.category}</div>
        </div>);
    }
});