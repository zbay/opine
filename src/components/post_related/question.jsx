var React = require('react');
var axios = require('axios');
var CommentsList = require("./comments_list");
var NewCommentForm = require("./new_comment_form");

module.exports = React.createClass({
    propTypes: {
        questionID: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
      return {question: null}  
    },
    componentWillMount: function(){
      this.retrieveQuestion();  
    },
    render: function(){
        if(this.state.question !== null){
        return (<div>
        <div className="posting">
        <div className="postQuestion">
        <h3>Question</h3>
        {this.state.question.question}</div>
        <div className="postAsker">
        <h3>Who's asking?</h3>
        {this.state.question.asker}</div>
        <div className="postContact">
        <h3>How can I opine?</h3>
        {this.state.question.howToContact}</div>
        <div className="postCategory">
        <h3>Filed Under:</h3>
        {this.state.question.category}</div>
        <h3>Posted On: </h3>
        {this.state.question.timePosted.substring(0,10)}
        <h3>Deadline: </h3>
        {this.state.question.deadline.substring(0,10)}
        </div>
        <NewCommentForm questionID={this.props.questionID}/>
        <CommentsList comments={this.state.question.comments} />
        </div>
        );            
        }
        else{
            return (<div id="errorMessage">The question could not be loaded. Either the URL is wrong, or the post has been deleted.</div>);
        }

    },
    retrieveQuestion: function(){
        let that = this;
        axios.get("/question/" + that.props.questionID)
        .then(function(response){
            that.setState({question: response.data.postData});
        });
    }
});