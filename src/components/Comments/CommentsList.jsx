var React = require('react');
var Comment = require('./Comment');
var Refresher = require("../Navigation/Refresher");

module.exports = React.createClass({
    propTypes: {
        comments: React.PropTypes.array.isRequired
    },
    render: function(){
        let that = this;
        return (
        <div id="commentList">
        {that.props.comments && that.props.comments.length > 0 ? 
        (<div className="container"><div className="row"><div className="col-sm-12 col-md-12 col-lg 12"><h3 id="commentHeader">Recent Comments:</h3></div></div></div>): (<span></span>)}
        <br />
        <Refresher reload={that.props.refreshComments}/>
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