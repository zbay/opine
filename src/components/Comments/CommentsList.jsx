var React = require('react');
var Comment = require('./Comment');

module.exports = React.createClass({
    propTypes: {
        comments: React.PropTypes.array.isRequired
    },
    render: function(){
        let that = this;
        return (
        <div id="commentList" className="container">
        {that.props.comments && that.props.comments.length > 0 ? (<h3 id="commentHeader">Comments:</h3>): (<span></span>)}
        {that.renderComments()}
        </div>);
    },
    renderComments: function(){
        let that = this;
        if(that.props.comments && that.props.comments.length <= 0){
            return (<span></span>);
        }
        else{
          return (that.props.comments.map(function(comment, index){
            return (<Comment key={comment._id} index={index} postID={that.props.postID} commentData={comment} refreshComments={that.props.refreshComments}></Comment>)
        }));   
        }
    }
});