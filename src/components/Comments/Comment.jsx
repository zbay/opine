var React = require('react');
var axios = require('axios');
var EditCommentForm = require('./EditCommentForm');
var ReactRedux = require('react-redux');

var Comment = React.createClass({
    getInitialState: function(){
      return {editing: false, deleted: false, commentData: this.props.commentData}  
    },
    render: function(){
        if(!this.state.deleted){
        if(!this.state.editing){
          return (<div className="comment"><span className="commentNumber">{this.props.index+1}.&nbsp;&nbsp;</span>{this.state.commentData.text}
          {this.state.commentData.editable ? 
          (<div><br /><button onClick={this.editify}>Edit Comment</button>&nbsp;<button onClick={this.deleteComment}>Delete Comment</button></div>): (<span></span>)}
          </div>);      
        }
        else{
            return (<EditCommentForm commentData={this.state.commentData} cancelEdit={this.cancelEdit} saveEditRender={this.saveEditRender}
            postID={this.props.postID} index={this.props.index}/>);
        }
        }
        else{
            return (<span></span>);
        }
    },
    deleteComment: function(){
        let that = this;
        if(that.props.loggedIn){
        let commentData = {postID: that.props.postID, commentID: that.state.commentData._id};
        axios.post("/deleteComment", commentData).then(function(response){
            if(!response.data.error){
                that.setState({deleted: true});
                //that.props.refreshComments();
            }
        });   
        } 
    },
    editify: function(){
      this.setState({editing: true});  
    },
    cancelEdit: function(){
        this.setState({editing: false});
    },
    saveEditRender: function(newComment){
      this.setState({editing: false, commentData: newComment});
    }
});

var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, userID:state.loggedIn.userID};
};

module.exports = ReactRedux.connect(mapStateToProps)(Comment);