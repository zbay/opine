var React = require('react');
var ReactRedux = require('react-redux');
var axios = require('axios');

var CommentsList = require("../Comments/CommentsList");
var NewCommentForm = require("../Comments/NewCommentForm");
var localStorage = localStorage || window.localStorage;

var StandaloneQuestion = React.createClass({
    propTypes: {
        questionID: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
      return {question: null, comments: [], isLoading: true, favorited: false}  
    },
    componentDidMount: function(){
        setTimeout(this.showError, 2000);
    },
    componentWillReceiveProps: function(){
      this.showError();
    },
    showError: function(){
         this.setState({isLoading: false}); 
    },
    componentWillMount: function(){
      this.retrieveQuestion();  
      this.retrieveComments();
    },
    render: function(){
        if(this.state.question !== null){
        return (<div>
        <div className="posting container-fluid">
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
        {this.state.question.deadline.substring(0,10)}<br /><br />
        </div>
        <NewCommentForm questionID={this.props.questionID} refreshComments={this.retrieveComments}/>
        <br />
        <CommentsList comments={this.state.comments} postID={this.props.questionID} refreshComments={this.retrieveComments} />
        </div>
        );            
        }
        else{
            if(!this.state.isLoading){
             return (<div id="errorMessage">The question could not be loaded. Either the URL is wrong, or the post has been deleted.</div>);   
            }
            else{
             return (<div id="spinner"><img src="/img/loading_spinner.gif"/></div>);
            }
        }
    },
    retrieveQuestion: function(){
        let that = this;
        let questionData = {id: that.props.questionID};
        axios.post("/questionData", questionData)
        .then(function(response){
            that.setState({question: response.data.postData});
        });
    },
    retrieveComments: function(){
         let that = this;
         console.log("retrieving comments");
         let idData = {"id": that.props.questionID, "userID": that.props.userID}
        axios.post("/comments", idData)
        .then(function(response){
            console.log(response.data.postData);
            if(response.data.postData.length <= 0){
                that.setState({comments: response.data.postData}); 
            }
            else{
        let iteratedOver = 0;
         for(let i = 0; i < response.data.postData.length; i++){
           iteratedOver++;
          if(that.props.userID && response.data.postData[i].userID && response.data.postData[i].userID === that.props.userID){
              response.data.postData[i]["editable"] = true;
              console.log(response.data.postData[i]);
          if(iteratedOver >= response.data.postData.length){
                that.setState({"comments": response.data.postData});   
          }
          }
          else{
            if(iteratedOver >= response.data.postData.length){
                that.setState({"comments": response.data.postData});   
          }
          }

      }   
            }
        });       
    },
    toggleForm: function(){
        if(!this.state.visibleForm){
         this.setState({visibleForm: true});   
        }
        else{
            this.setState({visibleForm: false});
        }
    }
});

var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, userID:state.loggedIn.userID};
};

module.exports = ReactRedux.connect(mapStateToProps)(StandaloneQuestion);