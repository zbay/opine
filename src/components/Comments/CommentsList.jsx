"use strict";
var React = require('react');

module.exports = React.createClass({
    propTypes: {
        comments: React.PropTypes.array.isRequired
    },
    render: function(){
        return (
        <div id="commentList" className="container">
        {this.props.comments.length > 0 ? (<h3 id="commentHeader">Comments:</h3>): (<span></span>)}
        {this.renderComments()}
        </div>);
    },
    renderComments: function(){
        if(this.props.comments.length <= 0){
            return (<span></span>);
        }
        else{
          return (this.props.comments.map(function(comment, index){
            return (<div className="comment" key={index}><span className="commentNumber">{index+1}.&nbsp;&nbsp;</span>{comment.text}</div>)
        }));   
        }
    }
});