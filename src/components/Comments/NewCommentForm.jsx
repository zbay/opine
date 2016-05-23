var React = require('react');
var axios = require('axios');
var FormAlert = require("../Alerts/FormAlert");
var ReactRedux = require('react-redux');

var NewCommentForm = React.createClass({
    propTypes: {
      questionID: React.PropTypes.string.isRequired,
      refreshComments: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
      return {visible: true, comment: "", author: "anonymous", errorMessage: null, successMessage: null}  
    },
    componentDidMount: function(){
    let that = this;
    axios.get("https://api.ipify.org?format=json").then( function (data) {
        that.setState({IP: data.data.ip});
    });
    },
    render: function(){
        return (<div id="newCommentForm">
        <FormAlert successMessage={this.state.successMessage} errorMessage={this.state.errorMessage}/>
        <br />
        <button onClick={this.toggleVisible}>{this.state.visible ? "Hide Comment Form": "Write Comment"}</button>
        {this.state.visible ? 
        (<form id="commentForm" onSubmit={this.postComment}>
        <br />
        <label>Author (optional):</label>
        <br />
        <input id="authorInput" name="author" value={this.state.author} onChange={this.onChange}/>
        <br /><br />
        <label>Text:</label>
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
        let state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    postComment: function(e){
         e.preventDefault(); // so that only React handles the form data
         let that = this;
         if(this.state.comment.length > 0 && this.props.questionID){
             let commentData = {"questionID": that.props.questionID, "commentText": that.state.comment.trim().substr(0, 1000), "author": that.state.author,
             "IP": that.state.IP, "loggedIn": that.props.loggedIn
             };
             axios.post("/addComment", commentData).then(function(response){
                 
                 if(response.data.success){
                     that.setState({successMessage: "Comment successfully posted!", errorMessage: null, comment: ""});
                     that.props.refreshComments(); // sends call up to show all the post's comments, including the new one
                 }
                 else{
                     that.setState({successMessage: null, errorMessage: response.data.error}); 
                 }
             });
         }
         else{
             that.setState({successMessage: null});
         }
    }
});
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn};
};

module.exports = ReactRedux.connect(mapStateToProps)(NewCommentForm);