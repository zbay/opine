var React = require('react');
var axios = require('axios');

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
        return (<div className="posting">
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
        <h3>Posted At: </h3>
        {this.state.question.timePosted}
        <h3>Deadline: </h3>
        {this.state.question.deadline}
        </div>
        );            
        }
        else{
            return (<div id="errorMessage">The question could not be loaded. Either the URL is wrong, or the post has been deleted.</div>);
        }

    },
    retrieveQuestion: function(){
        let that = this;
        console.log("questionID: " + this.props.questionID);
        axios.get("/question/" + that.props.questionID)
        .then(function(response){
            console.log("response: " + JSON.stringify(response.data));
            that.setState({question: response.data.postData});
        });
    }
});