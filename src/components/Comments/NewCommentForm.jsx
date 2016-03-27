var React = require('react');
var axios = require('axios');

module.exports = React.createClass({
    propTypes: {
      questionID: React.PropTypes.string.isRequired,
      refreshComments: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
      return {visible: false, comment: "", errorMessage: null, successMessage: null}  
    },
    componentDidMount: function(){
    let that = this;
    axios.get("https://api.ipify.org?format=json").then( function (data) {
        that.setState({IP: data.data.ip});
    });
    },
    render: function(){
        return (<div id="newCommentForm">
        <div id="formAlert">
        {this.state.successMessage ? (<div id="formSuccess">{this.state.successMessage}</div>): (<span></span>)}
        {this.state.errorMessage ? ( <span id="formError">{this.state.errorMessage}</span>): (<span></span>)}
        </div><br />
        <button onClick={this.toggleVisible}>{this.state.visible ? "Hide Comment Form": "Write Comment"}</button>
        {this.state.visible ? 
        (<form id="commentForm" onSubmit={this.postComment}>
        <br />
        <textarea id="commentInput" name="comment" value={this.state.comment} onChange={this.onChange}/>
        <br />
        <br />
        <button type="submit">Post Comment</button>
        </form>)
        : 
        (<span></span>)}
        </div>);
    },
    toggleVisible: function(){
        var isVisible = this.state.visible;
        this.setState({visible: !isVisible});
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    postComment: function(e){
         e.preventDefault(); // so that only React handles the form data
         let that = this;
         if(this.state.comment.length > 0 && this.props.questionID){
             var commentData = {"questionID": that.props.questionID, "commentText": that.state.comment, "IP": this.state.IP};
             axios.post("/addComment", commentData).then(function(response){
                 console.log(JSON.stringify(response));
                 if(response.data.success){
                     that.setState({successMessage: "Comment successfully posted!", errorMessage: null, comment: ""});
                     that.props.refreshComments(); // sends call up to show all the post's comments, including the new one
                 }
                 else{
                     that.setState({successMessage: null, errorMessage: null}); 
                 }
             });
         }
         else{
             that.setState({successMessage: null});
         }
    }
});