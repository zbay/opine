var React = require('react');
var ReactRedux = require('react-redux');
var axios = require('axios');
var actions = require("../../actions");

var CommentsList = require("../Comments/CommentsList");
var NewCommentForm = require("../Comments/NewCommentForm");
var PageBar = require("../Navigation/PageBar");
var Posting = require("./Posting");
var localStorage = localStorage || window.localStorage;

var StandaloneQuestion = React.createClass({
    propTypes: {
        questionID: React.PropTypes.string.isRequired,
    },
    getInitialState: function(){
      return {question: null, comments: [], isLoading: true, favorited: false}  
    },
    componentDidMount: function(){
        setTimeout(this.showError, 2000);
        this.props.navigate();
    },
    showError: function(){
         this.setState({isLoading: false}); 
    },
    componentWillMount: function(){
      this.retrieveQuestion();  
      this.retrieveComments();
    },
    componentWillReceiveProps: function(nextprops){
       this.retrieveQuestion();  
       this.retrieveComments(nextprops.page);       
    },
    render: function(){
        if(this.state.question !== null){
        return (<div>
        <Posting standalone={true} postingData={this.state.question}/>
        <NewCommentForm questionID={this.props.questionID} refreshComments={this.retrieveComments}/>
        <br />
        <CommentsList comments={this.state.comments} postID={this.props.questionID} refreshComments={this.retrieveComments} /><br />
        <PageBar criteria="question" addendum={this.props.questionID + "/"} page={this.props.page} hasNext={this.state.comments.length > 0}/>
        </div>
        );            
        }
        else{
            if(!this.state.isLoading){
             return (<div id="errorMessage">The question could not be loaded. Either the URL is wrong, or the post has been deleted.</div>);   
            }
            else{
             return (<div id="spinner" className="container"><div className="row">
             <div className="col-sm-12 col-md-12 col-lg-12">
             <img src="/img/loading_spinner.gif"/></div></div></div>);
            }
        }
    },
    retrieveQuestion: function(){
        let that = this;
        let questionData = {id: that.props.questionID, userID: that.props.userID};
        axios.post("/questionData", questionData)
        .then(function(response){
            that.setState({question: response.data.postData});
        });
    },
    retrieveComments: function(page){
         let that = this;
         console.log("retrieving comments");
         let idData = {"id": that.props.questionID, "page": page || that.props.page}
        axios.post("/comments", idData)
        .then(function(response){
            console.log(response.data.commentData);
            if(response.data.commentData.length <= 0){
                that.setState({comments: []}); 
            }
            else{
        let iteratedOver = 0;
         for(let i = 0; i < response.data.commentData.length; i++){
           iteratedOver++;
          if(iteratedOver >= response.data.commentData.length){
                console.log(response.data.commentData);
                that.setState({"comments": response.data.commentData});   
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

var mapDispatchToProps = function(dispatch){
    return {
        navigate: function(){ 
            dispatch(actions.navigate(true)); }
    }
};
var mapStateToProps = function(state){
    return {loggedIn:state.loggedIn.loggedIn, userID:state.loggedIn.userID, justChanged: state.navigation.justChanged};
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StandaloneQuestion);