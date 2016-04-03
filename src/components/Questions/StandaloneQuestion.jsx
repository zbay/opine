var React = require('react');
var axios = require('axios');

var CommentsList = require("../Comments/CommentsList");
var NewCommentForm = require("../Comments/NewCommentForm");
var ActionBar = require("../Navigation/ActionBar");

module.exports = React.createClass({
    propTypes: {
        questionID: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        var isFavorite = false;
        var currentFavorites = JSON.parse(localStorage.getItem("favorites"));
        if(currentFavorites){
            for(let i = 0; i < currentFavorites.length; i++){
            if(currentFavorites[i] == this.props.questionID){
                isFavorite = true;
            }
        }   
        }
      return {question: null, comments: [], isLoading: true, favorited: isFavorite}  
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
        <ActionBar />
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
        {this.state.question.deadline.substring(0,10)}<br /><br />
        {this.state.favorited? (<span></span>): <button onClick={this.addFavorite}>Add To My Favorites</button>}
        </div>
        <NewCommentForm questionID={this.props.questionID} refreshComments={this.retrieveComments}/>
        <br />
        <CommentsList comments={this.state.comments} />
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
        axios.get("/questionData/" + that.props.questionID)
        .then(function(response){
            console.log((response));
            that.setState({question: response.data.postData});
        });
    },
    retrieveComments: function(){
         let that = this;
         let idData = {"id": this.props.questionID}
        axios.get("/comments", idData)
        .then(function(response){
            that.setState({comments: response.data.postData});
        });       
    },
    toggleForm: function(){
        if(!this.state.visibleForm){
         this.setState({visibleForm: true});   
        }
        else{
            this.setState({visibleForm: false});
        }
    },
    addFavorite: function(){
        var currentFavorites = JSON.parse(localStorage.getItem("favorites"));
        if(currentFavorites.length >= 100){
            currentFavorites.shift();
        }
        if(currentFavorites === null){
            currentFavorites = [];
        }
        currentFavorites.push(this.props.questionID);
        localStorage.setItem("favorites", JSON.stringify(currentFavorites));
        this.setState({favorited: true});
    }
});